'use client'

import dynamic from 'next/dynamic'

const IdealWeightCalculator = dynamic(() => import('./IdealWeightCalculator'), { ssr: false })

export default function IdealWeightCalculatorWrapper() {
  return <IdealWeightCalculator />
}
