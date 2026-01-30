import { Skeleton as BaseSkeleton } from '@ez/shared/ui/skeleton'
import { FadeIn } from '@ez/web/components/ui/fade-in'

export function Skeleton() {
  return (
    <FadeIn className="contents">
      <BaseSkeleton className="h-96 w-80" />
      <BaseSkeleton className="h-96 w-80" />
      <BaseSkeleton className="h-96 w-80" />
    </FadeIn>
  )
}
