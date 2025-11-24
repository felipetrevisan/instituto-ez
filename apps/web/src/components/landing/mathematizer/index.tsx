'use client'

import { Benefits } from '@ez/web/components/landing/mathematizer/benefits'
import { FinalCTA } from '@ez/web/components/landing/mathematizer/final-cta'
import { Hero } from '@ez/web/components/landing/mathematizer/hero'
import { Mathematizer } from '@ez/web/components/landing/mathematizer/mathematizer'
import { WhatIs } from '@ez/web/components/landing/mathematizer/what-is'
import { WhyCompaniesNeed } from '@ez/web/components/landing/mathematizer/why-companies-need'

import './style.css'

export function LandingPageMathematizer() {
  return (
    <div className="min-h-screen">
      <Hero />
      <WhatIs />
      <Mathematizer />
      <WhyCompaniesNeed />
      <Benefits />
      <FinalCTA />
    </div>
  )
}
