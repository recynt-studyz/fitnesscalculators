import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import CalorieCalculatorWrapper from '@/components/CalorieCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Calorie Calculator — Daily Calorie Needs Calculator',
  description:
    'Calculate your daily calorie needs based on age, weight, height and activity level. Free calorie calculator for weight loss, maintenance and muscle gain.',
  alternates: { canonical: 'https://fitnesscalculators.app/calories' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How many calories should I eat per day?',
    a: 'Your daily calorie needs depend on your age, sex, height, weight, and activity level. Most adults need between 1,600 and 3,000 calories per day. Our calorie calculator uses the Mifflin-St Jeor equation — the most accurate formula available — to estimate your specific needs.',
  },
  {
    q: 'How do I calculate my calorie deficit?',
    a: 'A calorie deficit means eating fewer calories than you burn. To lose approximately 1 pound per week, eat 500 fewer calories than your TDEE (total daily energy expenditure). For 0.5 lbs/week, cut 250 calories. For 2 lbs/week, cut 1,000 — though going below 1,200 calories (women) or 1,500 calories (men) is not recommended without medical supervision.',
  },
  {
    q: 'How many calories do I need to lose weight?',
    a: 'To lose weight, you need to eat fewer calories than you burn. Most people see results eating their TDEE minus 300–500 calories per day. This creates a sustainable deficit without triggering excessive hunger or muscle loss. Aim for slow, steady loss of 0.5–1 pound per week.',
  },
  {
    q: 'What happens if I eat too few calories?',
    a: 'Severe calorie restriction can cause muscle loss, nutritional deficiencies, fatigue, hormonal disruption, and a slowdown in metabolism. This makes it harder to maintain weight loss long-term. Most health experts recommend never going below 1,200 calories for women or 1,500 for men without medical guidance.',
  },
  {
    q: 'How accurate are calorie calculators?',
    a: 'Calorie calculators provide good estimates, typically within 10–15% of your actual needs. They use validated equations like Mifflin-St Jeor, but individual variation in metabolism exists. Track your weight for 2–3 weeks after starting, then adjust your calorie target up or down by 100–200 calories based on actual results.',
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
  name: 'Calorie Calculator',
  url: 'https://fitnesscalculators.app/calories',
  description: 'Free calorie calculator for daily calorie needs based on TDEE with goal-based recommendations.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Daily Calorie Needs',
  step: [
    { '@type': 'HowToStep', name: 'Enter your stats', text: 'Input your age, sex, height, weight, and activity level. The calculator uses these to compute your BMR and TDEE using the Mifflin-St Jeor equation.' },
    { '@type': 'HowToStep', name: 'Select your goal', text: 'Choose whether you want to lose weight, maintain, or gain muscle. If losing, select your preferred rate of loss.' },
    { '@type': 'HowToStep', name: 'Review your calorie targets', text: 'Your TDEE (maintenance calories) and goal-specific calorie target appear instantly, along with six scenario cards showing different rates of loss and gain.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function CaloriesPage() {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Free Calorie Calculator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your daily calorie needs for weight loss, maintenance, or muscle gain. Based on the Mifflin-St Jeor equation. Instant results.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111112" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <CalorieCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222223" /></div>
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">
              Why use a calorie calculator?
            </h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              A calorie calculator takes the guesswork out of nutrition planning. By calculating your TDEE (Total Daily Energy Expenditure), you get a personalized starting point for your calorie target. Whether your goal is fat loss, maintaining your current weight, or building muscle, knowing your calorie needs is the foundation of any successful nutrition plan. All calculations run entirely in your browser — your data never leaves your device.
            </p>
          </div>
          {/* Depth Content */}
          <div className="space-y-8 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">How the Calorie Calculator Works</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>A food calorie (kilocalorie) is the amount of energy needed to raise one kilogram of water by one degree Celsius. Your body uses this energy to power every biological process — from heartbeat and breathing to digestion, movement, and cell repair. Consuming more calories than you expend leads to weight gain; consuming fewer leads to weight loss.</p>
                <p>Our calculator uses the <strong>Mifflin-St Jeor equation</strong> — the most widely validated formula for predicting resting metabolic rate in modern populations — to calculate your Basal Metabolic Rate (BMR):</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Men:</strong> BMR = (10 &times; weight kg) + (6.25 &times; height cm) &minus; (5 &times; age) + 5</li>
                  <li><strong>Women:</strong> BMR = (10 &times; weight kg) + (6.25 &times; height cm) &minus; (5 &times; age) &minus; 161</li>
                </ul>
                <p>BMR is then multiplied by an activity factor to calculate your Total Daily Energy Expenditure (TDEE) — what you actually burn across a full day:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Sedentary (desk job, minimal movement): BMR &times; 1.2</li>
                  <li>Lightly active (light exercise 1–3 days/week): BMR &times; 1.375</li>
                  <li>Moderately active (exercise 3–5 days/week): BMR &times; 1.55</li>
                  <li>Very active (hard exercise 6–7 days/week): BMR &times; 1.725</li>
                  <li>Extremely active (physical job + daily training): BMR &times; 1.9</li>
                </ul>
                <p>Mifflin-St Jeor is preferred over the older Harris-Benedict formula (1919) because it was derived from a modern population and consistently outperforms it in validation studies — a 2005 meta-analysis found it accurate within 10% for the largest proportion of subjects. The Harris-Benedict formula, developed from a much smaller and less representative dataset, tends to overestimate BMR slightly.</p>
                <p>A <strong>caloric deficit</strong> means eating fewer calories than your TDEE, forcing your body to draw on stored fat for energy. A cumulative deficit of ~3,500 calories corresponds to approximately one pound of fat lost. A <strong>caloric surplus</strong> above TDEE provides energy for muscle protein synthesis and weight gain during a bulk.</p>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Calorie Calculation: Worked Example</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Sarah is 32 years old, 5&prime;5&Prime; (165 cm), weighs 140 lbs (63.5 kg), and exercises 3–4 days per week (moderately active).</p>
                <p><strong>Step 1 — Calculate BMR:</strong><br />BMR = (10 &times; 63.5) + (6.25 &times; 165) &minus; (5 &times; 32) &minus; 161<br />= 635 + 1,031 &minus; 160 &minus; 161 = <strong>1,345 calories/day</strong></p>
                <p><strong>Step 2 — Apply activity multiplier (moderately active &times; 1.55):</strong><br />TDEE = 1,345 &times; 1.55 = <strong>2,085 calories/day</strong></p>
                <p><strong>Step 3 — Set goal-based targets:</strong></p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Maintain weight: 2,085 cal/day</li>
                  <li>Lose 0.5 lb/week (&minus;250 cal/day deficit): 1,835 cal/day</li>
                  <li>Lose 1 lb/week (&minus;500 cal/day deficit): 1,585 cal/day</li>
                  <li>Gain 0.5 lb/week (+250 cal/day surplus): 2,335 cal/day</li>
                </ul>
                <p>At 1,585 calories/day, Sarah should prioritize protein intake — at least 100–125g/day — to preserve lean muscle during the deficit. If weight doesn&apos;t decrease after 2–3 weeks of consistent tracking, her actual TDEE is lower than estimated (a common finding due to overestimated activity level), and she should reduce intake by 100–150 calories and monitor again.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Key Factors That Affect Your Calorie Needs</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong>Age:</strong> Metabolic rate declines roughly 1–2% per decade after age 20, driven by the progressive loss of lean muscle mass. A 50-year-old has meaningfully lower calorie needs than a 25-year-old of identical height, weight, and activity — the Mifflin-St Jeor formula captures this through its age coefficient.</p>
                <p><strong>Sex:</strong> Men average 5–10% higher BMR than women of the same body weight, primarily due to greater muscle mass and lower essential body fat percentage. The formula accounts for this with the +5 (men) versus &minus;161 (women) constant.</p>
                <p><strong>Height and weight:</strong> Larger bodies require more energy to sustain. Both height and weight are the largest direct contributors to BMR — a taller, heavier person will always have a higher resting calorie burn than a shorter, lighter person of the same age and sex.</p>
                <p><strong>Activity level:</strong> The activity multiplier is the most consequential and most frequently misestimated variable. Someone who exercises four times per week but otherwise sits all day is &quot;lightly active&quot; (×1.375), not &quot;moderately active&quot; (×1.55). Overestimating activity is one of the most common reasons calorie targets fail to produce expected results.</p>
                <p><strong>Muscle mass:</strong> Muscle tissue burns approximately 6–7 more calories per pound at rest than fat tissue. Each pound of muscle gained slightly increases TDEE — which is why resistance training benefits long-term weight management beyond the calories burned during individual workouts.</p>
                <p><strong>Metabolic adaptation:</strong> During prolonged calorie restriction, the body reduces energy expenditure through hormonal changes — decreased leptin, lowered thyroid output, and suppressed non-exercise activity thermogenesis (NEAT). Fat loss typically plateaus after 8–12 weeks, requiring a recalculated TDEE and adjusted targets.</p>
                <p><strong>Thermic effect of food:</strong> Digesting food burns roughly 10% of total calorie intake. Protein carries the highest thermic effect (20–30%), meaning your body expends significantly more energy processing protein than fats (0–3%) or carbohydrates (5–10%) — one reason high-protein diets provide a modest metabolic advantage.</p>
              </div>
            </div>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333334" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
