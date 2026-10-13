import { PrivacyPage, privacyMetadata } from '@/components/templates/PrivacyPage'
export const generateMetadata = () => privacyMetadata('en')
export default function Page() { return <PrivacyPage locale="en" /> }
