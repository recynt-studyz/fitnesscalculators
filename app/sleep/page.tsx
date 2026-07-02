import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import SleepCalculatorWrapper from '@/components/SleepCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sleep Calculator — Best Bedtime & Wake Up Time',
  description:
    'Calculate the best time to go to sleep or wake up based on sleep cycles. Free sleep calculator to optimize your rest and wake feeling refreshed.',
  alternates: { canonical: 'https://fitnesscalculators.app/sleep' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How many hours of sleep do I need?',
    a: 'Most adults need 7–9 hours of sleep per night. Teenagers need 8–10 hours, school-age children 9–11 hours, and infants much more. Individual variation exists — some people function well on 7 hours while others need 9. The best indicator is whether you feel rested and alert throughout the day without relying on caffeine.',
  },
  {
    q: 'What is a sleep cycle?',
    a: 'A sleep cycle is approximately 90 minutes long and consists of multiple stages: light sleep (N1, N2), deep sleep (N3, also called slow-wave sleep), and REM (rapid eye movement) sleep. Most adults cycle through 5–6 complete sleep cycles per night. Waking at the end of a cycle, rather than in the middle, helps you feel more refreshed.',
  },
  {
    q: 'Why do I wake up tired after 8 hours?',
    a: 'Waking up in the middle of a sleep cycle — particularly during deep sleep — causes sleep inertia (grogginess). This is why 7.5 hours (5 cycles) or 9 hours (6 cycles) often feels better than exactly 8 hours. Our sleep calculator suggests bedtimes aligned to complete sleep cycles so you wake up at the end of a cycle feeling alert.',
  },
  {
    q: 'What is the best time to go to sleep?',
    a: 'The best bedtime is one that allows you to complete 5–6 sleep cycles and wake up feeling rested. For most adults who wake at 6–7 AM, ideal bedtimes are 9:30–11:30 PM. The calculator adds 14 minutes to account for average sleep onset time, so the bedtimes shown are when to get into bed, not when you will actually fall asleep.',
  },
  {
    q: 'How does sleep affect fitness and weight loss?',
    a: 'Sleep is critical for athletic performance and body composition. During deep sleep, the body releases growth hormone — essential for muscle repair and fat metabolism. Poor sleep raises cortisol and ghrelin (hunger hormone) levels, making weight loss harder. Studies show people who sleep less than 7 hours lose more muscle mass during calorie restriction and have worse workout performance.',
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
  name: 'Sleep Calculator',
  url: 'https://fitnesscalculators.app/sleep',
  description: 'Free sleep cycle calculator showing optimal bedtimes and wake times based on 90-minute sleep cycles.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use the Sleep Calculator',
  step: [
    { '@type': 'HowToStep', name: 'Choose your mode', text: 'Select whether you want to find the best bedtime for a given wake time, or the best wake time for a given bedtime.' },
    { '@type': 'HowToStep', name: 'Enter your target time', text: 'Input your desired wake up time or bedtime using the time picker.' },
    { '@type': 'HowToStep', name: 'View optimized sleep times', text: 'See 3 suggested times aligned to complete 90-minute sleep cycles, accounting for 14 minutes of average fall-asleep time.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function SleepPage() {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">Sleep Calculator</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Find the perfect bedtime or wake-up time based on 90-minute sleep cycles. Wake up refreshed, not groggy.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111123" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <SleepCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222234" /></div>
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">The science of sleep cycles</h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              Sleep is not a single continuous state — it is a series of 90-minute cycles, each containing stages of light sleep, deep sleep, and REM sleep. Waking up mid-cycle (especially during deep sleep) triggers sleep inertia, that groggy feeling even after a full night of sleep. By timing your wake-up to the end of a complete cycle, you wake naturally during light sleep and feel more alert. Our sleep calculator calculates exactly when to go to bed or set your alarm to align with these natural sleep rhythms. All calculations run entirely in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333345" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
