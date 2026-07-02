'use client'

import { useState, useEffect } from 'react'
import UnitToggle from './UnitToggle'

const STORAGE_KEY = 'fc-bodyfat'

function navyBF(sex: 'male' | 'female', heightCm: number, waistCm: number, neckCm: number, hipCm: number): number {
  if (sex === 'male') {
    const denom = 1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)
    if (denom <= 0) return 0
    return 495 / denom - 450
  } else {
    const denom = 1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)
    if (denom <= 0) return 0
    return 495 / denom - 450
  }
}

function getBFCategory(bf: number, sex: 'male' | 'female') {
  if (sex === 'male') {
    if (bf < 6) return { label: 'Essential Fat', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-200 dark:border-blue-800' }
    if (bf < 14) return { label: 'Athletes', color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950/30', border: 'border-teal-200 dark:border-teal-800' }
    if (bf < 18) return { label: 'Fitness', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/30', border: 'border-green-200 dark:border-green-800' }
    if (bf < 25) return { label: 'Acceptable', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30', border: 'border-amber-200 dark:border-amber-800' }
    return { label: 'Obese', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30', border: 'border-red-200 dark:border-red-800' }
  } else {
    if (bf < 14) return { label: 'Essential Fat', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-200 dark:border-blue-800' }
    if (bf < 21) return { label: 'Athletes', color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950/30', border: 'border-teal-200 dark:border-teal-800' }
    if (bf < 25) return { label: 'Fitness', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/30', border: 'border-green-200 dark:border-green-800' }
    if (bf < 32) return { label: 'Acceptable', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30', border: 'border-amber-200 dark:border-amber-800' }
    return { label: 'Obese', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30', border: 'border-red-200 dark:border-red-800' }
  }
}

export default function BodyFatCalculator() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [sex, setSex] = useState<'male' | 'female'>('male')
  const [height, setHeight] = useState('70')
  const [waist, setWaist] = useState('32')
  const [neck, setNeck] = useState('15')
  const [hip, setHip] = useState('38')
  const [weight, setWeight] = useState('160')

  useEffect(() => {
    try {
      const savedUnit = localStorage.getItem('fc-units') as 'imperial' | 'metric' | null
      if (savedUnit) setUnit(savedUnit)
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.sex) setSex(saved.sex)
      if (saved.height) setHeight(saved.height)
      if (saved.waist) setWaist(saved.waist)
      if (saved.neck) setNeck(saved.neck)
      if (saved.hip) setHip(saved.hip)
      if (saved.weight) setWeight(saved.weight)
    } catch { /* ignore */ }
  }, [])

  function save(updates: Record<string, string>) {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  function handleUnitChange(u: 'imperial' | 'metric') {
    setUnit(u)
    try { localStorage.setItem('fc-units', u) } catch { /* ignore */ }
    const factor = u === 'metric' ? 2.54 : 1 / 2.54
    const wFactor = u === 'metric' ? 1 / 2.20462 : 2.20462
    setHeight((parseFloat(height) * factor).toFixed(1))
    setWaist((parseFloat(waist) * factor).toFixed(1))
    setNeck((parseFloat(neck) * factor).toFixed(1))
    setHip((parseFloat(hip) * factor).toFixed(1))
    setWeight((parseFloat(weight) * wFactor).toFixed(1))
  }

  const toCm = (v: string) => unit === 'metric' ? parseFloat(v) || 0 : (parseFloat(v) || 0) * 2.54
  const toKg = (v: string) => unit === 'metric' ? parseFloat(v) || 0 : (parseFloat(v) || 0) / 2.20462
  const heightCm = toCm(height)
  const waistCm = toCm(waist)
  const neckCm = toCm(neck)
  const hipCm = toCm(hip)
  const weightKg = toKg(weight)

  const valid = heightCm > 0 && waistCm > neckCm && neckCm > 0 && (sex === 'male' || hipCm > 0)
  const bf = valid ? navyBF(sex, heightCm, waistCm, neckCm, hipCm) : 0
  const fatMassKg = weightKg * (bf / 100)
  const leanMassKg = weightKg - fatMassKg
  const fatMassLbs = fatMassKg * 2.20462
  const leanMassLbs = leanMassKg * 2.20462
  const cat = bf > 0 ? getBFCategory(bf, sex) : null

  const unitLabel = unit === 'imperial' ? 'in' : 'cm'
  const weightLabel = unit === 'imperial' ? 'lbs' : 'kg'

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  const catRanges = sex === 'male'
    ? [
        { label: 'Essential Fat', range: '2–5%', min: 2, max: 6 },
        { label: 'Athletes', range: '6–13%', min: 6, max: 14 },
        { label: 'Fitness', range: '14–17%', min: 14, max: 18 },
        { label: 'Acceptable', range: '18–24%', min: 18, max: 25 },
        { label: 'Obese', range: '25%+', min: 25, max: 100 },
      ]
    : [
        { label: 'Essential Fat', range: '10–13%', min: 10, max: 14 },
        { label: 'Athletes', range: '14–20%', min: 14, max: 21 },
        { label: 'Fitness', range: '21–24%', min: 21, max: 25 },
        { label: 'Acceptable', range: '25–31%', min: 25, max: 32 },
        { label: 'Obese', range: '32%+', min: 32, max: 100 },
      ]

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-4 mb-5">
        <UnitToggle unit={unit} onChange={handleUnitChange} />
        <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
          {(['male', 'female'] as const).map(s => (
            <button key={s} onClick={() => { setSex(s); save({ sex: s }) }}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                sex === s ? 'bg-teal-600 text-white' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Height ({unitLabel})</label>
            <div className="relative">
              <input type="number" value={height} min="50" max="250"
                onChange={e => { setHeight(e.target.value); save({ height: e.target.value }) }}
                className={`${inputCls} pr-10`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{unitLabel}</span>
            </div>
          </div>
          <div>
            <label className={labelCls}>Neck circumference ({unitLabel})</label>
            <div className="relative">
              <input type="number" value={neck} step="0.1"
                onChange={e => { setNeck(e.target.value); save({ neck: e.target.value }) }}
                className={`${inputCls} pr-10`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{unitLabel}</span>
            </div>
          </div>
          <div>
            <label className={labelCls}>Waist circumference ({unitLabel}) <span className="text-gray-400 text-xs font-normal">at navel</span></label>
            <div className="relative">
              <input type="number" value={waist} step="0.1"
                onChange={e => { setWaist(e.target.value); save({ waist: e.target.value }) }}
                className={`${inputCls} pr-10`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{unitLabel}</span>
            </div>
          </div>
          {sex === 'female' && (
            <div>
              <label className={labelCls}>Hip circumference ({unitLabel}) <span className="text-gray-400 text-xs font-normal">at widest</span></label>
              <div className="relative">
                <input type="number" value={hip} step="0.1"
                  onChange={e => { setHip(e.target.value); save({ hip: e.target.value }) }}
                  className={`${inputCls} pr-10`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{unitLabel}</span>
              </div>
            </div>
          )}
          <div>
            <label className={labelCls}>Body weight ({weightLabel})</label>
            <div className="relative">
              <input type="number" value={weight} step="0.1"
                onChange={e => { setWeight(e.target.value); save({ weight: e.target.value }) }}
                className={`${inputCls} pr-10`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{weightLabel}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {bf > 0 && cat ? (
            <>
              <div className={`rounded-xl ${cat.bg} border ${cat.border} p-5`}>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Body Fat</p>
                <p className={`text-5xl font-bold ${cat.color}`}>{bf.toFixed(1)}%</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${cat.color}`}>{cat.label}</span>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Fat Mass</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {fatMassLbs.toFixed(1)} lbs / {fatMassKg.toFixed(1)} kg
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Lean Mass</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {leanMassLbs.toFixed(1)} lbs / {leanMassKg.toFixed(1)} kg
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <th className="text-left px-4 py-2 text-gray-500 dark:text-gray-400 font-semibold">Category</th>
                      <th className="text-left px-4 py-2 text-gray-500 dark:text-gray-400 font-semibold">Range</th>
                      <th className="px-4 py-2 text-gray-500 dark:text-gray-400 font-semibold">You</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catRanges.map(c => {
                      const here = bf >= c.min && bf < c.max
                      return (
                        <tr key={c.label} className={`border-b border-gray-50 dark:border-gray-800 ${here ? 'bg-teal-50 dark:bg-teal-950/20' : ''}`}>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{c.label}</td>
                          <td className="px-4 py-2 text-gray-500 dark:text-gray-400">{c.range}</td>
                          <td className="px-4 py-2 text-center">{here && <span className="text-teal-600 dark:text-teal-400 text-xs font-medium">✅ Here</span>}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-8 text-center">
              <p className="text-gray-400 text-sm">Enter your measurements to calculate body fat.</p>
              {waistCm > 0 && neckCm > 0 && waistCm <= neckCm && (
                <p className="text-amber-500 text-xs mt-2">Waist must be greater than neck measurement.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        Uses the US Navy body fat formula. Results are estimates for general informational purposes only. Consult a qualified healthcare provider before making health or fitness decisions.
      </p>
    </div>
  )
}
