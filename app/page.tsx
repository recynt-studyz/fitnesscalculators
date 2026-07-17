import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import BMICalculatorWrapper from '@/components/BMICalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'BMI Calculator — Body Mass Index Calculator',
  description:
    'Calculate your BMI instantly with our free body mass index calculator. Supports imperial and metric units. See your BMI category and healthy weight range.',
  alternates: { canonical: 'https://fitnesscalculators.app' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is a healthy BMI?',
    a: 'A healthy BMI is between 18.5 and 24.9. This range is associated with the lowest risk of weight-related health problems for most adults. BMI below 18.5 is considered underweight, 25–29.9 is overweight, and 30 or above is classified as obese.',
  },
  {
    q: 'How is BMI calculated?',
    a: 'BMI is calculated by dividing your weight in kilograms by your height in meters squared. In imperial units, the formula is: BMI = (weight in pounds × 703) ÷ (height in inches)². Our BMI calculator does this math instantly as you type.',
  },
  {
    q: 'Is BMI accurate for athletes?',
    a: 'BMI is less accurate for athletes and people with high muscle mass. Because muscle weighs more than fat, muscular individuals often show a higher BMI despite having low body fat. In these cases, body fat percentage is a more meaningful measure.',
  },
  {
    q: 'What is the difference between BMI and body fat?',
    a: 'BMI is an indirect screening tool based only on height and weight. Body fat percentage directly measures how much of your body is fat. Two people can have the same BMI but very different body fat percentages — particularly if one is more muscular.',
  },
  {
    q: 'How do I lower my BMI?',
    a: 'Lowering BMI requires reducing body weight relative to your height. The most effective approach combines a moderate calorie deficit (eating 300–500 fewer calories than you burn daily) with regular physical activity. Sustainable weight loss is typically 0.5–1 pound per week.',
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
  name: 'BMI Calculator',
  url: 'https://fitnesscalculators.app',
  description: 'Free BMI calculator with body mass index category, visual scale, and healthy weight range.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your BMI',
  step: [
    { '@type': 'HowToStep', name: 'Select your unit system', text: 'Choose Imperial (feet, inches, pounds) or Metric (centimeters, kilograms) using the toggle at the top of the calculator.' },
    { '@type': 'HowToStep', name: 'Enter your height and weight', text: 'Type in your height and current weight. The BMI calculator updates your result instantly as you type.' },
    { '@type': 'HowToStep', name: 'Read your BMI and category', text: 'Your BMI score appears immediately along with your category (Underweight, Normal Weight, Overweight, or Obese) and a visual scale showing where you fall.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      {/* Hero */}
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgfc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Free BMI Calculator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your body mass index instantly. Supports imperial and metric units. See your BMI category and where you fall on the scale.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1111111111" />
          </div>

          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <BMICalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      {/* Below hero */}
      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="2222222222" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-10">
            {[
              { icon: '🔒', label: 'Private', sub: 'Calculations stay in your browser' },
              { icon: '⚡', label: 'Instant', sub: 'Results update as you type' },
              { icon: '🎯', label: 'Accurate', sub: 'Standard health formulas' },
              { icon: '✓', label: 'Free', sub: 'No signup, no limits' },
            ].map(t => (
              <div key={t.label} className="flex flex-col items-center rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1e293b] p-4 text-center shadow-sm">
                <span className="text-2xl mb-1">{t.icon}</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-[#e2e8f0]">{t.label}</span>
                <span className="text-xs text-gray-400 mt-0.5">{t.sub}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">
              What is a BMI calculator and why does it matter?
            </h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              A BMI calculator (Body Mass Index calculator) is a quick screening tool that uses your height and weight to estimate whether you are in a healthy weight range. While BMI does not directly measure body fat, it is widely used by healthcare providers as a first indicator of potential weight-related health risks. A BMI in the normal range (18.5–24.9) is associated with lower risk of conditions like heart disease, type 2 diabetes, and high blood pressure. All calculations run entirely in your browser — your data never leaves your device.
            </p>
          </div>

          {/* Depth Content */}
          <div className="space-y-8 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">How the BMI Calculator Works</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Body Mass Index is calculated by dividing weight in kilograms by the square of height in meters (kg/m²). In imperial units the formula is: BMI = (weight in pounds &times; 703) &divide; (height in inches)&sup2;. The result is a dimensionless number used to categorize weight status relative to height.</p>
                <p>The concept originated with Belgian mathematician Adolphe Quetelet in the 1830s, who developed it as a statistical tool for studying population-level weight distribution — not as a clinical measure for individuals. It entered mainstream medicine in the 1970s after physiologist Ancel Keys demonstrated it correlated reasonably well with body fat across large population samples and coined the term &quot;Body Mass Index.&quot;</p>
                <p>The four standard BMI categories recognized by the WHO and CDC are:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Underweight — below 18.5:</strong> May indicate nutritional deficiency, malabsorption, or underlying illness</li>
                  <li><strong>Normal weight — 18.5 to 24.9:</strong> Associated with the lowest risk of weight-related chronic disease in population studies</li>
                  <li><strong>Overweight — 25 to 29.9:</strong> Elevated risk of cardiovascular disease, type 2 diabetes, and hypertension</li>
                  <li><strong>Obese — 30 and above:</strong> Significantly elevated risk; further classified as Class I (30–34.9), Class II (35–39.9), and Class III (40+)</li>
                </ul>
                <p>Health organizations rely on BMI because it requires only height and weight — making it fast, free, and reproducible at population scale. For the general non-athletic population it correlates moderately well with directly measured body fat, which is why it persists as a first-line screening tool despite well-documented limitations. BMI should always be interpreted alongside clinical context, not in isolation.</p>
                <p>What BMI does not account for includes muscle mass (athletes often score as &quot;overweight&quot; with low body fat), bone density, age (older adults carry more fat at the same BMI), ethnicity (Asian populations face metabolic risk at lower BMI values), sex (women naturally carry 5–10% more essential fat), and body fat distribution (abdominal fat is metabolically riskier than peripheral fat, but BMI provides no information about where fat is stored).</p>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">BMI Calculation: Worked Example</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong>Metric example:</strong> Maria is 168 cm tall and weighs 72 kg.<br />BMI = 72 &divide; (1.68)&sup2; = 72 &divide; 2.8224 = <strong>25.5 &rarr; Overweight</strong></p>
                <p><strong>Imperial example:</strong> Michael is 5&prime;11&Prime; (71 inches) and weighs 185 lbs.<br />BMI = (185 &times; 703) &divide; (71)&sup2; = 130,055 &divide; 5,041 = <strong>25.8 &rarr; Overweight</strong></p>
                <p>However, Michael is a recreational weightlifter with approximately 14% body fat — squarely in the fitness range for men. His BMI of 25.8 reflects muscle mass, not excess fat. A sedentary person at identical height and weight but 28% body fat would score the same 25.8, yet carry meaningfully different health risk. This is BMI&apos;s central limitation: it cannot distinguish between fat mass and lean mass.</p>
                <p>Now consider the reverse: someone at BMI 22 (firmly &quot;normal&quot;) with very little muscle and central abdominal fat. Their BMI looks healthy, but their metabolic risk may be elevated — a phenomenon sometimes called &quot;normal weight obesity&quot; or &quot;skinny fat.&quot; For non-athletic adults, BMI is a useful first-pass screen; for anyone with above-average muscle or unusual fat distribution, body fat percentage and waist circumference provide more complete information.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Key Factors That Affect BMI Interpretation</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong>Age:</strong> BMI thresholds remain constant across adulthood, but body composition shifts substantially with age. Adults over 60 tend to carry more fat and less muscle at the same BMI as younger adults. A BMI of 27 in a 70-year-old carries different clinical implications than in a 30-year-old, and some physicians interpret results more leniently for older patients.</p>
                <p><strong>Sex:</strong> Women naturally store 5–10% more essential fat than men due to hormonal and reproductive physiology. A BMI of 24 typically corresponds to roughly 27–30% body fat in women versus 18–22% in men — a clinically significant difference that BMI entirely obscures behind a single shared scale.</p>
                <p><strong>Ethnicity:</strong> People of South Asian, East Asian, and Southeast Asian descent develop metabolic complications — insulin resistance, cardiovascular risk, type 2 diabetes — at BMI values lower than European populations. The WHO recommends lower action thresholds for Asian adults: 23 for overweight and 27.5 for obese.</p>
                <p><strong>Muscle mass:</strong> Skeletal muscle is denser than adipose tissue. Athletes and consistent strength trainers frequently score as &quot;overweight&quot; by BMI with excellent body composition and low health risk. For this population, body fat percentage is a far more relevant metric.</p>
                <p><strong>Bone density:</strong> Above-average bone mineral density — common in those with a history of impact or resistance exercise — adds body weight without adding fat, inflating BMI without corresponding health risk.</p>
                <p><strong>Pregnancy:</strong> BMI during pregnancy incorporates the weight of the fetus, placenta, amniotic fluid, and expanded blood volume. It is not meaningful during pregnancy; healthy gestational weight gain is guided by pre-pregnancy BMI, not current BMI.</p>
              </div>
            </div>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="3333333333" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
