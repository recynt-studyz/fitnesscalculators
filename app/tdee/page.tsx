import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import TDEECalculatorWrapper from '@/components/TDEECalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'TDEE Calculator — Total Daily Energy Expenditure',
  description:
    'Calculate your total daily energy expenditure based on activity level. Free TDEE calculator with calorie targets for weight loss, maintenance and muscle gain.',
  alternates: { canonical: 'https://fitnesscalculators.app/tdee' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is TDEE?',
    a: 'TDEE stands for Total Daily Energy Expenditure — the total number of calories you burn in a day, including all physical activity on top of your resting metabolism (BMR). It is the number you should base your calorie intake on when setting nutrition goals.',
  },
  {
    q: 'How do I calculate my TDEE?',
    a: 'TDEE is calculated by multiplying your BMR (Basal Metabolic Rate) by an activity multiplier: Sedentary (×1.2), Lightly Active (×1.375), Moderately Active (×1.55), Very Active (×1.725), or Extra Active (×1.9). Our TDEE calculator does this automatically using the Mifflin-St Jeor BMR equation.',
  },
  {
    q: 'What is the difference between TDEE and BMR?',
    a: 'BMR is the calories you burn at complete rest — just to stay alive. TDEE adds the calories burned through all daily movement and exercise on top of your BMR. Most people burn 20–100% more calories than their BMR when accounting for activity. TDEE is the practical number for dietary planning.',
  },
  {
    q: 'How accurate is TDEE?',
    a: 'TDEE calculators are accurate to within roughly 10–15% for most people. The activity level is the biggest variable — people often overestimate their activity. If your weight is not changing as expected, adjust your estimated TDEE by 100–200 calories in the appropriate direction based on 2–3 weeks of tracking results.',
  },
  {
    q: 'How do I use TDEE to lose weight?',
    a: 'To lose weight, eat fewer calories than your TDEE. A 500 calorie deficit per day leads to approximately 1 pound of fat loss per week. A 250 calorie deficit results in about 0.5 lbs/week — slower but easier to sustain. Avoid deficits larger than 1,000 calories/day as this can cause muscle loss and metabolic adaptation.',
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
  name: 'TDEE Calculator',
  url: 'https://fitnesscalculators.app/tdee',
  description: 'Free TDEE calculator with goal-based calorie targets for weight loss, maintenance, and muscle gain.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your TDEE',
  step: [
    { '@type': 'HowToStep', name: 'Enter your measurements', text: 'Input your age, sex, height, and weight using your preferred unit system.' },
    { '@type': 'HowToStep', name: 'Select your activity level', text: 'Choose the activity level that best represents your typical week — from sedentary to extra active.' },
    { '@type': 'HowToStep', name: 'View your TDEE and calorie targets', text: 'Your total daily energy expenditure appears instantly, along with goal-based calorie recommendations for different rates of weight loss and gain.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function TDEEPage() {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">TDEE Calculator</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your total daily energy expenditure and get personalized calorie targets for your fitness goal.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111116" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <TDEECalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222227" /></div>
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">TDEE: the starting point for every nutrition goal</h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              Your TDEE is the most important number in nutrition planning. Eat at your TDEE and your weight stays stable. Eat below it and you lose weight. Eat above it and you gain weight. The accuracy of your TDEE determines how well your plan works — which is why using a validated formula like Mifflin-St Jeor and being honest about your activity level is critical. Start with our estimate, track your results for 2–3 weeks, and adjust as needed. All calculations run entirely in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333338" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
