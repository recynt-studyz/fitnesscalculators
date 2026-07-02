import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import WaterIntakeCalculatorWrapper from '@/components/WaterIntakeCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Water Intake Calculator — Daily Water Needs',
  description:
    'Calculate how much water you should drink per day based on weight and activity level. Free water intake calculator in oz, cups, liters and ml.',
  alternates: { canonical: 'https://fitnesscalculators.app/water-intake' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How much water should I drink per day?',
    a: 'A common starting point is half your body weight in ounces per day. For a 160-pound person, that is 80 oz (about 10 cups or 2.4 liters). However, your needs increase with exercise, hot weather, pregnancy, and breastfeeding. The National Academies recommend about 3.7 liters (125 oz) per day for men and 2.7 liters (91 oz) for women from all beverages and food.',
  },
  {
    q: 'Does coffee count toward daily water intake?',
    a: 'Yes — despite the mild diuretic effect of caffeine, coffee and other caffeinated beverages do contribute to your daily fluid intake. The net hydration effect of coffee is positive, not negative. Tea, juice, and other beverages also count. However, plain water is best for optimal hydration, especially during exercise.',
  },
  {
    q: 'How do I know if I am drinking enough water?',
    a: 'The simplest indicator is urine color. Pale yellow to clear urine indicates good hydration. Dark yellow or amber urine typically signals dehydration. Other signs of adequate hydration include moist mouth, regular urination (every 2–4 hours), and absence of headaches, fatigue, or concentrated urine.',
  },
  {
    q: 'Does exercise increase water needs?',
    a: 'Yes, significantly. Sweating during exercise can lead to fluid losses of 0.5–2 liters per hour depending on intensity and temperature. A general guideline is to drink an additional 12 oz of water for every 30 minutes of moderate exercise. Our water intake calculator lets you input your daily exercise time and adjusts your target accordingly.',
  },
  {
    q: 'What are the signs of dehydration?',
    a: 'Early signs of dehydration include thirst, dark urine, and reduced urine frequency. Moderate dehydration causes headache, fatigue, dizziness, and difficulty concentrating. Severe dehydration is a medical emergency with symptoms including rapid heartbeat, rapid breathing, sunken eyes, and confusion. Most people can avoid dehydration by drinking regularly throughout the day rather than waiting until thirsty.',
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
  name: 'Water Intake Calculator',
  url: 'https://fitnesscalculators.app/water-intake',
  description: 'Free daily water intake calculator with results in oz, cups, liters, and ml plus hydration schedule.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Daily Water Intake',
  step: [
    { '@type': 'HowToStep', name: 'Enter your weight', text: 'Input your body weight in pounds or kilograms. The base water recommendation is half your weight in ounces per day.' },
    { '@type': 'HowToStep', name: 'Set your activity and environment', text: 'Select your activity level, climate (temperate or hot/humid), and daily exercise duration. These factors increase your water needs.' },
    { '@type': 'HowToStep', name: 'View your personalized water target', text: 'Your daily water target appears in oz, cups, liters, and ml simultaneously, along with a suggested daily hydration schedule.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function WaterIntakePage() {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">Water Intake Calculator</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Find out exactly how much water you need each day. Personalized for your weight, activity level, and climate. Results in oz, cups, liters, and ml.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111122" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <WaterIntakeCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222233" /></div>
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">Why proper hydration matters for fitness</h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              Water is involved in nearly every bodily process — digestion, temperature regulation, joint lubrication, nutrient transport, and waste removal. Even mild dehydration (1–2% of body weight) can impair physical and cognitive performance. Staying properly hydrated supports better workouts, faster recovery, clearer thinking, and healthier skin. Use our water intake calculator to find your personalized daily target and the suggested schedule to spread your intake throughout the day. All calculations run entirely in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333344" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
