'use client'

import { useState, useEffect } from 'react'
import UnitToggle from './UnitToggle'

const STORAGE_KEY = 'fc-bmi'

function calcBMI(weightKg: number, heightM: number): number {
  if (heightM <= 0 || weightKg <= 0) return 0
  return weightKg / (heightM * heightM)
}

function getCategory(bmi: number): { label: string; color: string; bg: string; border: string } {
  if (bmi <= 0) return { label: '—', color: 'text-gray-500', bg: 'bg-gray-50 dark:bg-gray-800', border: 'border-gray-200 dark:border-gray-700' }
  if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-200 dark:border-blue-800' }
  if (bmi < 25) return { label: 'Normal Weight', color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950/30', border: 'border-teal-200 dark:border-teal-800' }
  if (bmi < 30) return { label: 'Overweight', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30', border: 'border-amber-200 dark:border-amber-800' }
  return { label: 'Obese', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30', border: 'border-red-200 dark:border-red-800' }
}

function scalePosition(bmi: number): number {
  // Map BMI 10–45 to 0–100%
  const min = 10, max = 45
  return Math.min(100, Math.max(0, ((bmi - min) / (max - min)) * 100))
}

export default function BMICalculator() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [heightFt, setHeightFt] = useState('5')
  const [heightIn, setHeightIn] = useState('10')
  const [heightCm, setHeightCm] = useState('177.8')
  const [weightLbs, setWeightLbs] = useState('160')
  const [weightKg, setWeightKg] = useState('72.6')
  const [age, setAge] = useState('')
  const [sex, setSex] = useState<'male' | 'female'>('male')

  useEffect(() => {
    try {
      const savedUnit = localStorage.getItem('fc-units') as 'imperial' | 'metric' | null
      if (savedUnit) setUnit(savedUnit)
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.heightFt) setHeightFt(saved.heightFt)
      if (saved.heightIn) setHeightIn(saved.heightIn)
      if (saved.heightCm) setHeightCm(saved.heightCm)
      if (saved.weightLbs) setWeightLbs(saved.weightLbs)
      if (saved.weightKg) setWeightKg(saved.weightKg)
      if (saved.age) setAge(saved.age)
      if (saved.sex) setSex(saved.sex)
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
      const cm = (totalIn * 2.54).toFixed(1)
      const kg = (parseFloat(weightLbs) / 2.20462).toFixed(1)
      setHeightCm(cm)
      setWeightKg(kg)
    } else {
      const totalIn = (parseFloat(heightCm) || 0) / 2.54
      const ft = Math.floor(totalIn / 12).toString()
      const inch = (totalIn % 12).toFixed(0)
      const lbs = ((parseFloat(weightKg) || 0) * 2.20462).toFixed(1)
      setHeightFt(ft)
      setHeightIn(inch)
      setWeightLbs(lbs)
    }
  }

  let bmi = 0
  if (unit === 'imperial') {
    const totalIn = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)
    const lbs = parseFloat(weightLbs) || 0
    bmi = totalIn > 0 ? (lbs * 703) / (totalIn * totalIn) : 0
  } else {
    const cm = parseFloat(heightCm) || 0
    const kg = parseFloat(weightKg) || 0
    bmi = calcBMI(kg, cm / 100)
  }

  const cat = getCategory(bmi)
  const pos = scalePosition(bmi)

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  const categories = [
    { label: 'Underweight', range: '< 18.5', min: 10, max: 18.5, color: 'bg-blue-400' },
    { label: 'Normal', range: '18.5–24.9', min: 18.5, max: 25, color: 'bg-teal-500' },
    { label: 'Overweight', range: '25.0–29.9', min: 25, max: 30, color: 'bg-amber-400' },
    { label: 'Obese', range: '≥ 30.0', min: 30, max: 45, color: 'bg-red-500' },
  ]

  return (
    <div className="p-6">
      <div className="mb-5">
        <UnitToggle unit={unit} onChange={handleUnitChange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          {unit === 'imperial' ? (
            <div>
              <label className={labelCls}>Height</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="number" value={heightFt} min="1" max="8"
                    onChange={e => { setHeightFt(e.target.value); save({ heightFt: e.target.value }) }}
                    className={`${inputCls} pr-8`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">ft</span>
                </div>
                <div className="relative flex-1">
                  <input
                    type="number" value={heightIn} min="0" max="11"
                    onChange={e => { setHeightIn(e.target.value); save({ heightIn: e.target.value }) }}
                    className={`${inputCls} pr-8`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">in</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className={labelCls}>Height</label>
              <div className="relative">
                <input
                  type="number" value={heightCm} min="50" max="250"
                  onChange={e => { setHeightCm(e.target.value); save({ heightCm: e.target.value }) }}
                  className={`${inputCls} pr-10`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">cm</span>
              </div>
            </div>
          )}

          {unit === 'imperial' ? (
            <div>
              <label className={labelCls}>Weight</label>
              <div className="relative">
                <input
                  type="number" value={weightLbs} min="50" max="1000"
                  onChange={e => { setWeightLbs(e.target.value); save({ weightLbs: e.target.value }) }}
                  className={`${inputCls} pr-10`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">lbs</span>
              </div>
            </div>
          ) : (
            <div>
              <label className={labelCls}>Weight</label>
              <div className="relative">
                <input
                  type="number" value={weightKg} min="20" max="500"
                  onChange={e => { setWeightKg(e.target.value); save({ weightKg: e.target.value }) }}
                  className={`${inputCls} pr-10`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">kg</span>
              </div>
            </div>
          )}

          <div>
            <label className={labelCls}>Age <span className="text-gray-400 font-normal">(optional)</span></label>
            <div className="relative">
              <input
                type="number" value={age} min="2" max="120" placeholder="e.g. 30"
                onChange={e => { setAge(e.target.value); save({ age: e.target.value }) }}
                className={`${inputCls} pr-12`}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">years</span>
            </div>
          </div>

          <div>
            <label className={labelCls}>Sex <span className="text-gray-400 font-normal">(for context)</span></label>
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
              {(['male', 'female'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => { setSex(s); save({ sex: s }) }}
                  className={`flex-1 py-2 text-sm font-medium capitalize transition-colors ${
                    sex === s
                      ? 'bg-teal-600 text-white'
                      : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className={`rounded-xl ${cat.bg} border ${cat.border} p-5`}>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Your BMI</p>
            <p className={`text-5xl font-bold ${cat.color}`}>{bmi > 0 ? bmi.toFixed(1) : '—'}</p>
            {bmi > 0 && (
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${cat.color} ${cat.bg} border ${cat.border}`}>
                {cat.label === 'Normal Weight' ? '✅' : cat.label === 'Underweight' ? '⚠️' : cat.label === 'Overweight' ? '⚠️' : '🔴'} {cat.label}
              </span>
            )}
          </div>

          {/* Scale bar */}
          {bmi > 0 && (
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3">BMI Scale</p>
              <div className="relative h-4 rounded-full overflow-hidden flex">
                <div className="bg-blue-400 flex-none" style={{ width: '24%' }} />
                <div className="bg-teal-500 flex-none" style={{ width: '22.9%' }} />
                <div className="bg-amber-400 flex-none" style={{ width: '17.1%' }} />
                <div className="bg-red-500 flex-1" />
              </div>
              <div className="relative h-4 mt-1">
                <div
                  className="absolute top-0 w-0.5 h-4 bg-gray-800 dark:bg-white rounded-full transition-all"
                  style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>10</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>45+</span>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {[
                  { color: 'bg-blue-400', label: 'Underweight' },
                  { color: 'bg-teal-500', label: 'Normal' },
                  { color: 'bg-amber-400', label: 'Overweight' },
                  { color: 'bg-red-500', label: 'Obese' },
                ].map(c => (
                  <span key={c.label} className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className={`w-2.5 h-2.5 rounded-sm ${c.color} inline-block`} />{c.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Table */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="text-left px-4 py-2.5 text-gray-600 dark:text-gray-400 font-semibold">Category</th>
                  <th className="text-left px-4 py-2.5 text-gray-600 dark:text-gray-400 font-semibold">BMI Range</th>
                  <th className="px-4 py-2.5 text-gray-600 dark:text-gray-400 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(c => {
                  const isHere = bmi > 0 && bmi >= c.min && bmi < c.max
                  return (
                    <tr key={c.label} className={`border-b border-gray-50 dark:border-gray-800 ${isHere ? 'bg-teal-50 dark:bg-teal-950/20' : ''}`}>
                      <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">{c.label}</td>
                      <td className="px-4 py-2.5 text-gray-500 dark:text-gray-400">{c.range}</td>
                      <td className="px-4 py-2.5 text-center">
                        {isHere && <span className="text-teal-600 dark:text-teal-400 font-medium text-xs">✅ You are here</span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        BMI is a screening tool, not a diagnostic measure. It does not account for muscle mass, bone density, or body composition. Consult a healthcare provider for personalized advice.
      </p>
    </div>
  )
}
