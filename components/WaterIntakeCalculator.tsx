'use client'

import { useState, useEffect } from 'react'
import UnitToggle from './UnitToggle'

const STORAGE_KEY = 'fc-water'

export default function WaterIntakeCalculator() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [weightLbs, setWeightLbs] = useState('160')
  const [weightKg, setWeightKg] = useState('72.6')
  const [activity, setActivity] = useState<'sedentary' | 'light' | 'moderate' | 'active'>('moderate')
  const [climate, setClimate] = useState<'temperate' | 'hot'>('temperate')
  const [pregnant, setPregnant] = useState(false)
  const [breastfeeding, setBreastfeeding] = useState(false)
  const [exerciseMins, setExerciseMins] = useState('30')

  useEffect(() => {
    try {
      const savedUnit = localStorage.getItem('fc-units') as 'imperial' | 'metric' | null
      if (savedUnit) setUnit(savedUnit)
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.weightLbs) setWeightLbs(saved.weightLbs)
      if (saved.weightKg) setWeightKg(saved.weightKg)
      if (saved.activity) setActivity(saved.activity)
      if (saved.climate) setClimate(saved.climate)
      if (saved.pregnant !== undefined) setPregnant(saved.pregnant === 'true')
      if (saved.breastfeeding !== undefined) setBreastfeeding(saved.breastfeeding === 'true')
      if (saved.exerciseMins) setExerciseMins(saved.exerciseMins)
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
      setWeightKg(((parseFloat(weightLbs) || 0) / 2.20462).toFixed(1))
    } else {
      setWeightLbs(((parseFloat(weightKg) || 0) * 2.20462).toFixed(1))
    }
  }

  const lbs = unit === 'imperial' ? parseFloat(weightLbs) || 0 : (parseFloat(weightKg) || 0) * 2.20462
  const baseOz = lbs / 2

  const activityAdj = { sedentary: 0, light: 8, moderate: 12, active: 24 }[activity]
  const climateAdj = climate === 'hot' ? 16 : 0
  const exerciseAdj = Math.round((parseInt(exerciseMins) || 0) / 30) * 12
  const pregnantAdj = pregnant ? 10 : 0
  const bfAdj = breastfeeding ? 16 : 0

  const totalOz = baseOz + activityAdj + climateAdj + exerciseAdj + pregnantAdj + bfAdj
  const cups = totalOz / 8
  const liters = totalOz * 0.0295735
  const ml = totalOz * 29.5735

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  const schedule = totalOz > 0 ? [
    { time: 'Wake up', oz: 16 },
    { time: 'Morning', oz: Math.round(totalOz * 0.18) },
    { time: 'Lunch', oz: Math.round(totalOz * 0.18) },
    { time: 'Afternoon', oz: Math.round(totalOz * 0.18) },
    { time: 'Evening', oz: Math.round(totalOz * 0.18) },
    { time: 'Before bed', oz: 8 },
  ] : []

  return (
    <div className="p-6">
      <div className="mb-5">
        <UnitToggle unit={unit} onChange={handleUnitChange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {unit === 'imperial' ? (
            <div>
              <label className={labelCls}>Body Weight</label>
              <div className="relative">
                <input type="number" value={weightLbs} min="50" max="1000"
                  onChange={e => { setWeightLbs(e.target.value); save({ weightLbs: e.target.value }) }}
                  className={`${inputCls} pr-10`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">lbs</span>
              </div>
            </div>
          ) : (
            <div>
              <label className={labelCls}>Body Weight</label>
              <div className="relative">
                <input type="number" value={weightKg} min="20" max="500"
                  onChange={e => { setWeightKg(e.target.value); save({ weightKg: e.target.value }) }}
                  className={`${inputCls} pr-10`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">kg</span>
              </div>
            </div>
          )}

          <div>
            <label className={labelCls}>Activity Level</label>
            <div className="grid grid-cols-2 gap-1.5">
              {([['sedentary', 'Sedentary'], ['light', 'Light'], ['moderate', 'Moderate'], ['active', 'Active']] as const).map(([val, label]) => (
                <button key={val} onClick={() => { setActivity(val); save({ activity: val }) }}
                  className={`py-2 text-sm font-medium rounded-lg border transition-colors ${
                    activity === val ? 'bg-teal-600 text-white border-teal-600' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Climate</label>
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
              {([['temperate', 'Temperate'], ['hot', 'Hot / Humid']] as const).map(([val, label]) => (
                <button key={val} onClick={() => { setClimate(val); save({ climate: val }) }}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    climate === val ? 'bg-teal-600 text-white' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Daily Exercise</label>
            <div className="relative">
              <input type="number" value={exerciseMins} min="0" max="300" step="15"
                onChange={e => { setExerciseMins(e.target.value); save({ exerciseMins: e.target.value }) }}
                className={`${inputCls} pr-14`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">min</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Additional Factors</label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={pregnant} onChange={e => { setPregnant(e.target.checked); save({ pregnant: e.target.checked.toString() }) }}
                className="w-4 h-4 rounded accent-teal-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Pregnant (+10 oz/day)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={breastfeeding} onChange={e => { setBreastfeeding(e.target.checked); save({ breastfeeding: e.target.checked.toString() }) }}
                className="w-4 h-4 rounded accent-teal-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Breastfeeding (+16 oz/day)</span>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {totalOz > 0 ? (
            <>
              <div className="rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 p-5">
                <p className="text-sm font-medium text-teal-700 dark:text-teal-400 mb-2">Daily Water Target</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-3xl font-bold text-teal-600 dark:text-teal-300">{Math.round(totalOz)}</p>
                    <p className="text-xs text-teal-600 dark:text-teal-500">oz</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-teal-600 dark:text-teal-300">{cups.toFixed(1)}</p>
                    <p className="text-xs text-teal-600 dark:text-teal-500">cups</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-teal-600 dark:text-teal-300">{liters.toFixed(1)}</p>
                    <p className="text-xs text-teal-600 dark:text-teal-500">liters</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-teal-600 dark:text-teal-300">{Math.round(ml)}</p>
                    <p className="text-xs text-teal-600 dark:text-teal-500">ml</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Suggested Daily Schedule</p>
                <div className="space-y-2">
                  {schedule.map(s => (
                    <div key={s.time} className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{s.time}</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{s.oz} oz</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm border-t border-gray-100 dark:border-gray-700 pt-2 mt-1">
                    <span className="font-semibold text-gray-600 dark:text-gray-400">Total</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">{Math.round(totalOz)} oz</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-8 text-center">
              <p className="text-gray-400 text-sm">Enter your weight to calculate daily water needs.</p>
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
