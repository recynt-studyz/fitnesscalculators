'use client'

import dynamic from 'next/dynamic'

const CalorieCalculator = dynamic(() => import('./CalorieCalculator'), { ssr: false })

export default function CalorieCalculatorWrapper() {
  return <CalorieCalculator />
}
