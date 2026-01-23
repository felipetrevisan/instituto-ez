import '@ez/shared/styles/themes/root.css'
import { BaseNormal } from '@ez/web/components/landing/base'

export default async function NormalLayout({ children }: { children: React.ReactNode }) {
  return <BaseNormal theme="ebooks">{children}</BaseNormal>
}
