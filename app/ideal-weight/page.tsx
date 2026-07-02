import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import IdealWeightCalculatorWrapper from '@/components/IdealWeightCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Ideal Weight Calculator — Healthy Weight Range',
  description:
    'Calculate your ideal body weight using multiple formulas including Devine, Hamwi, Robinson and Miller. Free ideal weight calculator for men and women.',
  alternates: { canonical: 'https://fitnesscalculators.app/ideal-weight' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How do I calculate my ideal weight?',
    a: 'Ideal weight can be estimated using several formulas based on your height and sex. Common ones include the Devine formula (50kg + 2.3kg per inch over 5 feet for men), Hamwi, Robinson, and Miller formulas. Each was developed from different populations, so they give slightly different results. Our ideal weight calculator shows all four plus the healthy BMI weight range.',
  },
  {
    q: 'Why do different formulas give different results?',
    a: 'Each ideal weight formula was developed by different researchers using different study populations, body frame assumptions, and time periods. The Devine formula (1974) was originally used to calculate medication doses. The Hamwi, Robinson, and Miller formulas were each developed independently. None is definitively "correct" — together they give a range of estimates.',
  },
  {
    q: 'What is more important — ideal weight or body fat?',
    a: 'Body fat percentage is generally a better indicator of health than ideal weight. Two people at the same height and weight can have very different body compositions — one could have high muscle and low fat while another has low muscle and high fat. Body composition matters more than the number on the scale, especially for long-term health.',
  },
  {
    q: 'How does frame size affect ideal weight?',
    a: 'People with larger bone structure (large frame) naturally weigh more at any given height. Conversely, small-framed people may be healthy at a lower weight. Frame size is typically assessed by wrist circumference or elbow breadth. Our ideal weight calculator applies a ±5kg adjustment based on your selected frame size.',
  },
  {
    q: 'Is there one ideal weight for my height?',
    a: 'No — there is a range of healthy weights for any given height. The four-formula consensus range and the healthy BMI weight range (18.5–24.9) both give a spread, not a single number. Your optimal weight within that range depends on your body composition, muscle mass, age, and other individual factors.',
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
  name: 'Ideal Weight Calculator',
  url: 'https://fitnesscalculators.app/ideal-weight',
  description: 'Free ideal weight calculator using Devine, Hamwi, Robinson, and Miller formulas with frame size adjustment.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Find Your Ideal Weight',
  step: [
    { '@type': 'HowToStep', name: 'Enter your height and sex', text: 'Select your unit system and enter your height. Choose male or female — ideal weight formulas differ by sex.' },
    { '@type': 'HowToStep', name: 'Select your frame size', text: 'Choose small, medium, or large frame. This adjusts the results by ±5kg to account for bone structure differences.' },
    { '@type': 'HowToStep', name: 'Review your ideal weight range', text: 'See results from four formulas (Devine, Hamwi, Robinson, Miller) plus the healthy BMI weight range and a consensus recommended range.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function IdealWeightPage() {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">Ideal Weight Calculator</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Find your healthy weight range using four trusted formulas. See results from Devine, Hamwi, Robinson, and Miller adjusted for your frame size.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111117" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <IdealWeightCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222228" /></div>
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">Understanding ideal weight estimates</h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              Ideal weight formulas were developed to provide general guidance on healthy weight ranges based on height and sex. These estimates vary by a few pounds across formulas — which is normal and expected. The consensus range (the spread across all four formulas) gives you a practical target zone. Remember that a number on the scale is just one data point. Body composition, fitness level, and how you feel are equally important indicators of health.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333339" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
