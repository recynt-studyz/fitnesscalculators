import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import BMRCalculatorWrapper from '@/components/BMRCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'BMR Calculator — Basal Metabolic Rate Calculator',
  description:
    'Calculate your basal metabolic rate using the Mifflin-St Jeor equation. Free BMR calculator showing calories burned at rest with activity multipliers.',
  alternates: { canonical: 'https://fitnesscalculators.app/bmr' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is basal metabolic rate?',
    a: 'Basal Metabolic Rate (BMR) is the number of calories your body burns at complete rest — just to keep you alive. It powers essential functions like breathing, circulation, body temperature regulation, and organ function. BMR typically accounts for 60–75% of your total daily calorie burn.',
  },
  {
    q: 'How is BMR calculated?',
    a: 'The most accurate BMR formula for most people is the Mifflin-St Jeor equation. For men: BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5. For women: BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161. Our calculator also shows the older Harris-Benedict formula for comparison.',
  },
  {
    q: 'What is the difference between BMR and TDEE?',
    a: 'BMR is your calorie burn at complete rest. TDEE (Total Daily Energy Expenditure) is your BMR multiplied by an activity factor to account for daily movement and exercise. Most people need to focus on TDEE when planning their calorie intake, since BMR alone does not account for the calories burned during normal daily life.',
  },
  {
    q: 'Does muscle increase BMR?',
    a: 'Yes. Muscle tissue burns more calories at rest than fat tissue. People with more lean muscle mass have a higher BMR, which is why strength training is beneficial for long-term weight management. Building muscle increases your metabolism even when you are not exercising.',
  },
  {
    q: 'How can I increase my metabolism?',
    a: 'The most effective ways to increase BMR are building muscle through strength training, eating adequate protein to prevent muscle loss, staying hydrated, getting enough sleep, and avoiding prolonged very-low-calorie diets that suppress metabolism. Minor factors like caffeine and certain spices have small short-term effects on metabolism.',
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
  name: 'BMR Calculator',
  url: 'https://fitnesscalculators.app/bmr',
  description: 'Free basal metabolic rate calculator using Mifflin-St Jeor and Harris-Benedict formulas.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your BMR',
  step: [
    { '@type': 'HowToStep', name: 'Enter your stats', text: 'Input your age, sex, height, and weight. Select your preferred unit system (imperial or metric).' },
    { '@type': 'HowToStep', name: 'Choose your formula', text: 'Select Mifflin-St Jeor (recommended for most people) or Harris-Benedict to see how the formulas compare.' },
    { '@type': 'HowToStep', name: 'View your BMR and TDEE estimates', text: 'Your BMR is shown immediately, along with a table showing your estimated daily calories at each activity level.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function BMRPage() {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">BMR Calculator</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your basal metabolic rate — the calories your body burns at complete rest. Includes activity multipliers and formula comparison.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111115" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <BMRCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222226" /></div>
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">Why knowing your BMR matters</h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              Your basal metabolic rate is the foundation of calorie planning. Without knowing how many calories you burn at rest, you cannot accurately set a deficit or surplus for your goals. The Mifflin-St Jeor equation — used by this BMR calculator — is considered the most accurate for the general population. Multiply your BMR by your activity factor to get your TDEE, then adjust up or down to reach your weight goal. All calculations run entirely in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333337" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
