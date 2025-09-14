import { TabsComponent, type TabsType } from '@ez/shared/sanity/components/tabs'
import { urlForImage } from '@ez/web/config/image'
import Image from 'next/image'
import { EbooksWrapper } from './ebooks'

export const TabsWrapper = ({ value }: { value: TabsType }) => {
  return (
    <TabsComponent
      ImageComponent={Image}
      imageBuilder={urlForImage}
      portableComponentsOverrides={{
        types: {
          ebooksWidget: ({ value }) => <EbooksWrapper value={value} />,
        },
      }}
      value={value}
    />
  )
}
