import type { Home, Service, Site, Ui } from '@/payload-types'
import { Icon } from '@/components/ui/Icon'
import { ContactForm } from '@/components/forms/ContactForm'

export function Contact({ block, site, ui, services, locale }: { block: NonNullable<Home['contact']>; site: Site; ui: Ui; services: Service[]; locale: 'en' | 'id' }) {
  const f = ui.form ?? {}
  const labels = {
    name: f.name || 'Full name', company: f.company || 'Company', email: f.email || 'Email', phone: f.phone || 'Phone', country: f.country || 'Country',
    services: f.services || 'Service', message: f.message || 'Message', submit: f.submit || 'Send', sending: f.sending || 'Sending…', success: f.success || 'Thank you.',
    error: f.error || 'Something went wrong.', required: f.required || 'Required', invalid: f.invalid || 'Please check this value', consentRequired: f.consentRequired || 'Please accept', rateLimited: f.rateLimited || 'Too many submissions.',
    consent: block.consentText,
  }
  return (
    <section className="af-section af-section--soft" id="contact">
      <div className="af-container">
        <div className="af-contact">
          <div className="af-contact__info">
            <div className="af-sechead af-sechead--flush">
              <div className="af-sechead__row"><span className="af-mark" aria-hidden="true" /><h2 className="af-h1">{block.title}</h2></div>
              {block.text ? <p className="af-lead">{block.text}</p> : null}
            </div>
            {site.email ? <div className="af-contact__row"><span className="af-ico af-ico--sm"><Icon name="envelope-simple" size={20} /></span><div><strong>{ui.sections?.email || 'Email'}</strong><a href={`mailto:${site.email}`}>{site.email}</a></div></div> : null}
            {site.phone || site.phone2 ? (
              <div className="af-contact__row"><span className="af-ico af-ico--sm"><Icon name="phone" size={20} /></span><div><strong>{ui.sections?.phone || 'Phone'}</strong>
                {[site.phone, site.phone2].filter(Boolean).map((p, i) => <span key={p}>{i ? <br /> : null}<a href={`tel:${String(p).replace(/\D/g, '')}`}>{p}</a></span>)}
              </div></div>
            ) : null}
            <div className="af-hatch" aria-hidden="true" />
          </div>
          <ContactForm locale={locale} labels={labels} services={services.map(s => ({ slug: s.slug, title: s.title }))} />
        </div>
      </div>
    </section>
  )
}
