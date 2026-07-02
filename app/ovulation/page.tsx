import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import OvulationCalculatorWrapper from '@/components/OvulationCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Ovulation Calculator — Fertile Window Calculator',
  description:
    'Calculate your ovulation date and fertile window based on your cycle length. Free ovulation calculator showing your next 3 fertile periods.',
  alternates: { canonical: 'https://fitnesscalculators.app/ovulation' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'When do I ovulate?',
    a: 'Ovulation typically occurs 14 days before your next expected period, regardless of your cycle length. For a 28-day cycle, that is day 14. For a 35-day cycle, that is around day 21. Our ovulation calculator uses the formula: ovulation day = LMP + (cycle length − 14) to estimate your ovulation date for any cycle length.',
  },
  {
    q: 'How long is the fertile window?',
    a: 'The fertile window is approximately 6 days long — the 5 days before ovulation and the day of ovulation itself. This accounts for the fact that sperm can survive in the reproductive tract for up to 5 days, while an egg is only viable for 12–24 hours after ovulation. The most fertile days are the 2–3 days leading up to and including ovulation day.',
  },
  {
    q: 'What are signs of ovulation?',
    a: 'Common signs of ovulation include changes in cervical mucus (becomes clear and stretchy, like raw egg white), a slight rise in basal body temperature (0.2–0.5°C), mild one-sided pelvic discomfort (mittelschmerz), increased libido, and a softer, higher cervix. Ovulation predictor kits (OPKs) detect the LH surge that triggers ovulation.',
  },
  {
    q: 'How does cycle length affect ovulation?',
    a: 'Your cycle length determines when ovulation occurs. Ovulation always happens approximately 14 days before your next period, regardless of how long your total cycle is. So a woman with a 21-day cycle ovulates around day 7, while one with a 35-day cycle ovulates around day 21. Our ovulation calculator automatically accounts for any cycle length from 20–45 days.',
  },
  {
    q: 'Can I get pregnant outside my fertile window?',
    a: 'Pregnancy outside the defined fertile window is very unlikely but theoretically possible due to cycle variations and irregular ovulation. Sperm can survive up to 5 days, so unprotected sex just before your fertile window could still result in pregnancy if ovulation occurs slightly earlier than predicted. Ovulation timing can vary even in women with regular cycles.',
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
  name: 'Ovulation Calculator',
  url: 'https://fitnesscalculators.app/ovulation',
  description: 'Free ovulation and fertile window calculator with calendar view for up to 3 cycles.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Ovulation Date',
  step: [
    { '@type': 'HowToStep', name: 'Enter your last period date', text: 'Select the first day of your most recent menstrual period using the date picker.' },
    { '@type': 'HowToStep', name: 'Set your cycle length', text: 'Enter your average menstrual cycle length in days (typically 21–35 days; default is 28).' },
    { '@type': 'HowToStep', name: 'View your fertile window and calendar', text: 'Your ovulation date, fertile window, and next period date appear for each cycle, along with a color-coded calendar view.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function OvulationPage() {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">Ovulation Calculator</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Find your fertile window and ovulation date. See a color-coded calendar for your next 3 cycles with fertile days highlighted.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111121" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <OvulationCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222232" /></div>
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">How the ovulation calculator works</h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              Our ovulation calculator predicts your fertile window based on the timing of ovulation relative to your cycle length. Ovulation typically occurs 14 days before your next expected period, so the calculation is: ovulation date = LMP date + (cycle length − 14). The fertile window spans 5 days before ovulation through the day of ovulation. The color-coded calendar makes it easy to visualize your next few cycles at a glance. All calculations run entirely in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333343" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
