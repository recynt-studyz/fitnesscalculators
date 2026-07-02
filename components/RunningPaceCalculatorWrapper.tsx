'use client'

import dynamic from 'next/dynamic'

const RunningPaceCalculator = dynamic(() => import('./RunningPaceCalculator'), { ssr: false })

export default function RunningPaceCalculatorWrapper() {
  return <RunningPaceCalculator />
}
