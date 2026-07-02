import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import RunningPaceCalculatorWrapper from '@/components/RunningPaceCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Running Pace Calculator — Pace & Finish Time',
  description:
    'Calculate your running pace, finish time or distance. Free running pace calculator for 5K, 10K, half marathon and marathon with race time predictions.',
  alternates: { canonical: 'https://fitnesscalculators.app/running-pace' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is a good running pace for beginners?',
    a: 'A good beginner running pace is whatever allows you to hold a conversation while running — typically 12–15 minutes per mile (7:30–9:20 per km). Speed matters much less than consistency for beginners. Focus on running for time rather than distance, and gradually build your weekly mileage before worrying about pace.',
  },
  {
    q: 'How do I calculate my pace per mile?',
    a: 'Pace per mile is your total running time divided by the distance in miles. For example, running 3.1 miles (5K) in 30 minutes gives a pace of 9:41 per mile. Our running pace calculator does this instantly — just enter your distance and time to see your pace in min/mile, min/km, mph, and kph.',
  },
  {
    q: 'What pace do I need to run a sub-4-hour marathon?',
    a: 'To finish a marathon in under 4 hours, you need to average 9:09 per mile (5:41 per km). The full marathon distance is 26.2188 miles, so 4 hours ÷ 26.2188 = 9.16 minutes per mile. Allow some cushion — target 9:00 per mile to account for fatigue and course variation.',
  },
  {
    q: 'How do I improve my running pace?',
    a: 'To run faster, include interval training (short fast bursts with recovery), tempo runs (sustained effort at threshold pace), and weekly easy runs to build aerobic base. Strength training — particularly legs and core — improves running economy. Most runners benefit from running 4–5 days per week with 80% of miles at easy effort.',
  },
  {
    q: 'What is the difference between pace and speed?',
    a: 'Pace measures time per unit of distance (e.g., 9:00 per mile), while speed measures distance per unit of time (e.g., 6.7 mph). Runners typically use pace, while cyclists and other sports tend to use speed. A faster runner has a lower pace number and a higher speed number. Our pace calculator shows both.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Running Pace Calculator',
  url: 'https://fitnesscalculators.app/running-pace',
  description: 'Free running pace calculator with three modes: pace, finish time, and distance. Includes race time predictions.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use the Running Pace Calculator',
  step: [
    { '@type': 'HowToStep', name: 'Select your calculation mode', text: 'Choose Pace (from distance + time), Finish Time (from pace + distance), or Distance (from time + pace).' },
    { '@type': 'HowToStep', name: 'Enter your values', text: 'Input your distance (choose from 5K, 10K, half marathon, marathon, or custom) and time or pace as needed.' },
    { '@type': 'HowToStep', name: 'View your results and race predictions', text: 'See your pace per mile, per km, mph, and kph instantly, plus predicted finish times for all major race distances.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function RunningPacePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgfc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">Running Pace Calculator</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your running pace, finish time, or distance. Supports 5K, 10K, half marathon, and marathon with race time predictions.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111119" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <RunningPaceCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222230" /></div>
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">Plan your race with a running pace calculator</h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              Whether you are training for your first 5K or targeting a marathon PR, our running pace calculator helps you plan every race and training run. Use Pace mode to analyze past runs, Finish Time mode to set race goals, or Distance mode to plan time-based workouts. The race prediction table gives instant estimates for 5K, 10K, half marathon, and marathon based on your current pace — great for setting realistic race goals. All calculations run entirely in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333341" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
