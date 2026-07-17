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
          {/* Depth Content */}
          <div className="space-y-8 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">How the Pregnancy Due Date Calculator Works</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>A pregnancy due date is typically calculated using <strong>Naegele&apos;s Rule</strong>, formulated by German obstetrician Franz Karl Naegele in the early 19th century. The formula adds 280 days (40 weeks) to the first day of the last menstrual period (LMP). In practice: take the LMP date, add one year, subtract three months, and add seven days.</p>
                <p>The 40-week count starts from the LMP — not from conception — because conception typically occurs approximately 14 days after the start of the period (for a standard 28-day cycle), and LMP is nearly always known while conception date is rarely certain. This means the first two weeks of the 40-week &quot;pregnancy&quot; technically predate fertilization.</p>
                <p>Our calculator supports four calculation methods:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Last menstrual period:</strong> Most common; adds 280 days from LMP; adjusts for cycle length (longer cycles shift the due date later, shorter cycles earlier)</li>
                  <li><strong>Conception date:</strong> Adds 266 days (38 weeks) from known conception; useful for those tracking ovulation precisely</li>
                  <li><strong>IVF transfer date:</strong> Adds days based on embryo age at transfer (day 3 transfer: +263 days; day 5 blastocyst: +261 days)</li>
                  <li><strong>Ultrasound date:</strong> Works backward from a gestational age confirmed by early ultrasound measurement</li>
                </ul>
                <p>Pregnancy is divided into three trimesters:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>First trimester (weeks 1–13):</strong> Organ formation, highest miscarriage risk, morning sickness peak; ends with first prenatal screening</li>
                  <li><strong>Second trimester (weeks 14–26):</strong> Visible growth, fetal movement begins (&sim;weeks 18–22), anatomy scan at weeks 18–20, most comfortable trimester for many</li>
                  <li><strong>Third trimester (weeks 27–40):</strong> Rapid fetal weight gain, lungs maturing, preparation for birth; full term at 39–40 weeks</li>
                </ul>
                <p>Only about 4–5% of babies are born on their calculated due date. Approximately 80% of births occur between 38 and 42 weeks of gestation. A first-trimester ultrasound remains the most accurate method of confirming gestational age and establishing a clinical due date.</p>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Due Date Calculation: Worked Example</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>LMP: <strong>January 15</strong> | Cycle length: <strong>28 days</strong></p>
                <p><strong>Estimated due date:</strong> January 15 + 280 days = <strong>October 22</strong></p>
                <p>Key milestones from this LMP:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Week 8 (March 11): First OB appointment; heartbeat visible on ultrasound</li>
                  <li>Week 10–13 (March–April): First trimester screening (nuchal translucency, cell-free DNA testing)</li>
                  <li>Week 14 (April 17): Second trimester begins</li>
                  <li>Week 18–20 (May 22–June 5): Anatomy scan; sex determination possible</li>
                  <li>Week 24 (July 3): Viability threshold — survival possible outside womb with NICU support</li>
                  <li>Week 27 (July 24): Third trimester begins</li>
                  <li>Week 28 (July 31): Glucose challenge test; Rh immune globulin if Rh-negative</li>
                  <li>Week 36+ (October 3+): Weekly prenatal visits; Group B strep test</li>
                  <li>Week 39–40 (October 16–22): Full term; most babies arrive in this window</li>
                </ul>
                <p>If this person&apos;s cycle were 35 days instead of 28, ovulation would occur around day 21 rather than day 14 — and the due date would shift 7 days later to <strong>October 29</strong>. This cycle-length adjustment is one of the key refinements our calculator applies over the basic Naegele&apos;s rule.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Key Factors That Affect Due Date Accuracy</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong>Cycle length variation:</strong> Naegele&apos;s rule assumes a 28-day cycle with ovulation on day 14. Women with cycles significantly longer or shorter than 28 days will have due dates that differ from the standard calculation. Our calculator adjusts by the difference between actual cycle length and 28 days.</p>
                <p><strong>LMP vs. conception dating:</strong> LMP-based dating works well when cycles are regular. However, if a woman has irregular cycles, recently stopped hormonal birth control (which can delay ovulation), or experienced stress-delayed ovulation, the LMP date may not reliably reflect actual conception timing. In these cases, conception date (if known) or early ultrasound dating is more accurate.</p>
                <p><strong>Ultrasound dating:</strong> A first-trimester ultrasound between 8–13 weeks is considered the gold standard for confirming gestational age. Crown-rump length (CRL) measurement at this stage is accurate to within 5–7 days. If the ultrasound date differs significantly from the LMP estimate, providers typically use the ultrasound date as the official due date.</p>
                <p><strong>Multiple pregnancy:</strong> Twins, triplets, and higher-order multiples are typically delivered earlier than singleton pregnancies — often at 36–38 weeks for twins, 32–34 weeks for triplets. The same due date formula applies, but expectation management for delivery timing is different.</p>
                <p><strong>Preterm and post-term ranges:</strong> Preterm birth is defined as delivery before 37 weeks; late preterm (34–37 weeks) babies usually do well with minimal NICU intervention. Post-term pregnancy (beyond 42 weeks) increases the risk of certain complications, and most providers recommend induction if pregnancy continues past 41–42 weeks.</p>
              </div>
            </div>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333342" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
