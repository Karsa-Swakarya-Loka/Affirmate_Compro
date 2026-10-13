// Contact form rules shared by the server action: parsing, validation, duplicate key and a small in-memory rate limiter.
import { validEmail, validPhone } from './validation.ts'

export type InquiryInput = { name: string; company: string; email: string; phone: string; country: string; services: string[]; message: string; consent: boolean; website: string }
export type Errors = Partial<Record<'name' | 'email' | 'phone' | 'message' | 'consent', 'required' | 'invalid'>>

const str = (v: FormDataEntryValue | null) => (typeof v === 'string' ? v.trim().slice(0, 2000) : '')

export function readInquiry(form: FormData): InquiryInput {
  return {
    name: str(form.get('name')), company: str(form.get('company')), email: str(form.get('email')), phone: str(form.get('phone')),
    country: str(form.get('country')), services: form.getAll('services').map(v => str(v)).filter(Boolean), message: str(form.get('message')),
    consent: form.get('consent') === 'on' || form.get('consent') === 'true', website: str(form.get('website')),
  }
}
export function validateInquiry(i: InquiryInput): Errors {
  const e: Errors = {}
  if (!i.name) e.name = 'required'
  if (!i.email) e.email = 'required'
  else if (!validEmail(i.email)) e.email = 'invalid'
  if (i.phone && !validPhone(i.phone)) e.phone = 'invalid'
  if (!i.message) e.message = 'required'
  if (!i.consent) e.consent = 'required'
  return e
}
export const duplicateKey = (i: InquiryInput) => `${i.email.toLowerCase()}|${i.message.slice(0, 80).toLowerCase()}`

/** Fixed-window limiter per key (IP). Memory only: enough for one Node process; reset on restart. */
export function createRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>()
  return (key: string): boolean => {
    const now = Date.now()
    const recent = (hits.get(key) ?? []).filter(t => now - t < windowMs)
    if (recent.length >= max) { hits.set(key, recent); return false }
    recent.push(now); hits.set(key, recent)
    if (hits.size > 5000) hits.clear()
    return true
  }
}
