import { InsightPage, insightMetadata } from '@/components/templates/InsightsPage'
type Props = { params: Promise<{ slug: string }> }
export const generateMetadata = async ({ params }: Props) => insightMetadata('id', (await params).slug)
export default async function Page({ params }: Props) { return <InsightPage locale="id" slug={(await params).slug} /> }
