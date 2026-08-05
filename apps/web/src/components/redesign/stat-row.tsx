import type { RedesignStat } from '@ez/web/content/redesign/types'

export function StatRow({ stats, className }: { stats: RedesignStat[]; className?: string }) {
  return (
    <div className={className ?? 'flex flex-wrap gap-10'}>
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="mb-1 font-bold text-4xl text-[var(--rdg-copper)]">{stat.value}</p>
          <p className="rdg-label opacity-70">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
