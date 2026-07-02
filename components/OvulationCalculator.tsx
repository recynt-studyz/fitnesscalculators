'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'fc-ovulation'

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function fmtMonthDay(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

interface CycleData {
  cycleNum: number
  periodStart: Date
  ovulationDay: Date
  fertileStart: Date
  fertileEnd: Date
  nextPeriod: Date
}

export default function OvulationCalculator() {
  const [lmpDate, setLmpDate] = useState('')
  const [cycleLength, setCycleLength] = useState('28')
  const [numCycles, setNumCycles] = useState(3)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.lmpDate) setLmpDate(saved.lmpDate)
      if (saved.cycleLength) setCycleLength(saved.cycleLength)
      if (saved.numCycles) setNumCycles(Number(saved.numCycles))
    } catch { /* ignore */ }
  }, [])

  function save(updates: Record<string, string>) {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const cycle = parseInt(cycleLength) || 28
  const cycles: CycleData[] = []

  if (lmpDate && cycle >= 20 && cycle <= 45) {
    const base = new Date(lmpDate + 'T12:00:00')
    for (let i = 0; i < numCycles; i++) {
      const periodStart = addDays(base, i * cycle)
      const ovulationDay = addDays(periodStart, cycle - 14)
      const fertileStart = addDays(ovulationDay, -5)
      const fertileEnd = ovulationDay
      const nextPeriod = addDays(periodStart, cycle)
      cycles.push({ cycleNum: i + 1, periodStart, ovulationDay, fertileStart, fertileEnd, nextPeriod })
    }
  }

  // Calendar for first cycle
  function renderCalendar(c: CycleData) {
    const year = c.periodStart.getFullYear()
    const month = c.periodStart.getMonth()
    const firstDay = new Date(year, month, 1)
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const startDOW = firstDay.getDay()
    const days = []

    for (let i = 0; i < startDOW; i++) days.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d)
      days.push(date)
    }

    const monthName = firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    const dowLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

    return (
      <div key={c.cycleNum} className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">{monthName}</p>
        <div className="grid grid-cols-7 gap-0.5 text-xs mb-1">
          {dowLabels.map(d => (
            <div key={d} className="text-center font-semibold text-gray-400 py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {days.map((day, i) => {
            if (!day) return <div key={i} />
            const isOvulation = sameDay(day, c.ovulationDay)
            const isFertile = day >= c.fertileStart && day <= c.fertileEnd && !isOvulation
            const isPeriod = sameDay(day, c.periodStart)
            return (
              <div
                key={i}
                className={`aspect-square flex items-center justify-center rounded text-xs font-medium ${
                  isOvulation ? 'bg-blue-500 text-white' :
                  isFertile ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300' :
                  isPeriod ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                  'text-gray-600 dark:text-gray-400'
                }`}
              >
                {day.getDate()}
              </div>
            )
          })}
        </div>
        <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />Ovulation</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-teal-100 dark:bg-teal-900/50 inline-block" />Fertile window</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-100 dark:bg-red-900/30 inline-block" />Period</span>
        </div>
      </div>
    )
  }

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>First day of last period</label>
            <input type="date" value={lmpDate}
              onChange={e => { setLmpDate(e.target.value); save({ lmpDate: e.target.value }) }}
              className={inputCls} />
          </div>

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

          <div>
            <label className={labelCls}>Cycles to show</label>
            <div className="flex gap-2">
              {[1, 2, 3].map(n => (
                <button key={n} onClick={() => { setNumCycles(n); save({ numCycles: n.toString() }) }}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    numCycles === n ? 'bg-teal-600 text-white border-teal-600' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600'
                  }`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          {cycles.length > 0 && (
            <div className="space-y-3">
              {cycles.map(c => (
                <div key={c.cycleNum} className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                  <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-2">Cycle {c.cycleNum}</p>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Period starts</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{fmtMonthDay(c.periodStart)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Fertile window</span>
                      <span className="font-medium text-teal-600 dark:text-teal-400">{fmtMonthDay(c.fertileStart)} – {fmtMonthDay(c.fertileEnd)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Ovulation day</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{fmtDate(c.ovulationDay)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Next period</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{fmtMonthDay(c.nextPeriod)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {cycles.length > 0 ? cycles.map(c => renderCalendar(c)) : (
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-8 text-center">
              <p className="text-gray-400 text-sm">Enter your last period date to see your fertile window.</p>
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        This calculator provides estimates based on average cycle patterns. Actual ovulation varies. Consult your doctor for medical advice.
      </p>
    </div>
  )
}
