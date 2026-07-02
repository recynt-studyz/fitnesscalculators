'use client'

import dynamic from 'next/dynamic'

const BMICalculator = dynamic(() => import('./BMICalculator'), { ssr: false })

export default function BMICalculatorWrapper() {
  return <BMICalculator />
}
