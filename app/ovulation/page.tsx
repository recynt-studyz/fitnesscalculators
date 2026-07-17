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
          {/* Depth Content */}
          <div className="space-y-8 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">How the Ovulation Calculator Works</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>The menstrual cycle is divided into two phases separated by ovulation. The <strong>follicular phase</strong> begins on the first day of menstruation and ends at ovulation — its length varies between women and even cycle to cycle. The <strong>luteal phase</strong> begins after ovulation and runs until the next period begins — it is remarkably consistent at approximately 14 days regardless of cycle length.</p>
                <p>This 14-day luteal phase consistency is the key to ovulation prediction. Because the time from ovulation to the next period is nearly always 14 days, ovulation can be estimated by counting backward from the expected next period:</p>
                <p><strong>Ovulation day = LMP date + (cycle length &minus; 14)</strong></p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>28-day cycle: ovulation on approximately day 14</li>
                  <li>32-day cycle: ovulation on approximately day 18</li>
                  <li>26-day cycle: ovulation on approximately day 12</li>
                  <li>21-day cycle: ovulation on approximately day 7</li>
                  <li>35-day cycle: ovulation on approximately day 21</li>
                </ul>
                <p>The <strong>fertile window</strong> extends 5 days before ovulation through ovulation day itself — 6 days total. This accounts for sperm survival: sperm can remain viable in the female reproductive tract for up to 5 days, waiting for the egg. The egg itself is only viable for 12–24 hours after ovulation. The peak fertile days are the 2 days immediately before ovulation and ovulation day itself.</p>
                <p>What is the luteal phase and why does it matter? The luteal phase is when the corpus luteum (the remnant of the follicle that released the egg) produces progesterone to maintain the uterine lining. If fertilization occurs, the corpus luteum continues producing progesterone until the placenta takes over. If not, the corpus luteum breaks down, progesterone drops, and the uterine lining sheds — beginning the next menstrual period. A luteal phase shorter than 10 days (luteal phase defect) may impair implantation and is sometimes investigated in cases of recurrent early pregnancy loss.</p>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Fertile Window: Worked Example</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Using LMP of <strong>January 1</strong>, the fertile window and ovulation for three different cycle lengths:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>28-day cycle:</strong> Ovulation &sim; January 15 | Fertile window: January 10–15 | Next period: January 29</li>
                  <li><strong>32-day cycle:</strong> Ovulation &sim; January 19 | Fertile window: January 14–19 | Next period: February 2</li>
                  <li><strong>26-day cycle:</strong> Ovulation &sim; January 13 | Fertile window: January 8–13 | Next period: January 27</li>
                </ul>
                <p>Notice how a 6-day difference in cycle length (26 vs. 32 days) shifts the fertile window by 6 days while keeping the luteal phase constant at 14 days. Two women with very different cycle lengths both ovulate 14 days before their next period — the difference is only in when ovulation falls relative to the start of the cycle.</p>
                <p>Cycle irregularity makes prediction less reliable. Someone with cycles ranging from 26 to 34 days would have a fertile window that could fall anywhere between days 8 and 20. In this case, tracking physical ovulation signs — cervical mucus changes, basal body temperature rise, or LH surge via ovulation predictor kits — adds significantly more accuracy than calendar calculation alone.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Key Factors That Affect Ovulation Timing</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong>Cycle regularity:</strong> Calendar-based ovulation prediction is most accurate for women with consistent cycle lengths. If your cycle varies by more than 2–3 days from month to month, the predicted fertile window may miss the actual ovulation by several days. Combining calendar prediction with physical signs improves accuracy significantly.</p>
                <p><strong>Stress:</strong> Significant physical or psychological stress can delay or suppress ovulation by disrupting the hypothalamic-pituitary-ovarian axis. Under severe stress (such as extreme caloric restriction, intense athletic training, or major life events), ovulation may not occur at all in a given cycle — a condition called anovulation.</p>
                <p><strong>PCOS (polycystic ovary syndrome):</strong> PCOS is the most common cause of irregular cycles and anovulation in reproductive-age women, affecting 5–10% of the population. Women with PCOS may ovulate unpredictably or infrequently, making calendar prediction unreliable. LH-based ovulation tests and medical monitoring are more appropriate for this group.</p>
                <p><strong>Age-related changes:</strong> As women approach perimenopause (typically mid-to-late 40s), cycle length and regularity often change. Ovulation may become less predictable and eventually cease. Shorter cycles in the late reproductive years sometimes reflect a shortened follicular phase, not a shorter luteal phase.</p>
                <p><strong>Physical tracking methods:</strong> Several methods supplement calendar prediction with direct physiological signs. Basal body temperature (BBT) rises 0.2–0.5&deg;C after ovulation, confirming it has occurred. Cervical mucus becomes clear, slippery, and elastic (like raw egg white) in the days approaching ovulation. LH test strips detect the luteinizing hormone surge that triggers ovulation approximately 12–36 hours before it occurs — providing advance notice rather than confirmation.</p>
                <p><strong>Sperm survival:</strong> Sperm can survive in the cervix and fallopian tubes for up to 5 days under favorable mucus conditions. This is why the fertile window extends several days before ovulation day — sperm deposited on day 10 may still fertilize an egg that releases on day 14. Maximizing the fertile window with appropriately timed intercourse (every 1–2 days during the fertile window) optimizes conception chances.</p>
              </div>
            </div>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333343" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
