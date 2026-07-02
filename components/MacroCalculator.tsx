'use client'

import { useState, useEffect } from 'react'
import UnitToggle from './UnitToggle'

const STORAGE_KEY = 'fc-macros'

const activityLevels = [
  { label: 'Sedentary', desc: 'Little or no exercise', multiplier: 1.2 },
  { label: 'Lightly Active', desc: '1–3 days/week', multiplier: 1.375 },
  { label: 'Moderately Active', desc: '3–5 days/week', multiplier: 1.55 },
  { label: 'Very Active', desc: '6–7 days/week', multiplier: 1.725 },
  { label: 'Extra Active', desc: 'Athlete / physical job', multiplier: 1.9 },
]

const dietStyles = {
  balanced:    { name: 'Balanced',      protein: 0.30, fat: 0.30, carbs: 0.40 },
  lowcarb:     { name: 'Low Carb',      protein: 0.35, fat: 0.45, carbs: 0.20 },
  highprotein: { name: 'High Protein',  protein: 0.40, fat: 0.25, carbs: 0.35 },
  keto:        { name: 'Keto',          protein: 0.25, fat: 0.70, carbs: 0.05 },
}

function mifflinBMR(kg: number, cm: number, age: number, sex: 'male' | 'female'): number {
  const base = 10 * kg + 6.25 * cm - 5 * age
  return sex === 'male' ? base + 5 : base - 161
}

