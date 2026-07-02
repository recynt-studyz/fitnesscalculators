'use client'

import dynamic from 'next/dynamic'

const MacroCalculator = dynamic(() => import('./MacroCalculator'), { ssr: false })

export default function MacroCalculatorWrapper() {
  return <MacroCalculator />
}
