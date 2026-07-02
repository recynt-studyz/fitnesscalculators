'use client'

import { useState, useEffect } from 'react'
import UnitToggle from './UnitToggle'

const STORAGE_KEY = 'fc-bmr'

const activityLevels = [
  { label: 'Sedentary (desk job, little exercise)', multiplier: 1.2 },
  { label: 'Lightly Active (1–3 days/week)', multiplier: 1.375 },
  { label: 'Moderately Active (3–5 days/week)', multiplier: 1.55 },
  { label: 'Very Active (6–7 days/week)', multiplier: 1.725 },
  { label: 'Extra Active (athlete / physical job)', multiplier: 1.9 },
]

function mifflinBMR(kg: number, cm: number, age: number, sex: 'male' | 'female'): number {
  const base = 10 * kg + 6.25 * cm - 5 * age
  return sex === 'male' ? base + 5 : base - 161
}

function harrisBMR(kg: number, cm: number, age: number, sex: 'male' | 'female'): number {
  return sex === 'male'
    ? 88.362 + 13.397 * kg + 4.799 * cm - 5.677 * age
    : 447.593 + 9.247 * kg + 3.098 * cm - 4.33 * age
}

export default function BMRCalculator() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [heightFt, setHeightFt] = useState('5')
  const [heightIn, setHeightIn] = useState('10')
  const [heightCm, setHeightCm] = useState('177.8')
  const [weightLbs, setWeightLbs] = useState('160')
  const [weightKg, setWeightKg] = useState('72.6')
  const [age, setAge] = useState('30')
  const [sex, setSex] = useState<'male' | 'female'>('male')
  const [formula, setFormula] = useState<'mifflin' | 'harris'>('mifflin')

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
      if (saved.formula) setFormula(saved.formula)
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
      setWeightKg(((parseFloat(weightLbs) || 0) / 2.20462).toFixed(1))
    } else {
      const totalIn = (parseFloat(heightCm) || 0) / 2.54
      setHeightFt(Math.floor(totalIn / 12).toString())
      setHeightIn((totalIn % 12).toFixed(0))
      setWeightLbs(((parseFloat(weightKg) || 0) * 2.20462).toFixed(1))
    }
  }

  const kg = unit === 'metric' ? parseFloat(weightKg) || 0 : (parseFloat(weightLbs) || 0) / 2.20462
  const cm = unit === 'metric'
    ? parseFloat(heightCm) || 0
    : ((parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)) * 2.54
  const ageN = parseFloat(age) || 0

  const mifflin = kg > 0 && cm > 0 && ageN > 0 ? mifflinBMR(kg, cm, ageN, sex) : 0
  const harris = kg > 0 && cm > 0 && ageN > 0 ? harrisBMR(kg, cm, ageN, sex) : 0
  const bmr = formula === 'mifflin' ? mifflin : harris

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="mb-5">
        <UnitToggle unit={unit} onChange={handleUnitChange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {unit === 'imperial' ? (
            <div>
              <label className={labelCls}>Height</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input type="number" value={heightFt} min="1" max="8"
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
                <input type="number" value={heightCm} min="50" max="250"
                  onChange={e => { setHeightCm(e.target.value); save({ heightCm: e.target.value }) }}
                  className={`${inputCls} pr-10`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">cm</span>
              </div>
            </div>
          )}

          {unit === 'imperial' ? (
            <div>
              <label className={labelCls}>Weight</label>
              <div className="relative">
                <input type="number" value={weightLbs} min="50" max="1000"
                  onChange={e => { setWeightLbs(e.target.value); save({ weightLbs: e.target.value }) }}
                  className={`${inputCls} pr-10`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">lbs</span>
              </div>
            </div>
          ) : (
            <div>
              <label className={labelCls}>Weight</label>
              <div className="relative">
                <input type="number" value={weightKg} min="20" max="500"
                  onChange={e => { setWeightKg(e.target.value); save({ weightKg: e.target.value }) }}
                  className={`${inputCls} pr-10`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">kg</span>
              </div>
            </div>
          )}

          <div>
            <label className={labelCls}>Age</label>
            <div className="relative">
              <input type="number" value={age} min="15" max="100"
                onChange={e => { setAge(e.target.value); save({ age: e.target.value }) }}
                className={`${inputCls} pr-14`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">years</span>
            </div>
          </div>

          <div>
            <label className={labelCls}>Sex</label>
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
              {(['male', 'female'] as const).map(s => (
                <button key={s} onClick={() => { setSex(s); save({ sex: s }) }}
                  className={`flex-1 py-2 text-sm font-medium capitalize transition-colors ${
                    sex === s ? 'bg-teal-600 text-white' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Formula</label>
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
              {([['mifflin', 'Mifflin-St Jeor'], ['harris', 'Harris-Benedict']] as const).map(([val, label]) => (
                <button key={val} onClick={() => { setFormula(val); save({ formula: val }) }}
                  className={`flex-1 py-2 text-xs font-medium transition-colors ${
                    formula === val ? 'bg-teal-600 text-white' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 p-5">
            <p className="text-sm font-medium text-teal-800 dark:text-teal-400 mb-1">Your BMR</p>
            <p className="text-4xl font-bold text-teal-700 dark:text-teal-300">
              {bmr > 0 ? Math.round(bmr).toLocaleString() : '—'}
            </p>
            <p className="text-xs text-teal-600 dark:text-teal-500 mt-1">calories/day at complete rest</p>
          </div>

          {bmr > 0 && (
            <>
              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Formula Comparison</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Mifflin-St Jeor <span className="text-xs text-teal-600 dark:text-teal-400">(most accurate)</span></span>
                    <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{Math.round(mifflin).toLocaleString()} cal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Harris-Benedict <span className="text-xs text-gray-400">(older)</span></span>
                    <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{Math.round(harris).toLocaleString()} cal</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Activity Level → Daily Calories</p>
                <div className="space-y-2">
                  {activityLevels.map(a => (
                    <div key={a.label} className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400 flex-1 pr-2">{a.label}</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300 shrink-0">{Math.round(bmr * a.multiplier).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        Results are estimates for general informational purposes only. Consult a qualified healthcare provider before making health or fitness decisions.
      </p>
    </div>
  )
}
