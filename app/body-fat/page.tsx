import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import BodyFatCalculatorWrapper from '@/components/BodyFatCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Body Fat Calculator — Body Fat Percentage',
  description:
    'Calculate your body fat percentage using the US Navy method. Free body fat calculator supporting imperial and metric measurements.',
  alternates: { canonical: 'https://fitnesscalculators.app/body-fat' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is a healthy body fat percentage?',
    a: 'Healthy body fat ranges differ by sex. For men, the fitness range is 14–17% and acceptable is 18–24%. For women, fitness is 21–24% and acceptable is 25–31%. Athletes typically have lower body fat: 6–13% for men and 14–20% for women. Essential fat (the minimum needed for survival) is 2–5% for men and 10–13% for women.',
  },
  {
    q: 'How is body fat measured?',
    a: 'Body fat can be measured several ways: DEXA scan (most accurate), hydrostatic weighing, air displacement plethysmography (Bod Pod), skinfold calipers, bioelectrical impedance, and the US Navy circumference method used by this calculator. The Navy method is a practical, free option that provides a reasonable estimate using basic body measurements.',
  },
  {
    q: 'What is the difference between essential fat and storage fat?',
    a: 'Essential fat is the minimum amount of fat required for normal bodily function — it protects organs, supports hormone production, and is necessary for survival. Storage fat is the additional fat stored in adipose tissue for energy reserves. Body fat percentage measurements include both types. Going below essential fat levels is dangerous to health.',
  },
  {
    q: 'How do I lower my body fat percentage?',
    a: 'To reduce body fat, create a moderate calorie deficit (300–500 calories below TDEE) while consuming sufficient protein (0.8–1g per pound of body weight) to preserve muscle. Combine this with strength training to maintain lean mass and cardiovascular exercise to increase calorie burn. Sustainable fat loss is 0.5–1% body fat per month.',
  },
  {
    q: 'Is body fat or BMI more accurate?',
    a: 'Body fat percentage is generally considered more accurate than BMI for assessing health and body composition. BMI does not distinguish between muscle and fat, so muscular people often appear overweight by BMI even with low body fat. That said, even body fat calculators have margin of error — the most accurate measurement methods require clinical equipment.',
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
  name: 'Body Fat Calculator',
  url: 'https://fitnesscalculators.app/body-fat',
  description: 'Free body fat percentage calculator using the US Navy method with fat mass and lean mass breakdown.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Body Fat Percentage',
  step: [
    { '@type': 'HowToStep', name: 'Select your sex and units', text: 'Choose male or female and your preferred measurement units (imperial in inches or metric in centimeters).' },
    { '@type': 'HowToStep', name: 'Measure and enter your circumferences', text: 'Measure your height, neck circumference, waist circumference at the navel, and for women, hip circumference at the widest point. Enter these measurements.' },
    { '@type': 'HowToStep', name: 'View your body fat percentage', text: 'Your body fat percentage, category, fat mass, and lean mass are calculated instantly using the US Navy formula.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function BodyFatPage() {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">Body Fat Calculator</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your body fat percentage using the US Navy method. Get your fat mass, lean mass, and fitness category instantly.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111114" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <BodyFatCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222225" /></div>
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">How the US Navy Body Fat Formula works</h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              The US Navy circumference method estimates body fat percentage from simple body measurements. For men, it uses height, waist, and neck circumferences. For women, it adds hip circumference. The formula applies logarithmic math to these measurements and has been validated against more expensive methods like hydrostatic weighing. While not as precise as a DEXA scan, it gives a practical estimate you can track over time at home.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333336" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
