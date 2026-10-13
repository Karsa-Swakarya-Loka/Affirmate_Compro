// Desaturated, green-tinted photo wrapper (design .af-photo) around next/image. Renders nothing without a usable upload.
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { asMedia } from '@/lib/cms'

type Props = { media: unknown; className?: string; sizes?: string; priority?: boolean; alt?: string }

export function Photo({ media, className, sizes = '(min-width: 1024px) 50vw, 100vw', priority, alt }: Props) {
  const m = asMedia(media) as Media | null
  if (!m?.url) return null
  return (
    <div className={['af-photo', className].filter(Boolean).join(' ')}>
      <Image src={m.url} alt={alt ?? m.alt ?? ''} width={m.width ?? 1600} height={m.height ?? 900} sizes={sizes} priority={priority} fetchPriority={priority ? 'high' : undefined} />
    </div>
  )
}
