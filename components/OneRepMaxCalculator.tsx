'use client'

import { useState, useEffect } from 'react'
import UnitToggle from './UnitToggle'

const STORAGE_KEY = 'fc-onerepm'

const pctRows = [
  { pct: 100, reps: '1' },
  { pct: 95, reps: '2–3' },
  { pct: 90, reps: '3–4' },
  { pct: 85, reps: '4–6' },
  { pct: 80, reps: '6–8' },
  { pct: 75, reps: '8–10' },
  { pct: 70, reps: '10–12' },
  { pct: 65, reps: '12–15' },
]

export default function OneRepMaxCalculator() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [exercise, setExercise] = useState('')
  const [weightLbs, setWeightLbs] = useState('185')
  const [weightKg, setWeightKg] = useState('83.9')
  const [reps, setReps] = useState('5')

  useEffect(() => {
    try {
      const savedUnit = localStorage.getItem('fc-units') as 'imperial' | 'metric' | null
      if (savedUnit) setUnit(savedUnit)
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.exercise) setExercise(saved.exercise)
      if (saved.weightLbs) setWeightLbs(saved.weightLbs)
      if (saved.weightKg) setWeightKg(saved.weightKg)
      if (saved.reps) setReps(saved.reps)
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

  const w = unit === 'imperial' ? parseFloat(weightLbs) || 0 : parseFloat(weightKg) || 0
  const r = parseInt(reps) || 0

  const epley = r >= 1 ? w * (1 + r / 30) : 0
  const brzycki = r >= 1 && r < 37 ? w / (1.0278 - 0.0278 * r) : 0
  const avg = epley > 0 && brzycki > 0 ? (epley + brzycki) / 2 : 0

  const unitLabel = unit === 'imperial' ? 'lbs' : 'kg'

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="mb-5">
        <UnitToggle unit={unit} onChange={handleUnitChange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Exercise <span className="text-gray-400 font-normal">(optional)</span></label>
            <input type="text" value={exercise} placeholder="e.g. Bench Press"
              onChange={e => { setExercise(e.target.value); save({ exercise: e.target.value }) }}
              className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Weight lifted ({unitLabel})</label>
            <div className="relative">
              {unit === 'imperial' ? (
                <input type="number" value={weightLbs} min="1" step="5"
                  onChange={e => { setWeightLbs(e.target.value); save({ weightLbs: e.target.value }) }}
                  className={`${inputCls} pr-10`} />
              ) : (
                <input type="number" value={weightKg} min="1" step="2.5"
                  onChange={e => { setWeightKg(e.target.value); save({ weightKg: e.target.value }) }}
                  className={`${inputCls} pr-10`} />
              )}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{unitLabel}</span>
            </div>
          </div>

          <div>
            <label className={labelCls}>Reps completed</label>
            <input type="number" value={reps} min="1" max="20"
              onChange={e => { setReps(e.target.value); save({ reps: e.target.value }) }}
              className={inputCls} />
            {r > 15 && <p className="text-xs text-amber-500 mt-1">For best accuracy, use 1–15 reps.</p>}
          </div>
        </div>

        <div className="space-y-4">
          {avg > 0 ? (
            <>
              <div className="rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 p-5">
                <p className="text-sm font-medium text-teal-700 dark:text-teal-400 mb-1">
                  Estimated 1RM {exercise ? `— ${exercise}` : ''}
                </p>
                <p className="text-4xl font-bold text-teal-600 dark:text-teal-300">
                  {avg.toFixed(1)} {unitLabel}
                </p>
                <p className="text-xs text-teal-600 dark:text-teal-500 mt-1">Average of Epley + Brzycki</p>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Epley formula <span className="text-xs text-gray-400">(use for higher reps)</span></span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{epley.toFixed(1)} {unitLabel}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Brzycki formula <span className="text-xs text-gray-400">(use for 1–10 reps)</span></span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{brzycki.toFixed(1)} {unitLabel}</span>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] overflow-hidden">
                <p className="px-4 pt-3 pb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Training Percentage Table</p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <th className="text-left px-4 py-2 text-gray-500 dark:text-gray-400 font-semibold">% of 1RM</th>
                      <th className="text-right px-4 py-2 text-gray-500 dark:text-gray-400 font-semibold">Weight</th>
                      <th className="text-right px-4 py-2 text-gray-500 dark:text-gray-400 font-semibold">Rep Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pctRows.map(row => (
                      <tr key={row.pct} className="border-b border-gray-50 dark:border-gray-800">
                        <td className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300">{row.pct}%</td>
                        <td className="px-4 py-2 text-right text-gray-600 dark:text-gray-400">
                          {(avg * row.pct / 100).toFixed(1)} {unitLabel}
                        </td>
                        <td className="px-4 py-2 text-right text-gray-500 dark:text-gray-400">{row.reps}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-8 text-center">
              <p className="text-gray-400 text-sm">Enter the weight and reps you lifted to calculate your 1RM.</p>
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
