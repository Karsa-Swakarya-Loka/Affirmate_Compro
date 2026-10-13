import { InsightPage, insightMetadata } from '@/components/templates/InsightsPage'
type Props = { params: Promise<{ slug: string }> }
export const generateMetadata = async ({ params }: Props) => insightMetadata('en', (await params).slug)
export default async function Page({ params }: Props) { return <InsightPage locale="en" slug={(await params).slug} /> }
