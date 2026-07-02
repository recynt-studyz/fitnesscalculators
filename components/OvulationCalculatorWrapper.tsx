'use client'

import dynamic from 'next/dynamic'

const OvulationCalculator = dynamic(() => import('./OvulationCalculator'), { ssr: false })

export default function OvulationCalculatorWrapper() {
  return <OvulationCalculator />
}
