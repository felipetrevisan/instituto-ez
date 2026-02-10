import '@ez/shared/styles/themes/root.css'
import { BaseNormal } from '@ez/web/components/landing/base'
import type { ReactNode } from 'react'
import '../../../../../styles.css'

export default async function MasterclassLayout({ children }: { children: ReactNode }) {
  return <BaseNormal theme="masterclass">{children}</BaseNormal>
}
