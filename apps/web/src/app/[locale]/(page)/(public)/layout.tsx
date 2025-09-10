import * as App from '@ez/web/components/app'
import { getSiteConfig } from '@ez/web/server/get-site-config'
import { Fragment } from 'react'

import '../../../styles.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await getSiteConfig()

  return (
    <Fragment>
      <App.Header data={data} />
      <App.Content>{children}</App.Content>
      <App.Footer />
      <svg className="hidden" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              result="goo"
              values="1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 21 -7"
            />
            <feBlend in="SourceGraphic" in2="goo" result="mix" />
          </filter>
        </defs>
      </svg>
    </Fragment>
  )
}
