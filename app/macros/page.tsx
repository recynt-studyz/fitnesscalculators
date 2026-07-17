import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import MacroCalculatorWrapper from '@/components/MacroCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Macro Calculator — Protein Carbs Fat Calculator',
  description:
    'Calculate your daily protein, carbs and fat targets based on your goals. Free macro calculator for weight loss, muscle gain and maintenance.',
  alternates: { canonical: 'https://fitnesscalculators.app/macros' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What are macros?',
    a: 'Macros (macronutrients) are the three main nutrients your body uses for energy: protein, carbohydrates, and fat. Protein provides 4 calories per gram, carbs provide 4 calories per gram, and fat provides 9 calories per gram. Tracking your macros helps ensure you get the right balance for your specific fitness goal.',
  },
  {
    q: 'How much protein do I need per day?',
    a: 'Most fitness experts recommend 0.7–1 gram of protein per pound of body weight per day. If you are actively building muscle or in a calorie deficit, aim for the higher end (0.8–1g/lb) to preserve lean mass. Athletes may benefit from slightly more. Our macro calculator ensures your protein target meets this minimum.',
  },
  {
    q: 'What is a good macro split for weight loss?',
    a: 'A balanced macro split for weight loss is typically 30–40% protein, 30–40% carbs, and 20–30% fat. Higher protein helps preserve muscle mass while in a deficit. Some people do well with a lower-carb approach (35% protein, 45% fat, 20% carbs). Our calculator lets you choose from Balanced, Low Carb, High Protein, or Keto splits.',
  },
  {
    q: 'How do I track my macros?',
    a: 'The easiest way to track macros is using a food logging app where you log every meal and scan barcodes. Start by hitting your protein goal first, then fill in carbs and fat. Weigh food in grams for accuracy. After 2–3 weeks of tracking, many people develop a good intuitive sense of macro content.',
  },
  {
    q: 'What is the difference between macros and calories?',
    a: 'Calories represent total energy intake, while macros describe where those calories come from. You can hit your calorie goal but eat poor quality macros (too little protein, too much fat) and see suboptimal results. Tracking both gives you a more complete picture of your nutrition and helps you optimize body composition, not just weight.',
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
  name: 'Macro Calculator',
  url: 'https://fitnesscalculators.app/macros',
  description: 'Free macro calculator for daily protein, carbs, and fat targets with visual pie chart and per-meal breakdown.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Macros',
  step: [
    { '@type': 'HowToStep', name: 'Enter your stats and goal', text: 'Input your age, sex, height, weight, activity level, and fitness goal (lose fat, maintain, or build muscle).' },
    { '@type': 'HowToStep', name: 'Choose your diet style', text: 'Select from Balanced, Low Carb, High Protein, or Keto to customize your macro split to match your preferred eating style.' },
    { '@type': 'HowToStep', name: 'View your daily and per-meal targets', text: 'Your protein, carbs, and fat targets in grams and calories appear instantly, along with a visual pie chart and per-meal breakdown.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function MacrosPage() {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">Free Macro Calculator</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your ideal protein, carbs, and fat targets. Choose your diet style and see your macros broken down by meal.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111113" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <MacroCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222224" /></div>
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">Why track macros instead of just calories?</h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              Tracking macros gives you more control over your body composition than counting calories alone. By ensuring adequate protein intake, you preserve muscle while losing fat. Adjusting carbs helps manage energy levels and cravings. Setting fat targets supports hormonal health. The right macro balance depends on your goals — our macro calculator personalizes your targets based on your stats and chosen diet style. All calculations run entirely in your browser — your data never leaves your device.
            </p>
          </div>
          {/* Depth Content */}
          <div className="space-y-8 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">How the Macro Calculator Works</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Macronutrients — protein, carbohydrates, and fat — are the three nutrients that provide your body with energy. Unlike micronutrients (vitamins and minerals), which are needed in small quantities for specific biological processes, macronutrients are consumed in large amounts and directly supply the calories your body runs on.</p>
                <p>Each macronutrient provides a fixed caloric value per gram:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Protein — 4 calories per gram:</strong> Builds and repairs muscle tissue, synthesizes enzymes and hormones, supports immune function, and is the least efficiently stored macronutrient</li>
                  <li><strong>Carbohydrates — 4 calories per gram:</strong> The body&apos;s preferred fuel source, especially during high-intensity exercise; stored as glycogen in muscles and the liver for rapid energy access</li>
                  <li><strong>Fat — 9 calories per gram:</strong> Essential for hormone production, absorption of fat-soluble vitamins (A, D, E, K), cell membrane integrity, and providing a sustained energy source</li>
                </ul>
                <p>Macro targets are calculated by allocating your daily calorie target (TDEE) across the three macronutrients according to your chosen ratio. Common distributions:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Balanced (30% protein / 40% carbs / 30% fat):</strong> Suitable for general fitness and body recomposition</li>
                  <li><strong>Low Carb (40% protein / 20% carbs / 40% fat):</strong> Reduces insulin response; useful for fat loss without full ketosis</li>
                  <li><strong>High Protein (40% protein / 30% carbs / 30% fat):</strong> Optimal for muscle building or fat loss where preserving lean mass is the priority</li>
                  <li><strong>Keto (&sim;25% protein / 5% carbs / 70% fat):</strong> Designed to induce ketosis; the most restrictive approach requiring strict carbohydrate limits</li>
                </ul>
                <p>Protein is the most critical macro to optimize. Research consistently shows that consuming 0.7–1 gram of protein per pound of body weight (1.6–2.2 g/kg) during a caloric deficit dramatically reduces lean mass loss compared to lower protein intakes. Without adequate protein, a significant portion of weight lost comes from muscle — a poor body composition outcome that also lowers TDEE over time.</p>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Macro Calculation: Worked Example</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>James is targeting fat loss at 1,800 calories/day. He chooses a 40% protein / 30% carb / 30% fat split to maximize muscle retention.</p>
                <p><strong>Protein (40% of 1,800 = 720 calories):</strong><br />720 &divide; 4 = <strong>180g protein/day</strong></p>
                <p><strong>Carbohydrates (30% of 1,800 = 540 calories):</strong><br />540 &divide; 4 = <strong>135g carbs/day</strong></p>
                <p><strong>Fat (30% of 1,800 = 540 calories):</strong><br />540 &divide; 9 = <strong>60g fat/day</strong></p>
                <p>To hit these targets with real food, James might structure his day as:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Breakfast: 5 egg whites + 2 whole eggs + 1 slice whole grain toast &rarr; ~35g protein, 15g carbs, 10g fat</li>
                  <li>Lunch: 6 oz grilled chicken breast + &frac12; cup brown rice + salad &rarr; ~50g protein, 35g carbs, 6g fat</li>
                  <li>Pre-workout: 170g Greek yogurt + 1 banana &rarr; ~17g protein, 40g carbs, 0g fat</li>
                  <li>Dinner: 6 oz salmon + roasted vegetables + &frac12; sweet potato &rarr; ~40g protein, 30g carbs, 20g fat</li>
                  <li>Evening: 150g cottage cheese + small handful almonds &rarr; ~25g protein, 8g carbs, 14g fat</li>
                </ul>
                <p>That totals roughly 167g protein, 128g carbs, and 50g fat — close to his targets. Weighing food in grams on a kitchen scale significantly improves accuracy over estimating portions by eye.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Key Factors That Affect Your Macro Targets</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong>Goal alignment:</strong> Your macro split should reflect your primary objective. Fat loss benefits from higher protein to preserve muscle. Muscle building benefits from adequate carbohydrates to fuel training sessions and support protein synthesis. Maintenance allows the most flexibility across distributions.</p>
                <p><strong>Training type:</strong> Endurance athletes deplete glycogen stores and need higher carbohydrate intake to perform and recover. Strength and power athletes benefit from moderate carbs timed around training. General fitness allows flexible distribution across the day.</p>
                <p><strong>Protein for muscle preservation:</strong> During any caloric deficit, protein intake below 0.7g per pound of bodyweight substantially increases lean mass loss. Maintaining — or even slightly increasing — protein intake while in a deficit is the most evidence-supported strategy for improving body composition while losing weight.</p>
                <p><strong>Carbohydrate timing:</strong> Consuming 20–40g of carbohydrates before resistance training supports performance, while 30–60g post-workout accelerates glycogen resynthesis and recovery. Total daily carb intake matters more than timing for most recreational exercisers, but timing becomes more important at higher training volumes.</p>
                <p><strong>Fat quality:</strong> Within your fat target, prioritize unsaturated fats — olive oil, avocado, nuts, seeds, and fatty fish. These support cardiovascular health and hormone production. Limit saturated fat and avoid trans fats from partially hydrogenated oils regardless of your total fat intake target.</p>
              </div>
            </div>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333335" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
