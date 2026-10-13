import { InsightsPage, insightsMetadata } from '@/components/templates/InsightsPage'
type Props = { searchParams: Promise<{ page?: string; category?: string }> }
export const generateMetadata = () => insightsMetadata('en')
export default async function Page({ searchParams }: Props) {
  const sp = await searchParams
  return <InsightsPage locale="en" page={Math.max(1, Number(sp.page) || 1)} category={sp.category} />
}
