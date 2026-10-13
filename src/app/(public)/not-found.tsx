import { headers } from 'next/headers'
import { NotFoundView } from '@/components/templates/NotFoundView'
export default async function NotFound() {
  const locale = (await headers()).get('x-locale') === 'id' ? 'id' : 'en'
  return <NotFoundView locale={locale} />
}