export default function MacroCalculator() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [heightFt, setHeightFt] = useState('5')
  const [heightIn, setHeightIn] = useState('10')
  const [heightCm, setHeightCm] = useState('177.8')
  const [weightLbs, setWeightLbs] = useState('160')
  const [weightKg, setWeightKg] = useState('72.6')
  const [age, setAge] = useState('30')
  const [sex, setSex] = useState<'male' | 'female'>('male')
  const [activity, setActivity] = useState(2)
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'muscle'>('maintain')
  const [diet, setDiet] = useState<keyof typeof dietStyles>('balanced')
  const [meals, setMeals] = useState(3)

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
      if (saved.activity !== undefined) setActivity(Number(saved.activity))
      if (saved.goal) setGoal(saved.goal)
      if (saved.diet) setDiet(saved.diet)
      if (saved.meals) setMeals(Number(saved.meals))
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
  const lbs = unit === 'imperial' ? parseFloat(weightLbs) || 0 : (parseFloat(weightKg) || 0) * 2.20462
  const cm = unit === 'metric'
    ? parseFloat(heightCm) || 0
    : ((parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)) * 2.54
  const ageN = parseFloat(age) || 0

  const bmr = kg > 0 && cm > 0 && ageN > 0 ? mifflinBMR(kg, cm, ageN, sex) : 0
  const tdee = bmr * activityLevels[activity].multiplier
  const targetCal = goal === 'lose' ? tdee - 500 : goal === 'muscle' ? tdee + 300 : tdee

  const d = dietStyles[diet]
  const proteinCal = targetCal * d.protein
  const fatCal = targetCal * d.fat
  const carbsCal = targetCal * d.carbs
  const proteinG = Math.round(proteinCal / 4)
  const fatG = Math.round(fatCal / 9)
  const carbsG = Math.round(carbsCal / 4)

  // Minimum protein: 0.7g per lb
  const minProteinG = Math.round(lbs * 0.7)
  const proteinGFinal = Math.max(proteinG, minProteinG)

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  const macros = bmr > 0 ? [
    { label: 'Protein', g: proteinGFinal, cal: proteinGFinal * 4, pct: Math.round((proteinGFinal * 4 / targetCal) * 100), color: '#3b82f6', colorClass: 'bg-blue-500' },
    { label: 'Carbs', g: carbsG, cal: carbsG * 4, pct: Math.round((carbsG * 4 / targetCal) * 100), color: '#f97316', colorClass: 'bg-orange-500' },
    { label: 'Fat', g: fatG, cal: fatG * 9, pct: Math.round((fatG * 9 / targetCal) * 100), color: '#eab308', colorClass: 'bg-yellow-500' },
  ] : []

  // Conic gradient stops
  const proteinPct = macros[0]?.pct || 0
  const carbsPct = macros[1]?.pct || 0
  const conicGradient = bmr > 0
    ? `conic-gradient(#3b82f6 0% ${proteinPct}%, #f97316 ${proteinPct}% ${proteinPct + carbsPct}%, #eab308 ${proteinPct + carbsPct}% 100%)`
    : 'conic-gradient(#e5e7eb 0% 100%)'

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
            <label className={labelCls}>Activity Level</label>
            <select value={activity} onChange={e => { setActivity(Number(e.target.value)); save({ activity: e.target.value }) }} className={inputCls}>
              {activityLevels.map((a, i) => (
                <option key={i} value={i}>{a.label} — {a.desc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Goal</label>
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
              {([['lose', 'Lose Fat'], ['maintain', 'Maintain'], ['muscle', 'Build Muscle']] as const).map(([val, label]) => (
                <button key={val} onClick={() => { setGoal(val); save({ goal: val }) }}
                  className={`flex-1 py-2 text-xs font-medium transition-colors ${
                    goal === val ? 'bg-teal-600 text-white' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Diet Style</label>
            <div className="grid grid-cols-2 gap-1.5">
              {(Object.entries(dietStyles) as [keyof typeof dietStyles, typeof dietStyles[keyof typeof dietStyles]][]).map(([key, val]) => (
                <button key={key} onClick={() => { setDiet(key); save({ diet: key }) }}
                  className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                    diet === key ? 'bg-teal-600 text-white border-teal-600' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}>
                  {val.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Meals per Day</label>
            <div className="flex gap-1.5">
              {[3, 4, 5, 6].map(m => (
                <button key={m} onClick={() => { setMeals(m); save({ meals: m.toString() }) }}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    meals === m ? 'bg-teal-600 text-white border-teal-600' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600'
                  }`}>
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {bmr > 0 ? (
            <>
              <div className="rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 p-4">
                <p className="text-sm font-medium text-teal-700 dark:text-teal-400">Daily Calories</p>
                <p className="text-3xl font-bold text-teal-600 dark:text-teal-300">{Math.round(targetCal).toLocaleString()}</p>
              </div>

              {/* CSS pie chart */}
              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 flex items-center gap-6">
                <div
                  className="shrink-0 rounded-full"
                  style={{ width: 100, height: 100, background: conicGradient }}
                />
                <div className="space-y-2 flex-1">
                  {macros.map(m => (
                    <div key={m.label} className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-sm shrink-0 ${m.colorClass}`} />
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-1">{m.label}</span>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{m.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <th className="text-left px-4 py-2.5 text-gray-500 dark:text-gray-400 font-semibold">Macro</th>
                      <th className="text-right px-4 py-2.5 text-gray-500 dark:text-gray-400 font-semibold">Grams</th>
                      <th className="text-right px-4 py-2.5 text-gray-500 dark:text-gray-400 font-semibold">Calories</th>
                      <th className="text-right px-4 py-2.5 text-gray-500 dark:text-gray-400 font-semibold">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {macros.map(m => (
                      <tr key={m.label} className="border-b border-gray-50 dark:border-gray-800">
                        <td className="px-4 py-2.5 font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-sm ${m.colorClass}`} />{m.label}
                        </td>
                        <td className="px-4 py-2.5 text-right text-gray-600 dark:text-gray-400">{m.g}g</td>
                        <td className="px-4 py-2.5 text-right text-gray-600 dark:text-gray-400">{m.cal.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-right text-gray-600 dark:text-gray-400">{m.pct}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Per Meal ({meals} meals/day)</p>
                <div className="space-y-1.5">
                  {macros.map(m => (
                    <div key={m.label} className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{m.label}</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{Math.round(m.g / meals)}g / {Math.round(m.cal / meals)} cal</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm border-t border-gray-100 dark:border-gray-700 pt-2 mt-2">
                    <span className="font-semibold text-gray-600 dark:text-gray-400">Total / meal</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">{Math.round(targetCal / meals).toLocaleString()} cal</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-8 text-center">
              <p className="text-gray-400 text-sm">Fill in your details to see your macro targets.</p>
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        Results are estimates for general informational purposes only. Consult a qualified healthcare provider before making health or fitness decisions.
      </p>
    </div>
  )
}
