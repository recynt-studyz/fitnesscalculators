import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import PregnancyCalculatorWrapper from '@/components/PregnancyCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Pregnancy Due Date Calculator — Due Date Estimator',
  description:
    'Calculate your pregnancy due date from your last period, conception date or ultrasound. Free pregnancy calculator with trimester breakdown and milestone dates.',
  alternates: { canonical: 'https://fitnesscalculators.app/pregnancy' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How is the due date calculated?',
    a: "A pregnancy due date is calculated by adding 280 days (40 weeks) to the first day of your last menstrual period (LMP). This is the standard method used by most healthcare providers. If you know your conception date, the calculator adds 266 days (38 weeks) instead. For IVF, it uses the transfer date plus an adjustment for embryo age.",
  },
  {
    q: "What is Naegele's rule?",
    a: "Naegele's rule is the standard method for calculating a due date: add 1 year, subtract 3 months, and add 7 days to the first day of the last menstrual period — which is equivalent to adding 280 days. It assumes a 28-day cycle with ovulation on day 14. Our calculator adjusts for different cycle lengths.",
  },
  {
    q: 'How accurate is a due date calculator?',
    a: 'Due date calculators based on LMP are accurate to within a few days for women with regular 28-day cycles. However, only about 4–5% of babies are born on their exact due date. Most births occur within two weeks before or after the estimated due date. An ultrasound in the first trimester is the most accurate way to confirm your due date.',
  },
  {
    q: 'When does each trimester start and end?',
    a: 'The first trimester runs from weeks 1–13, the second trimester from weeks 14–26, and the third trimester from weeks 27–40. Each trimester marks important developmental milestones. Our pregnancy calculator shows the exact date ranges for each trimester based on your due date.',
  },
  {
    q: 'What if my cycle is not 28 days?',
    a: "Women with longer or shorter cycles ovulate at different times, which shifts the conception date and therefore the due date. Our calculator accounts for cycle length — if you have a 35-day cycle, it adjusts your due date by 7 days later than the standard calculation. Enter your actual cycle length for the most accurate estimate.",
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
  name: 'Pregnancy Due Date Calculator',
  url: 'https://fitnesscalculators.app/pregnancy',
  description: 'Free pregnancy due date calculator with trimester breakdown, current week, and milestone dates.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Pregnancy Due Date',
  step: [
    { '@type': 'HowToStep', name: 'Select your calculation method', text: 'Choose from Last Period, Conception Date, IVF Transfer Date, or Ultrasound Date depending on what information you have.' },
    { '@type': 'HowToStep', name: 'Enter your date and cycle length', text: 'Enter the relevant date and, if using last period method, your average cycle length (default 28 days).' },
    { '@type': 'HowToStep', name: 'View your due date and timeline', text: 'Your due date, current pregnancy week, trimester, days remaining, key milestones, and trimester date ranges all appear instantly.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function PregnancyPage() {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">Pregnancy Due Date Calculator</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your due date from your last period, conception date, or IVF transfer. See your trimester breakdown and key pregnancy milestones.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111120" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <PregnancyCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222231" /></div>
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">Understanding your pregnancy due date</h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              A pregnancy due date is an estimate — not a guarantee of when your baby will arrive. Most babies are born between 38 and 42 weeks of pregnancy. Our pregnancy calculator uses Naegele&apos;s rule adjusted for your cycle length to give you the most accurate estimate possible from home. For an official due date, your healthcare provider will use a combination of your LMP and early ultrasound measurements. All calculations run entirely in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333342" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
