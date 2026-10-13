'use client'
// Contact form (design .af-form). Progressive: works without JS via the server action, shows inline errors with JS.
import { useActionState } from 'react'
import { submitInquiry, type InquiryState } from '@/app/actions/inquiry'
import { Icon } from '@/components/ui/Icon'

export type FormLabels = { name: string; company: string; email: string; phone: string; country: string; services: string; message: string; submit: string; sending: string; success: string; error: string; required: string; invalid: string; consentRequired: string; rateLimited: string; consent: string }
type Props = { locale: 'en' | 'id'; labels: FormLabels; services: { slug: string; title: string }[] }

const initial: InquiryState = { status: 'idle' }

export function ContactForm({ locale, labels, services }: Props) {
  const [state, action, pending] = useActionState(submitInquiry, initial)
  const err = (k: keyof NonNullable<InquiryState['errors']>) => state.status === 'error' && state.errors?.[k]
  const msg = (k: keyof NonNullable<InquiryState['errors']>) => (err(k) ? <span className="af-field__msg af-field__msg--error"><Icon name="warning-circle" size={16} />{k === 'consent' ? labels.consentRequired : err(k) === 'invalid' ? labels.invalid : labels.required}</span> : null)
  const cls = (k: keyof NonNullable<InquiryState['errors']>) => ['af-field', err(k) ? 'af-field--error' : ''].filter(Boolean).join(' ')
  if (state.status === 'success') return <div className="af-form" role="status"><div className="af-alert af-alert--success"><Icon name="check-circle" size={20} />{labels.success}</div></div>
  return (
    <form className="af-form" action={action} noValidate>
      <input type="hidden" name="locale" value={locale} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: -9999 }} />
      <div className="af-form__row">
        <div className={cls('name')}><label htmlFor="f-name">{labels.name}</label><input id="f-name" name="name" required autoComplete="name" aria-invalid={Boolean(err('name'))} />{msg('name')}</div>
        <div className="af-field"><label htmlFor="f-company">{labels.company}</label><input id="f-company" name="company" autoComplete="organization" /></div>
      </div>
      <div className="af-form__row">
        <div className={cls('email')}><label htmlFor="f-email">{labels.email}</label><input id="f-email" name="email" type="email" required autoComplete="email" aria-invalid={Boolean(err('email'))} />{msg('email')}</div>
        <div className={cls('phone')}><label htmlFor="f-phone">{labels.phone}</label><input id="f-phone" name="phone" type="tel" autoComplete="tel" aria-invalid={Boolean(err('phone'))} />{msg('phone')}</div>
      </div>
      <div className="af-form__row">
        <div className="af-field"><label htmlFor="f-country">{labels.country}</label><input id="f-country" name="country" autoComplete="country-name" /></div>
        <div className="af-field"><label htmlFor="f-service">{labels.services}</label>
          <select id="f-service" name="services" defaultValue="">
            <option value="">—</option>
            {services.map(s => <option key={s.slug} value={s.slug}>{s.title}</option>)}
          </select>
        </div>
      </div>
      <div className={cls('message')}><label htmlFor="f-msg">{labels.message}</label><textarea id="f-msg" name="message" required aria-invalid={Boolean(err('message'))} />{msg('message')}</div>
      <label className="af-check"><input type="checkbox" name="consent" required /><span>{labels.consent}</span></label>
      {msg('consent')}
      {state.status === 'error' && state.reason ? <div className="af-alert af-alert--error" role="alert"><Icon name="warning-circle" size={20} />{state.reason === 'rate' ? labels.rateLimited : labels.error}</div> : null}
      <div><button className="af-btn af-btn--primary af-btn--lg" type="submit" disabled={pending}>{pending ? labels.sending : labels.submit} <Icon name="arrow-right" size={18} /></button></div>
    </form>
  )
}
