import { TabsComponent, type TabsType } from '@ez/shared/sanity/components/tabs'
import { EbooksWrapper } from './ebooks'

export const TabsWrapper = ({ value }: { value: TabsType }) => {
  return (
    <TabsComponent
      value={value}
      portableComponentsOverrides={{
        types: {
          ebooksWidget: ({ value }) => <EbooksWrapper value={value} />,
        },
      }}
    />
  )
}
