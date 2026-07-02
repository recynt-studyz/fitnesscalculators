'use client'

import dynamic from 'next/dynamic'

const BMRCalculator = dynamic(() => import('./BMRCalculator'), { ssr: false })

export default function BMRCalculatorWrapper() {
  return <BMRCalculator />
}
