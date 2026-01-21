import * as App from '@ez/web/components/app'
import { getSiteConfig } from '@ez/web/server/get-site-config'
import { Fragment } from 'react'
import '@ez/shared/styles/themes/root.css'
import { FooterFactory } from '@ez/web/components/layout/footer-factory'
import { HeaderFactory } from '@ez/web/components/layout/header-factory'

export default async function NormalLayout({ children }: { children: React.ReactNode }) {
  const data = await getSiteConfig()

  return (
    <Fragment>
      <HeaderFactory data={data} navigation={data.navigation?.header} theme="default" />
      {/* <App.Header DesktopNavComponent={MainDesktopNavigation} data={data} theme="default" /> */}
      <App.Content>{children}</App.Content>
      <FooterFactory data={data} navigation={data.navigation?.footer} theme="default" />
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
