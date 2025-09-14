import { ListComponent, type ListType } from '@ez/shared/sanity/components/list'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'

export const ListWrapper = ({ value }: { value: ListType }) => {
  return <ListComponent portableComponentsOverrides={createPortableComponents()} value={value} />
}
