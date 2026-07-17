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
          {/* Depth Content */}
          <div className="space-y-8 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">How the Sleep Calculator Works</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Sleep is not a single uniform state — it is a cyclical process consisting of repeating 90-minute stages. Each complete sleep cycle passes through four distinct phases:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Stage N1 (light sleep):</strong> The transition from wakefulness; lasts 1–5 minutes; easily disrupted; muscle twitches (hypnic jerks) may occur</li>
                  <li><strong>Stage N2 (consolidated light sleep):</strong> Heart rate slows, body temperature drops; sleep spindles and K-complexes appear in brain waves; memory consolidation begins; typically 10–25 minutes</li>
                  <li><strong>Stage N3 (deep sleep / slow-wave sleep):</strong> The most restorative stage; growth hormone is released; tissue repair, immune function, and physical recovery occur; hardest to wake from; 20–40 minutes early in the night</li>
                  <li><strong>REM (rapid eye movement) sleep:</strong> Vivid dreaming; emotional memory processing; brain activity resembles wakefulness; paralysis of major muscles prevents acting out dreams; longest periods occur in the final cycles of the night</li>
                </ul>
                <p>The <strong>sleep inertia</strong> problem: When an alarm forces you awake during deep sleep (N3), adenosine — a sleep pressure chemical — is still elevated in the brain, and you experience grogginess, impaired cognition, and reduced alertness for 15–60 minutes. This is sleep inertia. By contrast, waking at the end of a complete cycle (during the light N1/N2 stage) often feels natural and alert because the brain has already partially transitioned back toward wakefulness.</p>
                <p>Our calculator works backward from your target wake time (or forward from your bedtime) in 90-minute increments, adding 14 minutes for average sleep onset time (the time it takes to fall asleep after getting into bed). This gives you bedtimes or wake times aligned with the natural end of a sleep cycle — the point where waking causes the least disruption.</p>
                <p>Most adults need 5–6 complete cycles per night (7.5–9 hours). Our calculator highlights 5-cycle (7.5 hr) and 6-cycle (9 hr) options as the sweet spots for full recovery, while also showing 4-cycle (6 hr) for nights where sleep opportunity is limited.</p>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Sleep Timing: Worked Example</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>James needs to wake at <strong>6:30 AM</strong>. Working backward in 90-minute cycles with 14 minutes for sleep onset:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>6 cycles (9 hours):</strong> Asleep by 9:30 PM &rarr; <strong>Bedtime: 9:16 PM</strong> — ideal if achievable; maximum restoration</li>
                  <li><strong>5 cycles (7.5 hours):</strong> Asleep by 11:00 PM &rarr; <strong>Bedtime: 10:46 PM</strong> — recommended minimum for most adults</li>
                  <li><strong>4 cycles (6 hours):</strong> Asleep by 12:30 AM &rarr; <strong>Bedtime: 12:16 AM</strong> — acceptable occasionally, not sustainable long-term</li>
                </ul>
                <p>Why is 7.5 hours (5 cycles) often better than 8 hours? Setting an alarm for 8 hours may wake James mid-cycle in deep sleep (N3), triggering sleep inertia and grogginess. Getting up after 7.5 hours — aligned to a cycle boundary — he wakes in light sleep and feels more alert despite technically less total sleep time. The cycle boundary matters as much as total duration.</p>
                <p>Conversely, if James must go to bed at <strong>11:30 PM</strong> and works forward: add 14 min for onset (sleep at 11:44 PM), then 90-min cycles: optimal wake times are <strong>1:14 AM</strong> (2 cycles), <strong>2:44 AM</strong> (3 cycles), <strong>4:14 AM</strong> (4 cycles), <strong>5:44 AM</strong> (5 cycles), or <strong>7:14 AM</strong> (6 cycles).</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Key Factors That Affect Sleep Quality and Timing</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong>Sleep cycle length variation:</strong> The 90-minute average varies between individuals and across the night. Earlier cycles tend to be shorter (80–90 min) with more deep sleep; later cycles run longer (90–110 min) with more REM. Our calculator uses 90 minutes as the standard approximation — if you consistently feel best at a slightly different wake time, trust your body&apos;s feedback over the formula.</p>
                <p><strong>Age-related changes:</strong> Deep sleep (N3) decreases substantially with age. Adults over 60 typically get less slow-wave sleep and wake more frequently during the night. Sleep efficiency (the proportion of time in bed spent asleep) also declines with age. Older adults often benefit from slightly earlier bedtimes and may naturally wake earlier as circadian rhythms shift.</p>
                <p><strong>Sleep debt:</strong> Accumulated sleep deprivation — even mild chronic short-sleeping — builds a sleep debt that cannot be fully repaid by a single long sleep session. Cognitive impairment from chronic sleep restriction persists even when subjective sleepiness normalizes. The most effective intervention is consistent adequate sleep duration for multiple nights.</p>
                <p><strong>Circadian rhythm:</strong> Your internal biological clock regulates sleep-wake cycles with a natural period of approximately 24 hours, entrained by light exposure. Morning bright light suppresses melatonin and promotes wakefulness; evening light delays the circadian clock. Screen light in the 1–2 hours before bed can delay sleep onset by 30–90 minutes, reducing total sleep time for those with fixed morning wake obligations.</p>
                <p><strong>REM rebound:</strong> When sleep is cut short — by an alarm, alcohol, or sleep apnea — REM sleep is preferentially lost because it concentrates in the final hours of sleep. REM is critical for emotional regulation and memory consolidation. After periods of REM deprivation, the brain compensates with longer, more intense REM on subsequent nights (REM rebound). This is why extended sleep after a week of short nights feels especially vivid and dreamful.</p>
                <p><strong>Nap timing and duration:</strong> A 20-minute nap during early afternoon avoids deep sleep entirely and reduces grogginess; it can restore alertness for 2–3 hours. A 90-minute nap completes a full cycle and offers deeper restoration without impacting nighttime sleep. Naps taken after 3–4 PM or longer than 30 minutes (without completing a full cycle) increase sleep pressure disruption at bedtime.</p>
                <p><strong>Sleep and fitness:</strong> Deep sleep is when the body releases the majority of its daily growth hormone output — essential for muscle protein synthesis, fat metabolism, and physical recovery. Inadequate sleep measurably reduces training adaptation, increases injury risk, impairs reaction time, and elevates cortisol, promoting fat storage and muscle breakdown. For athletes, sleep is as important a recovery tool as nutrition and rest days.</p>
              </div>
            </div>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333345" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
