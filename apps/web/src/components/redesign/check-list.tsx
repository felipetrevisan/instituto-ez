import { Check } from 'lucide-react'

export function CheckList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={className ?? 'space-y-3'}>
      {items.map((item) => (
        <li className="flex items-start gap-3" key={item}>
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--rdg-copper)]" />
          <span className="text-[var(--rdg-on-surface-variant)]">{item}</span>
        </li>
      ))}
    </ul>
  )
}
