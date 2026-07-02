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
              Knowing your one rep max transforms your training from guesswork into a systematic program. Once you have your 1RM, you can prescribe exact weights for every working set based on the percentage required for your goal — strength, hypertrophy, or power. The percentage table in our one rep max calculator shows you exactly what weight to use at each training intensity zone, making it easy to program your workouts with precision.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333340" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
