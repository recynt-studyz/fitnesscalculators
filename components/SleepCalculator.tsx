'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'fc-sleep'
const CYCLE_MIN = 90
const FALL_ASLEEP_MIN = 14

const ageGroups = [
  { label: 'Newborn (0–3 months)', hours: '14–17' },
  { label: 'Infant (4–11 months)', hours: '12–15' },
  { label: 'Toddler (1–2 years)', hours: '11–14' },
  { label: 'Preschool (3–5)', hours: '10–13' },
  { label: 'School age (6–12)', hours: '9–11' },
  { label: 'Teen (13–18)', hours: '8–10' },
  { label: 'Adult (18–64)', hours: '7–9' },
  { label: 'Senior (65+)', hours: '7–8' },
]

function formatTime12(h: number, m: number): string {
  const period = h >= 12 ? 'PM' : 'AM'
  const displayH = h % 12 || 12
  return `${displayH}:${m.toString().padStart(2, '0')} ${period}`
}

function parseTimeStr(t: string): { h: number; m: number } {
  const [hStr, mStr] = t.split(':')
  return { h: parseInt(hStr) || 0, m: parseInt(mStr) || 0 }
}

function addMinutes(h: number, m: number, mins: number): { h: number; m: number } {
  const total = h * 60 + m + mins
  return { h: Math.floor(total / 60) % 24, m: total % 60 }
}

function subtractMinutes(h: number, m: number, mins: number): { h: number; m: number } {
  let total = h * 60 + m - mins
  if (total < 0) total += 24 * 60
  return { h: Math.floor(total / 60) % 24, m: total % 60 }
}

export default function SleepCalculator() {
  const [mode, setMode] = useState<'wake' | 'bed'>('wake')
  const [wakeTime, setWakeTime] = useState('06:30')
  const [bedTime, setBedTime] = useState('22:30')

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.mode) setMode(saved.mode)
      if (saved.wakeTime) setWakeTime(saved.wakeTime)
      if (saved.bedTime) setBedTime(saved.bedTime)
    } catch { /* ignore */ }
  }, [])

  function save(updates: Record<string, string>) {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const { h: wH, m: wM } = parseTimeStr(wakeTime)
  const { h: bH, m: bM } = parseTimeStr(bedTime)

  // Wake mode: show bedtimes (go back 5–6 cycles + fall-asleep time)
  const wakeSuggestions = [6, 5, 4].map(cycles => {
    const totalMin = cycles * CYCLE_MIN + FALL_ASLEEP_MIN
    const bt = subtractMinutes(wH, wM, totalMin)
    return {
      cycles,
      hours: (cycles * CYCLE_MIN) / 60,
      bedtime: formatTime12(bt.h, bt.m),
      ok: cycles >= 5,
    }
  })

  // Bed mode: show wake times (go forward 5–6 cycles + fall-asleep time)
  const bedSuggestions = [5, 6, 7].map(cycles => {
    const totalMin = cycles * CYCLE_MIN + FALL_ASLEEP_MIN
    const wt = addMinutes(bH, bM, totalMin)
    return {
      cycles,
      hours: (cycles * CYCLE_MIN) / 60,
      waketime: formatTime12(wt.h, wt.m),
      ok: cycles >= 5,
    }
  })

  return (
    <div className="p-6">
      {/* Mode tabs */}
      <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden mb-6 w-fit">
        {([['wake', 'I want to wake up at...'], ['bed', 'I want to go to bed at...']] as const).map(([val, label]) => (
          <button key={val} onClick={() => { setMode(val); save({ mode: val }) }}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === val ? 'bg-teal-600 text-white' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}>
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {mode === 'wake' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wake up time</label>
              <input type="time" value={wakeTime}
                onChange={e => { setWakeTime(e.target.value); save({ wakeTime: e.target.value }) }}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <p className="text-xs text-gray-400 mt-2">
                Includes ~{FALL_ASLEEP_MIN} min average fall-asleep time.
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bedtime</label>
              <input type="time" value={bedTime}
                onChange={e => { setBedTime(e.target.value); save({ bedTime: e.target.value }) }}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <p className="text-xs text-gray-400 mt-2">
                Includes ~{FALL_ASLEEP_MIN} min average fall-asleep time.
              </p>
            </div>
          )}

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Sleep Recommendations by Age</p>
            <div className="space-y-1.5">
              {ageGroups.map(a => (
                <div key={a.label} className="flex justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">{a.label}</span>
                  <span className="font-medium text-gray-600 dark:text-gray-300">{a.hours} hrs</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {mode === 'wake' ? (
            <>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                To wake at {formatTime12(wH, wM)}, go to sleep at:
              </p>
              {wakeSuggestions.map(s => (
                <div key={s.cycles} className={`rounded-xl border p-4 ${
                  s.ok ? 'border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/30' : 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xl font-bold ${s.ok ? 'text-teal-700 dark:text-teal-300' : 'text-amber-700 dark:text-amber-300'}`}>{s.bedtime}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {s.cycles} cycles · {s.hours} hours
                      </p>
                    </div>
                    <span className="text-lg">{s.ok ? '✅' : '⚠️'}</span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Going to bed at {formatTime12(bH, bM)}, wake up at:
              </p>
              {bedSuggestions.map(s => (
                <div key={s.cycles} className={`rounded-xl border p-4 ${
                  s.ok ? 'border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/30' : 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xl font-bold ${s.ok ? 'text-teal-700 dark:text-teal-300' : 'text-amber-700 dark:text-amber-300'}`}>{s.waketime}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {s.cycles} cycles · {s.hours} hours
                      </p>
                    </div>
                    <span className="text-lg">{s.ok ? '✅' : '⚠️'}</span>
                  </div>
                </div>
              ))}
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
