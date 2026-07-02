'use client'

import dynamic from 'next/dynamic'

const BodyFatCalculator = dynamic(() => import('./BodyFatCalculator'), { ssr: false })

export default function BodyFatCalculatorWrapper() {
  return <BodyFatCalculator />
}
