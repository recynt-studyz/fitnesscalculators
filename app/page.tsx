import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import BMICalculatorWrapper from '@/components/BMICalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'BMI Calculator — Body Mass Index Calculator',
  description:
    'Calculate your BMI instantly with our free body mass index calculator. Supports imperial and metric units. See your BMI category and healthy weight range.',
  alternates: { canonical: 'https://fitnesscalculators.app' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is a healthy BMI?',
    a: 'A healthy BMI is between 18.5 and 24.9. This range is associated with the lowest risk of weight-related health problems for most adults. BMI below 18.5 is considered underweight, 25–29.9 is overweight, and 30 or above is classified as obese.',
  },
  {
    q: 'How is BMI calculated?',
    a: 'BMI is calculated by dividing your weight in kilograms by your height in meters squared. In imperial units, the formula is: BMI = (weight in pounds × 703) ÷ (height in inches)². Our BMI calculator does this math instantly as you type.',
  },
  {
    q: 'Is BMI accurate for athletes?',
    a: 'BMI is less accurate for athletes and people with high muscle mass. Because muscle weighs more than fat, muscular individuals often show a higher BMI despite having low body fat. In these cases, body fat percentage is a more meaningful measure.',
  },
  {
    q: 'What is the difference between BMI and body fat?',
    a: 'BMI is an indirect screening tool based only on height and weight. Body fat percentage directly measures how much of your body is fat. Two people can have the same BMI but very different body fat percentages — particularly if one is more muscular.',
  },
  {
    q: 'How do I lower my BMI?',
    a: 'Lowering BMI requires reducing body weight relative to your height. The most effective approach combines a moderate calorie deficit (eating 300–500 fewer calories than you burn daily) with regular physical activity. Sustainable weight loss is typically 0.5–1 pound per week.',
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
  name: 'BMI Calculator',
  url: 'https://fitnesscalculators.app',
  description: 'Free BMI calculator with body mass index category, visual scale, and healthy weight range.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your BMI',
  step: [
    { '@type': 'HowToStep', name: 'Select your unit system', text: 'Choose Imperial (feet, inches, pounds) or Metric (centimeters, kilograms) using the toggle at the top of the calculator.' },
    { '@type': 'HowToStep', name: 'Enter your height and weight', text: 'Type in your height and current weight. The BMI calculator updates your result instantly as you type.' },
    { '@type': 'HowToStep', name: 'Read your BMI and category', text: 'Your BMI score appears immediately along with your category (Underweight, Normal Weight, Overweight, or Obese) and a visual scale showing where you fall.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      {/* Hero */}
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgfc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Free BMI Calculator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your body mass index instantly. Supports imperial and metric units. See your BMI category and where you fall on the scale.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1111111111" />
          </div>

          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <BMICalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      {/* Below hero */}
      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="2222222222" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-10">
            {[
              { icon: '🔒', label: 'Private', sub: 'Calculations stay in your browser' },
              { icon: '⚡', label: 'Instant', sub: 'Results update as you type' },
              { icon: '🎯', label: 'Accurate', sub: 'Standard health formulas' },
              { icon: '✓', label: 'Free', sub: 'No signup, no limits' },
            ].map(t => (
              <div key={t.label} className="flex flex-col items-center rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1e293b] p-4 text-center shadow-sm">
                <span className="text-2xl mb-1">{t.icon}</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-[#e2e8f0]">{t.label}</span>
                <span className="text-xs text-gray-400 mt-0.5">{t.sub}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">
              What is a BMI calculator and why does it matter?
            </h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              A BMI calculator (Body Mass Index calculator) is a quick screening tool that uses your height and weight to estimate whether you are in a healthy weight range. While BMI does not directly measure body fat, it is widely used by healthcare providers as a first indicator of potential weight-related health risks. A BMI in the normal range (18.5–24.9) is associated with lower risk of conditions like heart disease, type 2 diabetes, and high blood pressure. All calculations run entirely in your browser — your data never leaves your device.
            </p>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="3333333333" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
