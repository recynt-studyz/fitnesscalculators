import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import IdealWeightCalculatorWrapper from '@/components/IdealWeightCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Ideal Weight Calculator — Healthy Weight Range',
  description:
    'Calculate your ideal body weight using multiple formulas including Devine, Hamwi, Robinson and Miller. Free ideal weight calculator for men and women.',
  alternates: { canonical: 'https://fitnesscalculators.app/ideal-weight' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How do I calculate my ideal weight?',
    a: 'Ideal weight can be estimated using several formulas based on your height and sex. Common ones include the Devine formula (50kg + 2.3kg per inch over 5 feet for men), Hamwi, Robinson, and Miller formulas. Each was developed from different populations, so they give slightly different results. Our ideal weight calculator shows all four plus the healthy BMI weight range.',
  },
  {
    q: 'Why do different formulas give different results?',
    a: 'Each ideal weight formula was developed by different researchers using different study populations, body frame assumptions, and time periods. The Devine formula (1974) was originally used to calculate medication doses. The Hamwi, Robinson, and Miller formulas were each developed independently. None is definitively "correct" — together they give a range of estimates.',
  },
  {
    q: 'What is more important — ideal weight or body fat?',
    a: 'Body fat percentage is generally a better indicator of health than ideal weight. Two people at the same height and weight can have very different body compositions — one could have high muscle and low fat while another has low muscle and high fat. Body composition matters more than the number on the scale, especially for long-term health.',
  },
  {
    q: 'How does frame size affect ideal weight?',
    a: 'People with larger bone structure (large frame) naturally weigh more at any given height. Conversely, small-framed people may be healthy at a lower weight. Frame size is typically assessed by wrist circumference or elbow breadth. Our ideal weight calculator applies a ±5kg adjustment based on your selected frame size.',
  },
  {
    q: 'Is there one ideal weight for my height?',
    a: 'No — there is a range of healthy weights for any given height. The four-formula consensus range and the healthy BMI weight range (18.5–24.9) both give a spread, not a single number. Your optimal weight within that range depends on your body composition, muscle mass, age, and other individual factors.',
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
  name: 'Ideal Weight Calculator',
  url: 'https://fitnesscalculators.app/ideal-weight',
  description: 'Free ideal weight calculator using Devine, Hamwi, Robinson, and Miller formulas with frame size adjustment.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Find Your Ideal Weight',
  step: [
    { '@type': 'HowToStep', name: 'Enter your height and sex', text: 'Select your unit system and enter your height. Choose male or female — ideal weight formulas differ by sex.' },
    { '@type': 'HowToStep', name: 'Select your frame size', text: 'Choose small, medium, or large frame. This adjusts the results by ±5kg to account for bone structure differences.' },
    { '@type': 'HowToStep', name: 'Review your ideal weight range', text: 'See results from four formulas (Devine, Hamwi, Robinson, Miller) plus the healthy BMI weight range and a consensus recommended range.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function IdealWeightPage() {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">Ideal Weight Calculator</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Find your healthy weight range using four trusted formulas. See results from Devine, Hamwi, Robinson, and Miller adjusted for your frame size.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111117" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <IdealWeightCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222228" /></div>
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">Understanding ideal weight estimates</h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              Ideal weight formulas were developed to provide general guidance on healthy weight ranges based on height and sex. These estimates vary by a few pounds across formulas — which is normal and expected. The consensus range (the spread across all four formulas) gives you a practical target zone. Remember that a number on the scale is just one data point. Body composition, fitness level, and how you feel are equally important indicators of health. All calculations run entirely in your browser — your data never leaves your device.
            </p>
          </div>
          {/* Depth Content */}
          <div className="space-y-8 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">How the Ideal Weight Calculator Works</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Ideal weight formulas estimate a healthy target weight based on height and sex. Our calculator runs four established formulas simultaneously and computes a consensus range from the results. Each formula was developed independently using different populations and assumptions — which is why they give slightly different results.</p>
                <p><strong>The four formulas for men (with inches over 5 feet as the height variable):</strong></p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Hamwi (1964):</strong> 106 lbs + 6 lbs per inch over 5 feet — originally developed for medication dosing calculations</li>
                  <li><strong>Devine (1974):</strong> 50 kg + 2.3 kg per inch over 5 feet — also developed for drug dosing; became widely used in clinical practice</li>
                  <li><strong>Robinson (1983):</strong> 52 kg + 1.9 kg per inch over 5 feet — developed from a population study; tends to produce slightly lower values</li>
                  <li><strong>Miller (1983):</strong> 56.2 kg + 1.41 kg per inch over 5 feet — another population-derived formula</li>
                </ul>
                <p><strong>The four formulas for women:</strong></p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Hamwi:</strong> 100 lbs + 5 lbs per inch over 5 feet</li>
                  <li><strong>Devine:</strong> 45.5 kg + 2.3 kg per inch over 5 feet</li>
                  <li><strong>Robinson:</strong> 49 kg + 1.7 kg per inch over 5 feet</li>
                  <li><strong>Miller:</strong> 53.1 kg + 1.36 kg per inch over 5 feet</li>
                </ul>
                <p>None of these formulas is definitively &quot;correct.&quot; They were developed before modern body composition science and do not account for muscle mass, body fat distribution, or individual health markers. Together they define a useful reference range — not a single target number. The healthy BMI weight range (BMI 18.5–24.9) is also shown for additional context.</p>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Ideal Weight: Worked Example</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>For a <strong>5&prime;10&Prime; male</strong> (10 inches over 5 feet), the four formulas produce:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Hamwi:</strong> 106 + (6 &times; 10) = 166 lbs (75.3 kg)</li>
                  <li><strong>Devine:</strong> 50 + (2.3 &times; 10) = 73 kg = 161 lbs</li>
                  <li><strong>Robinson:</strong> 52 + (1.9 &times; 10) = 71 kg = 156.5 lbs</li>
                  <li><strong>Miller:</strong> 56.2 + (1.41 &times; 10) = 70.3 kg = 155 lbs</li>
                </ul>
                <p><strong>Consensus ideal weight range: approximately 155–166 lbs</strong></p>
                <p>The BMI-based healthy weight range for the same height (18.5–24.9): <strong>129–173 lbs</strong> — a much wider band than the formula consensus.</p>
                <p>This spread illustrates why ideal weight is a range, not a point. A 5&prime;10&Prime; man at 155 lbs and another at 166 lbs are both within the ideal weight consensus — but one might be lightly built with modest muscle and the other well-muscled with a medium frame. Both can be equally healthy. The formulas give you a starting reference, not a prescription.</p>
                <p>Adding the frame size adjustment (&plusmn;5 kg / &plusmn;11 lbs) shifts the consensus range upward for large-framed individuals and downward for small-framed individuals, reflecting real differences in bone structure and lean tissue that affect healthy body weight.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Key Factors That Affect Your Ideal Weight</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong>Frame size:</strong> Bone structure varies significantly between individuals of the same height. A large-framed person has greater skeletal mass and naturally weighs more at any height — and can maintain a healthy body composition at weights above the standard formula results. Frame size is commonly estimated from wrist circumference or elbow breadth.</p>
                <p><strong>Muscle mass:</strong> The ideal weight formulas were developed before modern strength sports and recreational fitness culture. A well-muscled person may healthily weigh 10–20 lbs more than the formula consensus at the same height — all as lean mass. Body fat percentage is a more meaningful metric for this population than ideal weight estimates.</p>
                <p><strong>Age:</strong> Body composition shifts with age — lean mass decreases and fat mass tends to increase even when total weight stays constant. Older adults may be healthy at weights that fall slightly above the formula consensus, while maintaining the same body weight as their younger years may actually reflect loss of lean tissue.</p>
                <p><strong>Sex:</strong> The formulas produce different results for men and women at the same height because women naturally carry more essential body fat and tend to have less skeletal muscle mass. The constants in each formula (e.g., 106 lbs vs. 100 lbs base for Hamwi) reflect these biological differences.</p>
                <p><strong>Ethnicity:</strong> Like BMI, ideal weight formulas were developed primarily from European and American populations. People of Asian descent tend to have higher body fat at the same weight than people of European descent — meaning that for some ethnic groups, the lower end of the formula range may be a more appropriate target.</p>
                <p><strong>Personal health goals:</strong> Ideal weight estimates are reference points, not rigid targets. Your optimal weight is ultimately defined by healthy biomarkers (blood pressure, blood glucose, lipids), physical performance, and how you feel — not by matching a formula result exactly.</p>
              </div>
            </div>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333339" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
