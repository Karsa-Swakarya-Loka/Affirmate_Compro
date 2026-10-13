// Structured data built only from what the page really shows.
import type { Service, Site } from '@/payload-types'
import { absoluteUrl } from '@/lib/seo'

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

export function organizationLd(site: Site, logoUrl?: string | null, pageUrl = '/') {
  return {
    '@context': 'https://schema.org', '@type': 'Organization', name: site.brandName, legalName: site.legalName, url: absoluteUrl(pageUrl),
    ...(logoUrl ? { logo: absoluteUrl(logoUrl) } : {}),
    parentOrganization: { '@type': 'Organization', name: site.groupName, ...(site.groupUrl ? { url: site.groupUrl } : {}) },
    ...(site.address ? { address: { '@type': 'PostalAddress', streetAddress: site.address, addressCountry: 'ID' } } : {}),
    ...(site.phone ? { telephone: site.phone } : {}), ...(site.email ? { email: site.email } : {}),
    ...(site.social?.length ? { sameAs: site.social.map(s => s.url) } : {}),
  }
}
export function servicesLd(services: Service[], site: Site) {
  return {
    '@context': 'https://schema.org', '@type': 'ItemList',
    itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Service', name: s.title, description: s.summary, provider: { '@type': 'Organization', name: site.brandName }, areaServed: 'ID' } })),
  }
}
