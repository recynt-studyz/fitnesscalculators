import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import MacroCalculatorWrapper from '@/components/MacroCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Macro Calculator — Protein Carbs Fat Calculator',
  description:
    'Calculate your daily protein, carbs and fat targets based on your goals. Free macro calculator for weight loss, muscle gain and maintenance.',
  alternates: { canonical: 'https://fitnesscalculators.app/macros' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What are macros?',
    a: 'Macros (macronutrients) are the three main nutrients your body uses for energy: protein, carbohydrates, and fat. Protein provides 4 calories per gram, carbs provide 4 calories per gram, and fat provides 9 calories per gram. Tracking your macros helps ensure you get the right balance for your specific fitness goal.',
  },
  {
    q: 'How much protein do I need per day?',
    a: 'Most fitness experts recommend 0.7–1 gram of protein per pound of body weight per day. If you are actively building muscle or in a calorie deficit, aim for the higher end (0.8–1g/lb) to preserve lean mass. Athletes may benefit from slightly more. Our macro calculator ensures your protein target meets this minimum.',
  },
  {
    q: 'What is a good macro split for weight loss?',
    a: 'A balanced macro split for weight loss is typically 30–40% protein, 30–40% carbs, and 20–30% fat. Higher protein helps preserve muscle mass while in a deficit. Some people do well with a lower-carb approach (35% protein, 45% fat, 20% carbs). Our calculator lets you choose from Balanced, Low Carb, High Protein, or Keto splits.',
  },
  {
    q: 'How do I track my macros?',
    a: 'The easiest way to track macros is using a food logging app where you log every meal and scan barcodes. Start by hitting your protein goal first, then fill in carbs and fat. Weigh food in grams for accuracy. After 2–3 weeks of tracking, many people develop a good intuitive sense of macro content.',
  },
  {
    q: 'What is the difference between macros and calories?',
    a: 'Calories represent total energy intake, while macros describe where those calories come from. You can hit your calorie goal but eat poor quality macros (too little protein, too much fat) and see suboptimal results. Tracking both gives you a more complete picture of your nutrition and helps you optimize body composition, not just weight.',
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
  name: 'Macro Calculator',
  url: 'https://fitnesscalculators.app/macros',
  description: 'Free macro calculator for daily protein, carbs, and fat targets with visual pie chart and per-meal breakdown.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Macros',
  step: [
    { '@type': 'HowToStep', name: 'Enter your stats and goal', text: 'Input your age, sex, height, weight, activity level, and fitness goal (lose fat, maintain, or build muscle).' },
    { '@type': 'HowToStep', name: 'Choose your diet style', text: 'Select from Balanced, Low Carb, High Protein, or Keto to customize your macro split to match your preferred eating style.' },
    { '@type': 'HowToStep', name: 'View your daily and per-meal targets', text: 'Your protein, carbs, and fat targets in grams and calories appear instantly, along with a visual pie chart and per-meal breakdown.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function MacrosPage() {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">Free Macro Calculator</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your ideal protein, carbs, and fat targets. Choose your diet style and see your macros broken down by meal.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111113" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <MacroCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222224" /></div>
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">Why track macros instead of just calories?</h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              Tracking macros gives you more control over your body composition than counting calories alone. By ensuring adequate protein intake, you preserve muscle while losing fat. Adjusting carbs helps manage energy levels and cravings. Setting fat targets supports hormonal health. The right macro balance depends on your goals — our macro calculator personalizes your targets based on your stats and chosen diet style.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333335" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
