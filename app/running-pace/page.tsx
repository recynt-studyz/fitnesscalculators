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
          {/* Depth Content */}
          <div className="space-y-8 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">How the Running Pace Calculator Works</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Running pace is the time it takes to cover one unit of distance — typically expressed as minutes per mile (min/mi) or minutes per kilometer (min/km). It is the inverse of speed: a faster runner has a lower pace number (fewer minutes per mile) and a higher speed number (more miles per hour).</p>
                <p>The three fundamental relationships:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Pace = Time &divide; Distance</strong> (e.g., 30 min &divide; 3.1 mi = 9:41/mi)</li>
                  <li><strong>Time = Pace &times; Distance</strong> (e.g., 9:41/mi &times; 3.1 mi = 30 min)</li>
                  <li><strong>Distance = Time &divide; Pace</strong> (e.g., 30 min &divide; 9:41/mi = 3.1 mi)</li>
                </ul>
                <p>Our calculator supports all three modes — enter any two values to calculate the third. It also converts automatically between min/mi, min/km, mph, and kph.</p>
                <p>Understanding training pace zones helps structure runs for different fitness objectives:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Easy / recovery pace:</strong> Conversational effort; 60–70% of max heart rate; builds aerobic base; should comprise 80% of total weekly mileage</li>
                  <li><strong>Tempo pace:</strong> &quot;Comfortably hard&quot;; 80–90% max HR; improves lactate threshold; sustained for 20–40 minutes</li>
                  <li><strong>Interval / VO2max pace:</strong> Near-maximal effort; 90–95% max HR; 400m–1 mile repeats with rest; improves aerobic capacity</li>
                  <li><strong>Race pace:</strong> The specific pace targeted for goal race completion; varies by distance and fitness</li>
                </ul>
                <p>Elevation affects pace significantly. A rule of thumb: add approximately 90 seconds per mile for every 100 feet per mile of elevation gain. Running on trail surfaces adds a further 10–20% to equivalent effort pace. Our calculator works with flat-course pace — factor in terrain when setting realistic training targets.</p>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Running Pace: Worked Example</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Emma wants to finish a half marathon (13.1 miles) in under 2 hours. What pace does she need?</p>
                <p><strong>Required pace = 120 minutes &divide; 13.1 miles = 9:09 per mile</strong> (or 5:41 per km)</p>
                <p>To build safely to this race pace, Emma&apos;s training should include:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Easy long runs:</strong> 10:30–11:00/mi — the majority of her weekly mileage, building endurance without excessive stress</li>
                  <li><strong>Tempo runs:</strong> 8:45–9:00/mi — 20–30 min sustained, improving her lactate threshold so race pace feels more manageable</li>
                  <li><strong>Speed intervals:</strong> 7:30–8:00/mi — short repeats (400m–800m) at effort above race pace to improve aerobic capacity and running economy</li>
                  <li><strong>Race-pace miles:</strong> 9:09/mi — periodic race-pace miles within long runs to confirm the target feels achievable before race day</li>
                </ul>
                <p>Using our pace calculator, Emma can also see predicted finish times for other distances at her current fitness: if she runs a 9:09/mi half marathon, the race predictor estimates a 5K of approximately 25:30, a 10K of around 53:00, and a full marathon of roughly 4:10 using standard performance conversion models.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Key Factors That Affect Running Pace</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong>Fitness level and aerobic base:</strong> Aerobic capacity (VO2max) is the primary determinant of running performance. Higher VO2max means a faster sustainable pace at any given effort level. Consistent training over months and years raises VO2max and improves running economy — how efficiently you use oxygen at a given pace.</p>
                <p><strong>Terrain:</strong> Soft surfaces (trails, grass) absorb more energy with each footstrike, slowing pace by 10–20% compared to road or track at equivalent effort. Hills add significant time — a 5% grade at 5:00/km effort feels like running 4:15/km on flat terrain in terms of cardiovascular demand.</p>
                <p><strong>Weather conditions:</strong> Heat and humidity are the biggest environmental pace disruptors. Performance drops measurably above 55&deg;F (13&deg;C) for competitive runners and more significantly above 70&deg;F (21&deg;C). A common adjustment is to add 30 seconds per mile for every 10&deg;F above 60&deg;F on race day.</p>
                <p><strong>Race distance:</strong> Nobody can sustain 5K pace for a marathon. As race distance increases, sustainable pace slows in a predictable pattern. World-class athletes run a marathon approximately 10–15% slower than their half marathon pace. Recreational runners typically slow 15–25% from half to full marathon.</p>
                <p><strong>Heart rate zones:</strong> Pace is a proxy for effort, but heart rate directly measures cardiovascular load. Two runners at the same pace may be at very different effort levels depending on their fitness. Over time, tracking both pace and heart rate reveals fitness improvements: the same pace becomes easier (lower heart rate) as aerobic capacity improves.</p>
              </div>
            </div>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333341" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
