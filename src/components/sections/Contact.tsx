import type { Home, Service, Site, Ui } from '@/payload-types'
import { ContactForm } from '@/components/forms/ContactForm'
import { SectionHead } from '@/components/ui/SectionHead'
import { whatsappDisplay, whatsappHref } from '@/lib/whatsapp'

// Head on the rule (title left, the invitation right); then a ruled fact list (email, phones, WhatsApp, address)
// spread over the form's height on the left, closed by the hatch, and the form on the right without a box.
export function Contact({ block, site, ui, services, locale }: { block: NonNullable<Home['contact']>; site: Site; ui: Ui; services: Service[]; locale: 'en' | 'id' }) {
  const f = ui.form ?? {}
  const wa = whatsappHref(site.whatsapp)
  const labels = {
    name: f.name || 'Full name', company: f.company || 'Company', email: f.email || 'Email', phone: f.phone || 'Phone', country: f.country || 'Country',
    services: f.services || 'Service', message: f.message || 'Message', submit: f.submit || 'Send', sending: f.sending || 'Sending…', success: f.success || 'Thank you.',
    error: f.error || 'Something went wrong.', required: f.required || 'Required', invalid: f.invalid || 'Please check this value', consentRequired: f.consentRequired || 'Please accept', rateLimited: f.rateLimited || 'Too many submissions.',
    consent: block.consentText,
  }
  const phones = [site.phone, site.phone2].filter((p): p is string => Boolean(p))
  return (
    <section className="af-section af-section--soft" id="contact">
      <div className="af-container">
        <SectionHead title={block.title} lead={block.text} space="tight" />
        <div className="af-contact">
          <div className="af-side">
            <dl className="af-facts">
              {site.email ? <div><dt>{ui.sections?.email || 'Email'}</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div> : null}
              {phones.length ? <div><dt>{ui.sections?.phone || 'Phone'}</dt><dd>{phones.map((p, i) => <span key={p}>{i ? <br /> : null}<a href={`tel:${p.replace(/\D/g, '')}`}>{p}</a></span>)}</dd></div> : null}
              {wa ? <div><dt>WhatsApp</dt><dd><a href={wa} target="_blank" rel="noopener noreferrer">{whatsappDisplay(site.whatsapp)}</a></dd></div> : null}
              {site.address ? <div><dt>{ui.sections?.headOffice || 'Head Office'}</dt><dd>{site.address}</dd></div> : null}
            </dl>
            <div className="af-hatch" aria-hidden="true" />
          </div>
          <ContactForm locale={locale} labels={labels} services={services.map(s => ({ slug: s.slug, title: s.title }))} />
        </div>
      </div>
    </section>
  )
}
