// Minimal Lexical → HTML renderer for CMS rich text (paragraphs, headings, lists, links, bold/italic).
import type { ReactNode } from 'react'

type Node = { type: string; children?: Node[]; text?: string; format?: number | string; tag?: string; listType?: string; fields?: { url?: string; newTab?: boolean }; url?: string }

function renderNodes(nodes: Node[] | undefined, key = 'n'): ReactNode[] {
  return (nodes ?? []).map((node, i) => {
    const k = `${key}-${i}`
    switch (node.type) {
      case 'text': {
        let el: ReactNode = node.text ?? ''
        const f = typeof node.format === 'number' ? node.format : 0
        if (f & 1) el = <strong key={k}>{el}</strong>
        if (f & 2) el = <em key={k}>{el}</em>
        if (f & 8) el = <u key={k}>{el}</u>
        return <span key={k}>{el}</span>
      }
      case 'paragraph': return <p key={k}>{renderNodes(node.children, k)}</p>
      case 'heading': { const Tag = (['h2', 'h3', 'h4'].includes(node.tag ?? '') ? node.tag : 'h2') as 'h2' | 'h3' | 'h4'; return <Tag key={k}>{renderNodes(node.children, k)}</Tag> }
      case 'list': { const Tag = node.listType === 'number' ? 'ol' : 'ul'; return <Tag key={k}>{renderNodes(node.children, k)}</Tag> }
      case 'listitem': return <li key={k}>{renderNodes(node.children, k)}</li>
      case 'link': case 'autolink': {
        const url = node.fields?.url ?? node.url ?? '#'
        const external = /^https?:/.test(url)
        return <a key={k} href={url} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{renderNodes(node.children, k)}</a>
      }
      case 'quote': return <blockquote key={k}>{renderNodes(node.children, k)}</blockquote>
      case 'linebreak': return <br key={k} />
      default: return node.children ? <span key={k}>{renderNodes(node.children, k)}</span> : null
    }
  })
}

export function RichText({ value, className }: { value: unknown; className?: string }) {
  const root = (value as { root?: Node } | null)?.root
  if (!root) return null
  return <div className={['af-prose', className].filter(Boolean).join(' ')}>{renderNodes(root.children)}</div>
}
