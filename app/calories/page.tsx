import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import CalorieCalculatorWrapper from '@/components/CalorieCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Calorie Calculator — Daily Calorie Needs Calculator',
  description:
    'Calculate your daily calorie needs based on age, weight, height and activity level. Free calorie calculator for weight loss, maintenance and muscle gain.',
  alternates: { canonical: 'https://fitnesscalculators.app/calories' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How many calories should I eat per day?',
    a: 'Your daily calorie needs depend on your age, sex, height, weight, and activity level. Most adults need between 1,600 and 3,000 calories per day. Our calorie calculator uses the Mifflin-St Jeor equation — the most accurate formula available — to estimate your specific needs.',
  },
  {
    q: 'How do I calculate my calorie deficit?',
    a: 'A calorie deficit means eating fewer calories than you burn. To lose approximately 1 pound per week, eat 500 fewer calories than your TDEE (total daily energy expenditure). For 0.5 lbs/week, cut 250 calories. For 2 lbs/week, cut 1,000 — though going below 1,200 calories (women) or 1,500 calories (men) is not recommended without medical supervision.',
  },
  {
    q: 'How many calories do I need to lose weight?',
    a: 'To lose weight, you need to eat fewer calories than you burn. Most people see results eating their TDEE minus 300–500 calories per day. This creates a sustainable deficit without triggering excessive hunger or muscle loss. Aim for slow, steady loss of 0.5–1 pound per week.',
  },
  {
    q: 'What happens if I eat too few calories?',
    a: 'Severe calorie restriction can cause muscle loss, nutritional deficiencies, fatigue, hormonal disruption, and a slowdown in metabolism. This makes it harder to maintain weight loss long-term. Most health experts recommend never going below 1,200 calories for women or 1,500 for men without medical guidance.',
  },
  {
    q: 'How accurate are calorie calculators?',
    a: 'Calorie calculators provide good estimates, typically within 10–15% of your actual needs. They use validated equations like Mifflin-St Jeor, but individual variation in metabolism exists. Track your weight for 2–3 weeks after starting, then adjust your calorie target up or down by 100–200 calories based on actual results.',
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
  name: 'Calorie Calculator',
  url: 'https://fitnesscalculators.app/calories',
  description: 'Free calorie calculator for daily calorie needs based on TDEE with goal-based recommendations.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Daily Calorie Needs',
  step: [
    { '@type': 'HowToStep', name: 'Enter your stats', text: 'Input your age, sex, height, weight, and activity level. The calculator uses these to compute your BMR and TDEE using the Mifflin-St Jeor equation.' },
    { '@type': 'HowToStep', name: 'Select your goal', text: 'Choose whether you want to lose weight, maintain, or gain muscle. If losing, select your preferred rate of loss.' },
    { '@type': 'HowToStep', name: 'Review your calorie targets', text: 'Your TDEE (maintenance calories) and goal-specific calorie target appear instantly, along with six scenario cards showing different rates of loss and gain.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function CaloriesPage() {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Free Calorie Calculator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your daily calorie needs for weight loss, maintenance, or muscle gain. Based on the Mifflin-St Jeor equation. Instant results.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111112" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <CalorieCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222223" /></div>
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">
              Why use a calorie calculator?
            </h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              A calorie calculator takes the guesswork out of nutrition planning. By calculating your TDEE (Total Daily Energy Expenditure), you get a personalized starting point for your calorie target. Whether your goal is fat loss, maintaining your current weight, or building muscle, knowing your calorie needs is the foundation of any successful nutrition plan. All calculations run entirely in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333334" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
