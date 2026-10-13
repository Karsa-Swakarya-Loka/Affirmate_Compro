'use server'
// Contact form handler. Order: honeypot → validation → duplicate check → rate limit → save → email.
// The inquiry is saved even if email fails; emailStatus records what really happened.
import { headers } from 'next/headers'
import type { Locale } from '@/i18n/config'
import { createRateLimiter, duplicateKey, readInquiry, validateInquiry, type Errors } from '@/lib/inquiry'
import { getSite, payloadClient } from '@/lib/cms'

export type InquiryState = { status: 'idle' | 'success' | 'error'; errors?: Errors; reason?: 'rate' | 'server' }

const limiter = createRateLimiter(10, 60 * 60 * 1000)
const recent = new Map<string, number>()
const DUPLICATE_WINDOW = 10 * 60 * 1000

export async function submitInquiry(_prev: InquiryState, form: FormData): Promise<InquiryState> {
  const locale: Locale = form.get('locale') === 'id' ? 'id' : 'en'
  const input = readInquiry(form)
  if (input.website) return { status: 'success' } // honeypot filled: pretend success, store nothing
  const errors = validateInquiry(input)
  if (Object.keys(errors).length) return { status: 'error', errors }

  const key = duplicateKey(input)
  const last = recent.get(key)
  if (last && Date.now() - last < DUPLICATE_WINDOW) return { status: 'success' }

  const h = await headers()
  const ip = (h.get('x-forwarded-for') || h.get('x-real-ip') || 'local').split(',')[0].trim()
  if (!limiter(ip)) return { status: 'error', reason: 'rate' }

  const payload = await payloadClient()
  try {
    const { docs: services } = await payload.find({ collection: 'services', depth: 0, limit: 50, draft: false, overrideAccess: false, where: { _status: { equals: 'published' } }, select: { slug: true } })
    const serviceIds = services.filter(s => input.services.includes(s.slug)).map(s => s.id)
    const inquiry = await payload.create({ collection: 'inquiries', overrideAccess: true, data: {
      name: input.name, company: input.company || undefined, email: input.email, phone: input.phone || undefined, country: input.country || undefined,
      services: serviceIds, message: input.message, consent: true, locale, status: 'new', emailStatus: 'pending',
    } })
    recent.set(key, Date.now())

    let emailStatus: 'sent' | 'failed' = 'failed'
    if (process.env.SMTP_HOST) {
      try {
        const site = await getSite('en')
        const to = (site.inquiryRecipients ?? []).map(r => r.email).filter(Boolean)
        const fallback = (process.env.INQUIRY_RECIPIENTS || '').split(',').map(s => s.trim()).filter(Boolean)
        const recipients = to.length ? to : fallback
        if (recipients.length) {
          await payload.sendEmail({
            to: recipients.join(','), replyTo: input.email,
            subject: `[Website] New inquiry from ${input.name}${input.company ? ` (${input.company})` : ''}`,
            text: [
              `Name: ${input.name}`, `Company: ${input.company || '-'}`, `Email: ${input.email}`, `Phone: ${input.phone || '-'}`, `Country: ${input.country || '-'}`,
              `Services: ${input.services.join(', ') || '-'}`, `Language: ${locale.toUpperCase()}`, '', input.message, '',
              `Admin: ${process.env.NEXT_PUBLIC_SITE_URL || ''}/admin/collections/inquiries/${inquiry.id}`,
            ].join('\n'),
          })
          emailStatus = 'sent'
        }
      } catch (err) {
        payload.logger.error({ err, msg: 'Inquiry email failed' })
      }
    }
    await payload.update({ collection: 'inquiries', id: inquiry.id, overrideAccess: true, data: { emailStatus } })
    return { status: 'success' }
  } catch (err) {
    payload.logger.error({ err, msg: 'Inquiry could not be saved' })
    return { status: 'error', reason: 'server' }
  }
}
