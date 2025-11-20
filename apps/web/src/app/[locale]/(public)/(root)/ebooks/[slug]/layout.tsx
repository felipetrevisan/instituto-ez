import NormalLayout from '@ez/web/components/layout/normal-layout'
import type { ReactNode } from 'react'

import '../../../../../styles.css'

export default async function EbookLayout({ children }: { children: ReactNode }) {
  return <NormalLayout>{children}</NormalLayout>
}
