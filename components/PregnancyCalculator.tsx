'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'fc-pregnancy'

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function fmtShort(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function weeksBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / (7 * 24 * 3600 * 1000))
}

function daysBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / (24 * 3600 * 1000))
}

export default function PregnancyCalculator() {
  const [method, setMethod] = useState<'lmp' | 'conception' | 'ivf' | 'ultrasound'>('lmp')
  const [date, setDate] = useState('')
  const [cycleLength, setCycleLength] = useState('28')
  const [ivfType, setIvfType] = useState<'3day' | '5day'>('5day')

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.method) setMethod(saved.method)
      if (saved.date) setDate(saved.date)
      if (saved.cycleLength) setCycleLength(saved.cycleLength)
      if (saved.ivfType) setIvfType(saved.ivfType)
    } catch { /* ignore */ }
  }, [])

  function save(updates: Record<string, string>) {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  let lmp: Date | null = null
  if (date) {
    const inputDate = new Date(date + 'T12:00:00')
    const cycle = parseInt(cycleLength) || 28
    if (method === 'lmp') {
      lmp = inputDate
    } else if (method === 'conception') {
      lmp = addDays(inputDate, -14)
    } else if (method === 'ivf') {
      lmp = addDays(inputDate, ivfType === '5day' ? -19 : -17)
    } else if (method === 'ultrasound') {
      lmp = inputDate
    }
    // Adjust for non-28-day cycles
    if (method === 'lmp' && cycle !== 28) {
      lmp = addDays(lmp!, cycle - 28)
    }
  }

  const dueDate = lmp ? addDays(lmp, 280) : null
  const today = new Date()
  today.setHours(12, 0, 0, 0)
  const currentWeek = lmp ? weeksBetween(lmp, today) : null
  const daysLeft = dueDate ? daysBetween(today, dueDate) : null
  const trimester = currentWeek !== null
    ? currentWeek <= 13 ? 'First Trimester'
    : currentWeek <= 26 ? 'Second Trimester'
    : 'Third Trimester'
    : null

  const milestones = lmp ? [
    { week: 8, label: 'First prenatal appointment recommended', date: fmtShort(addDays(lmp, 56)) },
    { week: 10, label: 'First trimester screening window opens', date: fmtShort(addDays(lmp, 70)) },
    { week: 20, label: 'Anatomy ultrasound', date: fmtShort(addDays(lmp, 140)) },
    { week: 24, label: 'Glucose screening', date: fmtShort(addDays(lmp, 168)) },
    { week: 28, label: 'Third trimester begins', date: fmtShort(addDays(lmp, 196)) },
    { week: 36, label: 'Weekly appointments begin', date: fmtShort(addDays(lmp, 252)) },
    { week: 40, label: 'Due date', date: fmtShort(addDays(lmp, 280)) },
  ] : []

  const trimesters = lmp ? [
    { label: 'First Trimester', range: `Weeks 1–13 (${fmtShort(lmp)} – ${fmtShort(addDays(lmp, 91))})` },
    { label: 'Second Trimester', range: `Weeks 14–26 (${fmtShort(addDays(lmp, 92))} – ${fmtShort(addDays(lmp, 182))})` },
    { label: 'Third Trimester', range: `Weeks 27–40 (${fmtShort(addDays(lmp, 183))} – ${fmtShort(addDays(lmp, 280))})` },
  ] : []

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      {/* Method tabs */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {([['lmp', 'Last Period'], ['conception', 'Conception Date'], ['ivf', 'IVF Transfer'], ['ultrasound', 'Ultrasound Date']] as const).map(([val, label]) => (
          <button key={val} onClick={() => { setMethod(val); save({ method: val }) }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              method === val ? 'bg-teal-600 text-white border-teal-600' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}>
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>
              {method === 'lmp' ? 'First day of last period' :
               method === 'conception' ? 'Conception date' :
               method === 'ivf' ? 'IVF transfer date' :
               'Ultrasound date'}
            </label>
            <input type="date" value={date}
              onChange={e => { setDate(e.target.value); save({ date: e.target.value }) }}
              className={inputCls} />
          </div>

          {method === 'lmp' && (
            <div>
              <label className={labelCls}>Average cycle length</label>
              <div className="relative">
                <input type="number" value={cycleLength} min="20" max="45"
                  onChange={e => { setCycleLength(e.target.value); save({ cycleLength: e.target.value }) }}
                  className={`${inputCls} pr-12`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">days</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Average is 28 days (range 20–45)</p>
            </div>
          )}

          {method === 'ivf' && (
            <div>
              <label className={labelCls}>Embryo type</label>
              <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                {([['5day', '5-day (blastocyst)'], ['3day', '3-day (cleavage)']] as const).map(([val, label]) => (
                  <button key={val} onClick={() => { setIvfType(val); save({ ivfType: val }) }}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      ivfType === val ? 'bg-teal-600 text-white' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {dueDate ? (
            <>
              <div className="rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 p-5">
                <p className="text-sm font-medium text-teal-700 dark:text-teal-400 mb-1">Due Date</p>
                <p className="text-2xl font-bold text-teal-600 dark:text-teal-300">{fmtDate(dueDate)}</p>
                {daysLeft !== null && daysLeft > 0 && (
                  <p className="text-xs text-teal-600 dark:text-teal-500 mt-1">{daysLeft} days to go</p>
                )}
              </div>

              {currentWeek !== null && currentWeek > 0 && currentWeek <= 42 && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-3 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Current Week</p>
                    <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">Week {currentWeek}</p>
                  </div>
                  <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-3 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Trimester</p>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{trimester}</p>
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Trimester Breakdown</p>
                <div className="space-y-2">
                  {trimesters.map(t => (
                    <div key={t.label}>
                      <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">{t.label}</p>
                      <p className="text-xs text-gray-400">{t.range}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Milestones</p>
                <div className="space-y-2">
                  {milestones.map(m => (
                    <div key={m.week} className={`flex justify-between text-xs ${currentWeek !== null && m.week === currentWeek ? 'font-semibold text-teal-600 dark:text-teal-400' : ''}`}>
                      <span className="text-gray-500 dark:text-gray-400">Week {m.week}: {m.label}</span>
                      <span className="font-medium text-gray-600 dark:text-gray-300 ml-2 shrink-0">{m.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-8 text-center">
              <p className="text-gray-400 text-sm">Enter a date to calculate your due date.</p>
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        This calculator provides estimates only. Your healthcare provider will determine your official due date. Consult your doctor for medical advice.
      </p>
    </div>
  )
}
