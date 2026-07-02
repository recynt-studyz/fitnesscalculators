'use client'

import { useState, useEffect } from 'react'
import UnitToggle from './UnitToggle'

const STORAGE_KEY = 'fc-idealweight'

function idealWeights(heightIn: number, sex: 'male' | 'female') {
  const extra = Math.max(0, heightIn - 60)
  return {
    devine: sex === 'male' ? 50 + 2.3 * extra : 45.5 + 2.3 * extra,
    hamwi:  sex === 'male' ? 48 + 2.7 * extra : 45.5 + 2.2 * extra,
    robinson: sex === 'male' ? 52 + 1.9 * extra : 49 + 1.7 * extra,
    miller: sex === 'male' ? 56.2 + 1.41 * extra : 53.1 + 1.36 * extra,
  }
}

// Healthy BMI range weight for given height
function bmiWeightRange(heightM: number) {
  return {
    low: 18.5 * heightM * heightM,
    high: 24.9 * heightM * heightM,
  }
}

export default function IdealWeightCalculator() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [heightFt, setHeightFt] = useState('5')
  const [heightIn, setHeightIn] = useState('10')
  const [heightCm, setHeightCm] = useState('177.8')
  const [sex, setSex] = useState<'male' | 'female'>('male')
  const [frame, setFrame] = useState<'small' | 'medium' | 'large'>('medium')

  useEffect(() => {
    try {
      const savedUnit = localStorage.getItem('fc-units') as 'imperial' | 'metric' | null
      if (savedUnit) setUnit(savedUnit)
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.heightFt) setHeightFt(saved.heightFt)
      if (saved.heightIn) setHeightIn(saved.heightIn)
      if (saved.heightCm) setHeightCm(saved.heightCm)
      if (saved.sex) setSex(saved.sex)
      if (saved.frame) setFrame(saved.frame)
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
    if (u === 'metric') {
      const totalIn = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)
      setHeightCm((totalIn * 2.54).toFixed(1))
    } else {
      const totalIn = (parseFloat(heightCm) || 0) / 2.54
      setHeightFt(Math.floor(totalIn / 12).toString())
      setHeightIn((totalIn % 12).toFixed(0))
    }
  }

  const totalIn = unit === 'imperial'
    ? (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)
    : (parseFloat(heightCm) || 0) / 2.54
  const heightM = totalIn * 0.0254

  const valid = totalIn >= 48 // at least 4 feet
  const weights = valid ? idealWeights(totalIn, sex) : null
  const bmiRange = heightM > 0 ? bmiWeightRange(heightM) : null

  const frameAdj = frame === 'small' ? -5 : frame === 'large' ? 5 : 0

  function kgToLbs(kg: number) { return kg * 2.20462 }

  const formulas = weights ? [
    { name: 'Devine', kg: weights.devine },
    { name: 'Hamwi', kg: weights.hamwi },
    { name: 'Robinson', kg: weights.robinson },
    { name: 'Miller', kg: weights.miller },
  ] : []

  const allKg = formulas.map(f => f.kg + frameAdj)
  const consensusLow = allKg.length ? Math.min(...allKg) : 0
  const consensusHigh = allKg.length ? Math.max(...allKg) : 0

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

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
          {unit === 'imperial' ? (
            <div>
              <label className={labelCls}>Height</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input type="number" value={heightFt} min="4" max="8"
                    onChange={e => { setHeightFt(e.target.value); save({ heightFt: e.target.value }) }}
                    className={`${inputCls} pr-8`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">ft</span>
                </div>
                <div className="relative flex-1">
                  <input type="number" value={heightIn} min="0" max="11"
                    onChange={e => { setHeightIn(e.target.value); save({ heightIn: e.target.value }) }}
                    className={`${inputCls} pr-8`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">in</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className={labelCls}>Height</label>
              <div className="relative">
                <input type="number" value={heightCm} min="120" max="250"
                  onChange={e => { setHeightCm(e.target.value); save({ heightCm: e.target.value }) }}
                  className={`${inputCls} pr-10`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">cm</span>
              </div>
            </div>
          )}

          <div>
            <label className={labelCls}>Frame Size</label>
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
              {(['small', 'medium', 'large'] as const).map(f => (
                <button key={f} onClick={() => { setFrame(f); save({ frame: f }) }}
                  className={`flex-1 py-2 text-sm font-medium capitalize transition-colors ${
                    frame === f ? 'bg-teal-600 text-white' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {weights && bmiRange ? (
            <>
              <div className="rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 p-5">
                <p className="text-sm font-medium text-teal-700 dark:text-teal-400 mb-1">Recommended Range</p>
                <p className="text-2xl font-bold text-teal-600 dark:text-teal-300">
                  {kgToLbs(consensusLow).toFixed(0)}–{kgToLbs(consensusHigh).toFixed(0)} lbs
                </p>
                <p className="text-sm text-teal-600 dark:text-teal-400">
                  {consensusLow.toFixed(0)}–{consensusHigh.toFixed(0)} kg
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Formula Results</p>
                <div className="space-y-2">
                  {formulas.map(f => (
                    <div key={f.name} className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{f.name}</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {kgToLbs(f.kg + frameAdj).toFixed(1)} lbs / {(f.kg + frameAdj).toFixed(1)} kg
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Healthy BMI Range (18.5–24.9)</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Weight range</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {kgToLbs(bmiRange.low).toFixed(0)}–{kgToLbs(bmiRange.high).toFixed(0)} lbs
                    <span className="text-gray-400 text-xs ml-1">({bmiRange.low.toFixed(0)}–{bmiRange.high.toFixed(0)} kg)</span>
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-8 text-center">
              <p className="text-gray-400 text-sm">Enter your height to see ideal weight estimates.</p>
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        These are estimates based on population averages. Healthy weight varies by muscle mass, bone density, and body composition. Consult a qualified healthcare provider before making health or fitness decisions.
      </p>
    </div>
  )
}
