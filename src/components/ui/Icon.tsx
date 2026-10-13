// One icon family for the whole site (Phosphor, regular weight). CMS stores the icon name (lib/fields.ts iconOptions).
import {
  ArrowDownRight, ArrowRight, Bank, Briefcase, Buildings, Calendar, Check, EnvelopeSimple, FileText, Globe, GlobeHemisphereEast,
  Handshake, IdentificationBadge, IdentificationCard, List, MapPin, MapTrifold, Monitor, Phone, ShieldCheck, Timer, TrendUp,
  UserCheck, UsersThree, Wallet, WhatsappLogo, WarningCircle, CheckCircle, X,
} from '@phosphor-icons/react/dist/ssr'
import type { IconProps } from '@phosphor-icons/react'

const icons = {
  'arrow-down-right': ArrowDownRight, 'arrow-right': ArrowRight, bank: Bank, briefcase: Briefcase, buildings: Buildings, calendar: Calendar,
  check: Check, 'check-circle': CheckCircle, 'envelope-simple': EnvelopeSimple, 'file-text': FileText, globe: Globe, 'globe-hemisphere-east': GlobeHemisphereEast,
  handshake: Handshake, 'identification-badge': IdentificationBadge, 'identification-card': IdentificationCard, list: List, 'map-pin': MapPin,
  'map-trifold': MapTrifold, monitor: Monitor, phone: Phone, 'shield-check': ShieldCheck, timer: Timer, 'trend-up': TrendUp, 'user-check': UserCheck,
  'users-three': UsersThree, wallet: Wallet, 'warning-circle': WarningCircle, whatsapp: WhatsappLogo, x: X,
} as const
export type IconName = keyof typeof icons

type Props = Omit<IconProps, 'size' | 'name'> & { name?: string | null; size?: number }
export function Icon({ name, size = 22, ...rest }: Props) {
  const Component = icons[(name as IconName) in icons ? (name as IconName) : 'check']
  return <Component size={size} aria-hidden="true" focusable="false" {...rest} />
}
