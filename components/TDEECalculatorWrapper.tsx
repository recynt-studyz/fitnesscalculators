'use client'

import dynamic from 'next/dynamic'

const TDEECalculator = dynamic(() => import('./TDEECalculator'), { ssr: false })

export default function TDEECalculatorWrapper() {
  return <TDEECalculator />
}
