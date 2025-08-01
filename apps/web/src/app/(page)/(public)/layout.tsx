import * as App from '@ez/web/components/app'
import { getSiteConfig } from '@ez/web/server/get-site-config'
import { Fragment } from 'react'

import '../../styles.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await getSiteConfig()

  return (
    <Fragment>
      <App.Header data={data} />
      <App.Content>{children}</App.Content>
      <App.Footer />
    </Fragment>
  )
}
