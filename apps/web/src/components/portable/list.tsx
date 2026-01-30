import { ListComponent, type ListType } from '@ez/shared/sanity/components/list'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'

export const ListWrapper = ({ value }: { value: ListType }) => {
  return (
    <FadeIn>
      <ListComponent portableComponentsOverrides={createPortableComponents()} value={value} />
    </FadeIn>
  )
}
