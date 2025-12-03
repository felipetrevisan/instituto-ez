'use client'

import { useEffect, useState } from 'react'

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

export function useDeviceType() {
  const [device, setDevice] = useState<DeviceType>('desktop')

  useEffect(() => {
    const detectDevice = () => {
      const ua = navigator.userAgent || ''
      const platform = navigator.platform || ''
      const width = window.innerWidth
      const height = window.innerHeight
      const min = Math.min(width, height)
      const dpr = window.devicePixelRatio || 1
      const touch = 'ontouchstart' in window

      // ---- 1) REAL iPadOS / iPad Pro detection ----
      const isRealIPad =
        /iPad|Macintosh/.test(platform) && touch && min / dpr > 500 && min / dpr < 1200

      // ---- 2) Android Tablets ----
      const isAndroidTablet = /Android/.test(ua) && !/Mobile/.test(ua) && min / dpr >= 600

      // ---- 3) DevTools tablet emulation ----
      const isDevToolsTablet = touch && min / dpr >= 600 && min / dpr < 1100

      // ---- 4) Final classification ----
      if (isRealIPad || isAndroidTablet || isDevToolsTablet) {
        return 'tablet'
      }

      // Mobile detection
      if (touch && min / dpr < 600) {
        return 'mobile'
      }

      return 'desktop'
    }

    const update = () => setDevice(detectDevice())

    update()
    window.addEventListener('resize', update)

    return () => window.removeEventListener('resize', update)
  }, [])

  return {
    device,
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
  }
}
