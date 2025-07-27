'use client'

import { Content } from './_content'

export default function Page() {
  return (
    <div className="w-full flex items-center flex-col justify-center space-y-14">
      <div className="relative flex flex-col w-screen items-center justify-center">
        <Content />
      </div>
    </div>
  )
}
