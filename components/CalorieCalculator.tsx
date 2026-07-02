'use client'

import { useState, useEffect } from 'react'
import UnitToggle from './UnitToggle'

const STORAGE_KEY = 'fc-calories'

const activityLevels = [
  { label: 'Sedentary', desc: 'Desk job, little or no exercise', multiplier: 1.2 },
  { label: 'Lightly Active', desc: '1–3 days/week light exercise', multiplier: 1.375 },
  { label: 'Moderately Active', desc: '3–5 days/week moderate exercise', multiplier: 1.55 },
  { label: 'Very Active', desc: '6–7 days/week hard exercise', multiplier: 1.725 },
  { label: 'Extra Active', desc: 'Athlete or physical job daily', multiplier: 1.9 },
]

function mifflinBMR(kg: number, cm: number, age: number, sex: 'male' | 'female'): number {
  const base = 10 * kg + 6.25 * cm - 5 * age
  return sex === 'male' ? base + 5 : base - 161
}

export default function CalorieCalculator() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [heightFt, setHeightFt] = useState('5')
  const [heightIn, setHeightIn] = useState('10')
  const [heightCm, setHeightCm] = useState('177.8')
  const [weightLbs, setWeightLbs] = useState('160')
  const [weightKg, setWeightKg] = useState('72.6')
  const [age, setAge] = useState('30')
  const [sex, setSex] = useState<'male' | 'female'>('male')
  const [activity, setActivity] = useState(2)
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain')
  const [lossSpeed, setLossSpeed] = useState<'mild' | 'moderate' | 'fast'>('moderate')

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
      if (saved.lossSpeed) setLossSpeed(saved.lossSpeed)
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

  const bmr = kg > 0 && cm > 0 && ageN > 0 ? mifflinBMR(kg, cm, ageN, sex) : 0
  const tdee = bmr * activityLevels[activity].multiplier

  const goalCal = goal === 'lose'
    ? lossSpeed === 'mild' ? tdee - 250 : lossSpeed === 'moderate' ? tdee - 500 : tdee - 1000
    : goal === 'gain' ? tdee + 375
    : tdee

  const scenarios = bmr > 0 ? [
    { label: 'Aggressive loss (−2 lb/wk)', cal: tdee - 1000, color: 'text-red-600 dark:text-red-400' },
    { label: 'Moderate loss (−1 lb/wk)', cal: tdee - 500, color: 'text-orange-600 dark:text-orange-400' },
    { label: 'Mild loss (−0.5 lb/wk)', cal: tdee - 250, color: 'text-amber-600 dark:text-amber-400' },
    { label: 'Maintain weight', cal: tdee, color: 'text-teal-600 dark:text-teal-400', highlight: true },
    { label: 'Mild gain (+0.5 lb/wk)', cal: tdee + 250, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Muscle gain (+1 lb/wk)', cal: tdee + 500, color: 'text-indigo-600 dark:text-indigo-400' },
  ] : []

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
              {([['lose', 'Lose Weight'], ['maintain', 'Maintain'], ['gain', 'Gain Muscle']] as const).map(([val, label]) => (
                <button key={val} onClick={() => { setGoal(val); save({ goal: val }) }}
                  className={`flex-1 py-2 text-xs font-medium transition-colors ${
                    goal === val ? 'bg-teal-600 text-white' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {goal === 'lose' && (
            <div>
              <label className={labelCls}>Weight Loss Speed</label>
              <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                {([['mild', 'Mild −0.5lb/wk'], ['moderate', 'Moderate −1lb/wk'], ['fast', 'Fast −2lb/wk']] as const).map(([val, label]) => (
                  <button key={val} onClick={() => { setLossSpeed(val); save({ lossSpeed: val }) }}
                    className={`flex-1 py-2 text-xs font-medium transition-colors ${
                      lossSpeed === val ? 'bg-teal-600 text-white' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {bmr > 0 ? (
            <>
              <div className="rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 p-5">
                <p className="text-sm font-medium text-teal-800 dark:text-teal-400 mb-1">Your TDEE (Maintenance)</p>
                <p className="text-4xl font-bold text-teal-700 dark:text-teal-300">{Math.round(tdee).toLocaleString()}</p>
                <p className="text-xs text-teal-600 dark:text-teal-500 mt-1">calories/day</p>
              </div>

              <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-5">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Your Goal Calories</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-[#e2e8f0]">{Math.round(goalCal).toLocaleString()}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">calories/day</p>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-1.5">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Calorie Scenarios</p>
                {scenarios.map(s => (
                  <div key={s.label} className={`flex justify-between text-sm py-1.5 ${s.highlight ? 'border-t border-b border-teal-100 dark:border-teal-900/50 my-1' : ''}`}>
                    <span className="text-gray-600 dark:text-gray-400">{s.label}</span>
                    <span className={`font-semibold ${s.color}`}>{Math.round(s.cal).toLocaleString()} cal</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-8 text-center">
              <p className="text-gray-400 text-sm">Fill in your details to see your calorie targets.</p>
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
