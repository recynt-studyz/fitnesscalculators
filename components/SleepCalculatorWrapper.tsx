'use client'

import dynamic from 'next/dynamic'

const SleepCalculator = dynamic(() => import('./SleepCalculator'), { ssr: false })

export default function SleepCalculatorWrapper() {
  return <SleepCalculator />
}
