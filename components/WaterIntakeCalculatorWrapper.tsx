'use client'

import dynamic from 'next/dynamic'

const WaterIntakeCalculator = dynamic(() => import('./WaterIntakeCalculator'), { ssr: false })

export default function WaterIntakeCalculatorWrapper() {
  return <WaterIntakeCalculator />
}
