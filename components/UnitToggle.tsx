'use client'

interface UnitToggleProps {
  unit: 'imperial' | 'metric'
  onChange: (unit: 'imperial' | 'metric') => void
}

export default function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden w-fit">
      <button
        onClick={() => onChange('imperial')}
        className={`px-4 py-2 text-sm font-medium transition-colors ${
          unit === 'imperial'
            ? 'bg-teal-600 text-white'
            : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
      >
        Imperial &#x1F1FA;&#x1F1F8;
      </button>
      <button
        onClick={() => onChange('metric')}
        className={`px-4 py-2 text-sm font-medium transition-colors ${
          unit === 'metric'
            ? 'bg-teal-600 text-white'
            : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
      >
        Metric &#x1F30D;
      </button>
    </div>
  )
}
