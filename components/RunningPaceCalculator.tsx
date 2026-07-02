'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'fc-pace'

const RACE_DISTANCES = [
  { label: '5K', km: 5, miles: 3.10686 },
  { label: '10K', km: 10, miles: 6.21371 },
  { label: 'Half Marathon', km: 21.0975, miles: 13.1094 },
  { label: 'Marathon', km: 42.195, miles: 26.2188 },
]

function toSeconds(h: number, m: number, s: number) {
  return h * 3600 + m * 60 + s
}

function formatTime(totalSecs: number): string {
  if (totalSecs <= 0) return '—'
  const h = Math.floor(totalSecs / 3600)
  const m = Math.floor((totalSecs % 3600) / 60)
  const s = Math.floor(totalSecs % 60)
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  return `${m}:${s.toString().padStart(2, '0')}`
}

function formatPace(secsPerMile: number): string {
  if (secsPerMile <= 0 || !isFinite(secsPerMile)) return '—'
  const m = Math.floor(secsPerMile / 60)
  const s = Math.round(secsPerMile % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function RunningPaceCalculator() {
  const [mode, setMode] = useState<'pace' | 'finish' | 'distance'>('pace')
  const [distType, setDistType] = useState<'custom' | '5k' | '10k' | 'half' | 'marathon'>('custom')
  const [distMiles, setDistMiles] = useState('3.1')
  const [timeH, setTimeH] = useState('0')
  const [timeM, setTimeM] = useState('30')
  const [timeS, setTimeS] = useState('0')
  const [paceM, setPaceM] = useState('9')
  const [paceS, setPaceS] = useState('30')

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.mode) setMode(saved.mode)
      if (saved.distMiles) setDistMiles(saved.distMiles)
      if (saved.timeH) setTimeH(saved.timeH)
      if (saved.timeM) setTimeM(saved.timeM)
      if (saved.timeS) setTimeS(saved.timeS)
      if (saved.paceM) setPaceM(saved.paceM)
      if (saved.paceS) setPaceS(saved.paceS)
    } catch { /* ignore */ }
  }, [])

  function save(updates: Record<string, string>) {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  function setPresetDist(preset: typeof distType) {
    setDistType(preset)
    if (preset !== 'custom') {
      const race = RACE_DISTANCES.find(r =>
        preset === '5k' ? r.label === '5K' :
        preset === '10k' ? r.label === '10K' :
        preset === 'half' ? r.label === 'Half Marathon' :
        r.label === 'Marathon'
      )
      if (race) { setDistMiles(race.miles.toFixed(2)); save({ distMiles: race.miles.toFixed(2) }) }
    }
  }

  const dist = parseFloat(distMiles) || 0
  const totalSecs = toSeconds(parseInt(timeH) || 0, parseInt(timeM) || 0, parseInt(timeS) || 0)
  const paceSecs = (parseInt(paceM) || 0) * 60 + (parseInt(paceS) || 0)

  // Mode: Pace — compute pace from distance + time
  const computedPaceMile = mode === 'pace' && dist > 0 && totalSecs > 0 ? totalSecs / dist : 0
  const computedPaceKm = computedPaceMile / 1.60934

  // Mode: Finish — compute finish time from pace + distance
  const computedFinish = mode === 'finish' && dist > 0 && paceSecs > 0 ? paceSecs * dist : 0

  // Mode: Distance — compute distance from time + pace
  const computedDist = mode === 'distance' && totalSecs > 0 && paceSecs > 0 ? totalSecs / paceSecs : 0

  const displayPaceMile = mode === 'pace' ? computedPaceMile : paceSecs
  const mph = displayPaceMile > 0 ? 3600 / displayPaceMile : 0
  const kph = mph * 1.60934
  const paceKm = displayPaceMile / 1.60934

  // Race time predictions based on current pace/mile
  const predPace = mode === 'pace' ? computedPaceMile : paceSecs

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      {/* Mode tabs */}
      <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden mb-6 w-fit">
        {([['pace', 'Calculate Pace'], ['finish', 'Finish Time'], ['distance', 'Distance']] as const).map(([val, label]) => (
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
          {/* Distance (modes: pace, finish) */}
          {mode !== 'distance' && (
            <div>
              <label className={labelCls}>Distance</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {(['custom', '5k', '10k', 'half', 'marathon'] as const).map(p => (
                  <button key={p} onClick={() => setPresetDist(p)}
                    className={`px-3 py-1 text-xs rounded-full border font-medium transition-colors ${
                      distType === p ? 'bg-teal-600 text-white border-teal-600' : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}>
                    {p === 'custom' ? 'Custom' : p === '5k' ? '5K' : p === '10k' ? '10K' : p === 'half' ? 'Half' : 'Marathon'}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input type="number" value={distMiles} step="0.01" min="0.1"
                  onChange={e => { setDistMiles(e.target.value); setDistType('custom'); save({ distMiles: e.target.value }) }}
                  className={`${inputCls} pr-14`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">miles</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{((parseFloat(distMiles) || 0) * 1.60934).toFixed(2)} km</p>
            </div>
          )}

          {/* Time (modes: pace, distance) */}
          {mode !== 'finish' && (
            <div>
              <label className={labelCls}>Time</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input type="number" value={timeH} min="0" max="99"
                    onChange={e => { setTimeH(e.target.value); save({ timeH: e.target.value }) }}
                    className={`${inputCls} pr-7`} />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">h</span>
                </div>
                <div className="relative flex-1">
                  <input type="number" value={timeM} min="0" max="59"
                    onChange={e => { setTimeM(e.target.value); save({ timeM: e.target.value }) }}
                    className={`${inputCls} pr-7`} />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">m</span>
                </div>
                <div className="relative flex-1">
                  <input type="number" value={timeS} min="0" max="59"
                    onChange={e => { setTimeS(e.target.value); save({ timeS: e.target.value }) }}
                    className={`${inputCls} pr-7`} />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">s</span>
                </div>
              </div>
            </div>
          )}

          {/* Pace (mode: finish) */}
          {mode === 'finish' && (
            <div>
              <label className={labelCls}>Pace (per mile)</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input type="number" value={paceM} min="0" max="59"
                    onChange={e => { setPaceM(e.target.value); save({ paceM: e.target.value }) }}
                    className={`${inputCls} pr-7`} />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">m</span>
                </div>
                <div className="relative flex-1">
                  <input type="number" value={paceS} min="0" max="59"
                    onChange={e => { setPaceS(e.target.value); save({ paceS: e.target.value }) }}
                    className={`${inputCls} pr-7`} />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">s</span>
                </div>
              </div>
            </div>
          )}

          {/* Distance input (mode: distance) */}
          {mode === 'distance' && (
            <div>
              <label className={labelCls}>Pace (per mile)</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input type="number" value={paceM} min="0" max="59"
                    onChange={e => { setPaceM(e.target.value); save({ paceM: e.target.value }) }}
                    className={`${inputCls} pr-7`} />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">m</span>
                </div>
                <div className="relative flex-1">
                  <input type="number" value={paceS} min="0" max="59"
                    onChange={e => { setPaceS(e.target.value); save({ paceS: e.target.value }) }}
                    className={`${inputCls} pr-7`} />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">s</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {mode === 'pace' && computedPaceMile > 0 && (
            <div className="rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 p-5 space-y-3">
              <p className="text-sm font-semibold text-teal-700 dark:text-teal-400">Your Pace</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-teal-600 dark:text-teal-500">Per mile</p>
                  <p className="text-2xl font-bold text-teal-600 dark:text-teal-300">{formatPace(computedPaceMile)}</p>
                </div>
                <div>
                  <p className="text-xs text-teal-600 dark:text-teal-500">Per km</p>
                  <p className="text-2xl font-bold text-teal-600 dark:text-teal-300">{formatPace(computedPaceKm)}</p>
                </div>
                <div>
                  <p className="text-xs text-teal-600 dark:text-teal-500">Speed</p>
                  <p className="text-xl font-bold text-teal-600 dark:text-teal-300">{mph.toFixed(1)} mph</p>
                </div>
                <div>
                  <p className="text-xs text-teal-600 dark:text-teal-500">Speed</p>
                  <p className="text-xl font-bold text-teal-600 dark:text-teal-300">{kph.toFixed(1)} kph</p>
                </div>
              </div>
            </div>
          )}

          {mode === 'finish' && computedFinish > 0 && (
            <div className="rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 p-5">
              <p className="text-sm font-semibold text-teal-700 dark:text-teal-400">Finish Time</p>
              <p className="text-4xl font-bold text-teal-600 dark:text-teal-300">{formatTime(computedFinish)}</p>
              <p className="text-xs text-teal-600 dark:text-teal-500 mt-1">
                {formatPace(paceSecs)}/mile · {formatPace(paceSecs / 1.60934)}/km · {mph.toFixed(1)} mph
              </p>
            </div>
          )}

          {mode === 'distance' && computedDist > 0 && (
            <div className="rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 p-5">
              <p className="text-sm font-semibold text-teal-700 dark:text-teal-400">Distance Covered</p>
              <p className="text-4xl font-bold text-teal-600 dark:text-teal-300">{computedDist.toFixed(2)} mi</p>
              <p className="text-xs text-teal-600 dark:text-teal-500 mt-1">{(computedDist * 1.60934).toFixed(2)} km</p>
            </div>
          )}

          {/* Race predictions */}
          {predPace > 0 && (
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Race Time Predictions <span className="text-xs text-gray-400 font-normal">at {formatPace(predPace)}/mile</span>
              </p>
              <div className="space-y-2">
                {RACE_DISTANCES.map(race => (
                  <div key={race.label} className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{race.label}</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{formatTime(predPace * race.miles)}</span>
                  </div>
                ))}
              </div>
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
