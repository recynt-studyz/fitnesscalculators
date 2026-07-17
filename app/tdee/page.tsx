import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import TDEECalculatorWrapper from '@/components/TDEECalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'TDEE Calculator — Total Daily Energy Expenditure',
  description:
    'Calculate your total daily energy expenditure based on activity level. Free TDEE calculator with calorie targets for weight loss, maintenance and muscle gain.',
  alternates: { canonical: 'https://fitnesscalculators.app/tdee' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is TDEE?',
    a: 'TDEE stands for Total Daily Energy Expenditure — the total number of calories you burn in a day, including all physical activity on top of your resting metabolism (BMR). It is the number you should base your calorie intake on when setting nutrition goals.',
  },
  {
    q: 'How do I calculate my TDEE?',
    a: 'TDEE is calculated by multiplying your BMR (Basal Metabolic Rate) by an activity multiplier: Sedentary (×1.2), Lightly Active (×1.375), Moderately Active (×1.55), Very Active (×1.725), or Extra Active (×1.9). Our TDEE calculator does this automatically using the Mifflin-St Jeor BMR equation.',
  },
  {
    q: 'What is the difference between TDEE and BMR?',
    a: 'BMR is the calories you burn at complete rest — just to stay alive. TDEE adds the calories burned through all daily movement and exercise on top of your BMR. Most people burn 20–100% more calories than their BMR when accounting for activity. TDEE is the practical number for dietary planning.',
  },
  {
    q: 'How accurate is TDEE?',
    a: 'TDEE calculators are accurate to within roughly 10–15% for most people. The activity level is the biggest variable — people often overestimate their activity. If your weight is not changing as expected, adjust your estimated TDEE by 100–200 calories in the appropriate direction based on 2–3 weeks of tracking results.',
  },
  {
    q: 'How do I use TDEE to lose weight?',
    a: 'To lose weight, eat fewer calories than your TDEE. A 500 calorie deficit per day leads to approximately 1 pound of fat loss per week. A 250 calorie deficit results in about 0.5 lbs/week — slower but easier to sustain. Avoid deficits larger than 1,000 calories/day as this can cause muscle loss and metabolic adaptation.',
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
  name: 'TDEE Calculator',
  url: 'https://fitnesscalculators.app/tdee',
  description: 'Free TDEE calculator with goal-based calorie targets for weight loss, maintenance, and muscle gain.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your TDEE',
  step: [
    { '@type': 'HowToStep', name: 'Enter your measurements', text: 'Input your age, sex, height, and weight using your preferred unit system.' },
    { '@type': 'HowToStep', name: 'Select your activity level', text: 'Choose the activity level that best represents your typical week — from sedentary to extra active.' },
    { '@type': 'HowToStep', name: 'View your TDEE and calorie targets', text: 'Your total daily energy expenditure appears instantly, along with goal-based calorie recommendations for different rates of weight loss and gain.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function TDEEPage() {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">TDEE Calculator</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your total daily energy expenditure and get personalized calorie targets for your fitness goal.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111116" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <TDEECalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222227" /></div>
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">TDEE: the starting point for every nutrition goal</h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              Your TDEE is the most important number in nutrition planning. Eat at your TDEE and your weight stays stable. Eat below it and you lose weight. Eat above it and you gain weight. The accuracy of your TDEE determines how well your plan works — which is why using a validated formula like Mifflin-St Jeor and being honest about your activity level is critical. Start with our estimate, track your results for 2–3 weeks, and adjust as needed. All calculations run entirely in your browser — your data never leaves your device.
            </p>
          </div>
          {/* Depth Content */}
          <div className="space-y-8 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">How the TDEE Calculator Works</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a 24-hour period across all activities. It is calculated by multiplying your Basal Metabolic Rate (BMR) by an activity multiplier that accounts for movement above complete rest.</p>
                <p>TDEE is made up of four distinct components:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>BMR (60–75% of TDEE):</strong> Energy burned at complete rest — breathing, circulation, organ function, temperature regulation</li>
                  <li><strong>Thermic effect of food — TEF (roughly 10%):</strong> Calories burned digesting, absorbing, and metabolizing food; protein has the highest TEF (20–30%), fat the lowest (0–3%)</li>
                  <li><strong>Exercise activity thermogenesis — EAT (5–15%):</strong> Calories burned during deliberate structured exercise sessions</li>
                  <li><strong>Non-exercise activity thermogenesis — NEAT (varies widely):</strong> All movement that is not deliberate exercise — walking, fidgeting, standing, housework, gesturing while talking</li>
                </ul>
                <p>NEAT is the most variable component of TDEE and the most underappreciated. Research by Dr. James Levine at the Mayo Clinic found that NEAT can vary by up to 2,000 calories per day between two people of similar size. A naturally fidgety person who walks throughout their day may burn 800–1,500 more calories daily than a sedentary person of identical weight — without a single gym session. This is one reason why some people seem to &quot;not gain weight no matter what they eat&quot; while others gain easily at the same intake.</p>
                <p>The activity multipliers applied to BMR are:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Sedentary (desk job, little movement): &times; 1.2</li>
                  <li>Lightly active (1–3 exercise sessions/week): &times; 1.375</li>
                  <li>Moderately active (3–5 sessions/week): &times; 1.55</li>
                  <li>Very active (6–7 sessions/week): &times; 1.725</li>
                  <li>Extremely active (physical job + daily training): &times; 1.9</li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">TDEE Calculation: Worked Example</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Consider two versions of the same person: a 35-year-old man, 5&prime;10&Prime; (178 cm), 180 lbs (81.6 kg).</p>
                <p><strong>BMR (Mifflin-St Jeor):</strong><br />= (10 &times; 81.6) + (6.25 &times; 178) &minus; (5 &times; 35) + 5<br />= 816 + 1,112.5 &minus; 175 + 5 = <strong>1,758 calories/day</strong></p>
                <p><strong>Version A — Sedentary office worker:</strong><br />TDEE = 1,758 &times; 1.2 = <strong>2,110 calories/day</strong></p>
                <p><strong>Version B — Very active (trains 6 days/week):</strong><br />TDEE = 1,758 &times; 1.725 = <strong>3,032 calories/day</strong></p>
                <p>The difference is <strong>922 calories/day</strong> — nearly a full extra meal. If the sedentary version adopts the active person&apos;s calorie intake without changing his activity, he gains roughly one pound of fat every four days. This is why &quot;eat less, move more&quot; works: increasing TDEE while maintaining intake creates a natural deficit without eating less.</p>
                <p>A construction worker performing heavy manual labor all day may hit TDEE &times; 1.9, while a software engineer who works out 5 days per week but sits 10 hours otherwise is closer to &times; 1.55. Correctly identifying your activity level is the single most important input in any TDEE calculator.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Key Factors That Affect Your TDEE</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong>Activity level accuracy:</strong> Most people overestimate how active they are. The activity multiplier is the largest variable in your TDEE calculation. If your weight isn&apos;t moving as expected after 2–3 weeks of consistent tracking, try dropping one activity level and see whether results improve before changing your diet.</p>
                <p><strong>NEAT (non-exercise activity thermogenesis):</strong> This includes every calorie burned outside of structured exercise — walking to meetings, taking stairs, fidgeting, doing household tasks. NEAT is highly individual and largely subconscious. It also suppresses during caloric restriction (a metabolic adaptation), which is one reason fat loss slows even when food intake stays constant.</p>
                <p><strong>Metabolic adaptation during dieting:</strong> Sustained caloric restriction triggers hormonal changes that reduce TDEE independent of activity level. Leptin drops, thyroid output decreases, and NEAT unconsciously declines. After 8–12 weeks in a deficit, TDEE may be 10–15% lower than the original calculation — requiring recalculation and target adjustment.</p>
                <p><strong>Muscle mass:</strong> More lean mass means higher BMR and therefore higher TDEE at every activity level. Resistance training builds muscle that persistently raises TDEE over time — making it one of the most effective long-term strategies for maintaining a higher calorie budget.</p>
                <p><strong>Age-related decline:</strong> TDEE decreases with age as both BMR declines and lifestyle activity tends to reduce. A 60-year-old has a significantly lower TDEE than they did at 30, even with identical exercise habits — primarily because of lower BMR driven by lean mass loss. Strength training throughout life partially offsets this effect.</p>
              </div>
            </div>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333338" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
