import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import OneRepMaxCalculatorWrapper from '@/components/OneRepMaxCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'One Rep Max Calculator — 1RM Strength Calculator',
  description:
    'Calculate your one rep max for any exercise using the Epley and Brzycki formulas. Free 1RM calculator with percentage training table.',
  alternates: { canonical: 'https://fitnesscalculators.app/one-rep-max' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is a one rep max?',
    a: 'Your one rep max (1RM) is the maximum weight you can lift for a single repetition of an exercise with proper form. It is used as a benchmark for strength and to calculate training weights at different percentages. A 1RM test or estimate is important for programming strength training progressions.',
  },
  {
    q: 'How do I safely test my one rep max?',
    a: 'To test your 1RM safely, warm up thoroughly with progressively heavier sets. Use a spotter for pressing movements. Work up in 5–10% increments, resting 3–5 minutes between attempts. Alternatively, use a submaximal rep test (lift a challenging weight for 3–10 reps) and use our 1RM calculator to estimate your max without the risk of a true max effort.',
  },
  {
    q: 'What is the Epley formula?',
    a: 'The Epley formula is one of the most widely used 1RM estimation formulas: 1RM = weight × (1 + reps/30). It works best for rep ranges of 1–15 reps. The Brzycki formula (weight ÷ (1.0278 − 0.0278 × reps)) is more accurate for lower rep ranges (under 10 reps). Our calculator shows both and averages them.',
  },
  {
    q: 'How do I use my 1RM for training?',
    a: 'Once you know your 1RM, you can program your training at specific intensity percentages. Heavy strength work is typically done at 80–90% of 1RM for 3–5 reps. Hypertrophy (muscle building) training is often at 65–80% for 6–15 reps. Power and speed work uses lighter loads (50–70%). The percentage table in our calculator shows you the target weight for each zone.',
  },
  {
    q: 'How often should I test my one rep max?',
    a: 'Beginners and intermediate lifters can test their 1RM every 4–8 weeks, typically at the end of a training cycle. Advanced lifters may test less frequently — every 8–16 weeks. For everyday training, it is often sufficient to estimate your 1RM from submaximal sets using a calculator like this one rather than doing true 1RM testing regularly.',
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
  name: 'One Rep Max Calculator',
  url: 'https://fitnesscalculators.app/one-rep-max',
  description: 'Free 1RM calculator using Epley and Brzycki formulas with full percentage-based training table.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your One Rep Max',
  step: [
    { '@type': 'HowToStep', name: 'Enter the weight you lifted', text: 'Input the weight you lifted in pounds or kilograms. Use a weight you lifted with good form.' },
    { '@type': 'HowToStep', name: 'Enter the number of reps you completed', text: 'Type in how many reps you completed with that weight. Best results are with 1–15 reps.' },
    { '@type': 'HowToStep', name: 'View your 1RM and training table', text: 'Your estimated one rep max from both Epley and Brzycki formulas appears instantly, along with a full training percentage table.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function OneRepMaxPage() {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">One Rep Max Calculator</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your 1RM from any rep count. Uses Epley and Brzycki formulas with a full percentage-based training table.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111118" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <OneRepMaxCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222229" /></div>
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">How to use your 1RM for smarter training</h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              Knowing your one rep max transforms your training from guesswork into a systematic program. Once you have your 1RM, you can prescribe exact weights for every working set based on the percentage required for your goal — strength, hypertrophy, or power. The percentage table in our one rep max calculator shows you exactly what weight to use at each training intensity zone, making it easy to program your workouts with precision. All calculations run entirely in your browser — your data never leaves your device.
            </p>
          </div>
          {/* Depth Content */}
          <div className="space-y-8 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">How the One Rep Max Calculator Works</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Your one rep max (1RM) is the maximum weight you can lift for a single repetition of an exercise with proper form. It is the standard benchmark for measuring absolute strength and serves as the foundation for percentage-based program design across powerlifting, Olympic lifting, and strength conditioning.</p>
                <p>Our calculator uses two widely validated estimation formulas:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Epley formula:</strong> 1RM = weight &times; (1 + reps &divide; 30) — works well across a broad rep range; slightly overestimates at very high reps</li>
                  <li><strong>Brzycki formula:</strong> 1RM = weight &divide; (1.0278 &minus; 0.0278 &times; reps) — more accurate for lower rep ranges (1–10 reps); less reliable above 10 reps where the denominator approaches zero</li>
                </ul>
                <p>The calculator averages both formulas to reduce the impact of each formula&apos;s individual bias. Results are most accurate when the input set uses 1–10 reps to near-maximal failure. A submaximal approach — testing with a weight you can lift 3–6 times with maximum effort — gives the best balance of accuracy and safety, particularly for pressing movements where a true 1RM attempt without a spotter carries significant risk.</p>
                <p>Once your 1RM is estimated, percentage-based training zones make program design precise:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>90–100% of 1RM:</strong> Maximal strength development; 1–3 reps per set; 4–5 minutes rest</li>
                  <li><strong>80–89%:</strong> Strength and power; 3–5 reps; 3–4 minutes rest</li>
                  <li><strong>67–79%:</strong> Hypertrophy (muscle building); 6–12 reps; 60–90 seconds rest</li>
                  <li><strong>50–66%:</strong> Muscular endurance; 15+ reps; 30–60 seconds rest</li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">1RM Calculation: Worked Example</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>David bench presses 185 lbs for 6 reps with good form, reaching close to failure.</p>
                <p><strong>Epley:</strong> 1RM = 185 &times; (1 + 6 &divide; 30) = 185 &times; 1.2 = <strong>222 lbs</strong></p>
                <p><strong>Brzycki:</strong> 1RM = 185 &divide; (1.0278 &minus; 0.0278 &times; 6) = 185 &divide; 0.8610 = <strong>215 lbs</strong></p>
                <p><strong>Average estimated 1RM: &sim;218 lbs</strong></p>
                <p>David can now program his training with precision using percentages of 218 lbs:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Strength work at 85% (5&times;3): 185 lbs</li>
                  <li>Hypertrophy work at 72% (4&times;8): 157 lbs</li>
                  <li>Volume work at 65% (3&times;12): 142 lbs</li>
                  <li>Warm-up sets: 60% (131 lbs), 70% (153 lbs), 80% (174 lbs)</li>
                </ul>
                <p>Without knowing his 1RM, David would be guessing at weights. With it, every session is systematically tied to his actual strength level — and as his 1RM increases, all training weights scale up proportionally. Retesting every 4–6 weeks (or re-estimating from a top submaximal set) keeps the training weights calibrated to his current capacity.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Key Factors That Affect 1RM Accuracy</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong>Rep range used:</strong> Both formulas are most accurate when the test set falls between 1 and 10 reps. Above 10 reps, the accuracy of both formulas degrades substantially — particularly Brzycki. A 20-rep set with a light weight will significantly underestimate your true 1RM. For best results, use a weight that limits you to 3–8 reps.</p>
                <p><strong>Proximity to failure:</strong> The estimation assumes the test set was taken to or near muscular failure. Stopping with several reps left in reserve produces an underestimate. The set should feel genuinely maximal — the last rep should be a real struggle — for the formula to apply correctly.</p>
                <p><strong>Fatigue level:</strong> Testing after a long workout session or a night of poor sleep artificially reduces performance and therefore underestimates your true 1RM. For the most accurate estimate, perform the test set when fresh — ideally as the first heavy work of a session after a thorough warm-up.</p>
                <p><strong>Exercise selection:</strong> 1RM estimates are exercise-specific. Your bench press 1RM cannot be used to predict your overhead press 1RM because different movement patterns recruit different muscle groups at different mechanical disadvantages. Estimate separately for each lift you want to program.</p>
                <p><strong>Training experience:</strong> Novice lifters tend to perform better on higher rep sets relative to their 1RM (they haven&apos;t trained the neurological efficiency of true max effort), so their estimates from submaximal sets may be more accurate than true 1RM testing. Advanced lifters are better at expressing maximum force in a single rep, and may find estimated 1RM slightly lower than their true max.</p>
              </div>
            </div>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333340" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
