import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import WaterIntakeCalculatorWrapper from '@/components/WaterIntakeCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Water Intake Calculator — Daily Water Needs',
  description:
    'Calculate how much water you should drink per day based on weight and activity level. Free water intake calculator in oz, cups, liters and ml.',
  alternates: { canonical: 'https://fitnesscalculators.app/water-intake' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How much water should I drink per day?',
    a: 'A common starting point is half your body weight in ounces per day. For a 160-pound person, that is 80 oz (about 10 cups or 2.4 liters). However, your needs increase with exercise, hot weather, pregnancy, and breastfeeding. The National Academies recommend about 3.7 liters (125 oz) per day for men and 2.7 liters (91 oz) for women from all beverages and food.',
  },
  {
    q: 'Does coffee count toward daily water intake?',
    a: 'Yes — despite the mild diuretic effect of caffeine, coffee and other caffeinated beverages do contribute to your daily fluid intake. The net hydration effect of coffee is positive, not negative. Tea, juice, and other beverages also count. However, plain water is best for optimal hydration, especially during exercise.',
  },
  {
    q: 'How do I know if I am drinking enough water?',
    a: 'The simplest indicator is urine color. Pale yellow to clear urine indicates good hydration. Dark yellow or amber urine typically signals dehydration. Other signs of adequate hydration include moist mouth, regular urination (every 2–4 hours), and absence of headaches, fatigue, or concentrated urine.',
  },
  {
    q: 'Does exercise increase water needs?',
    a: 'Yes, significantly. Sweating during exercise can lead to fluid losses of 0.5–2 liters per hour depending on intensity and temperature. A general guideline is to drink an additional 12 oz of water for every 30 minutes of moderate exercise. Our water intake calculator lets you input your daily exercise time and adjusts your target accordingly.',
  },
  {
    q: 'What are the signs of dehydration?',
    a: 'Early signs of dehydration include thirst, dark urine, and reduced urine frequency. Moderate dehydration causes headache, fatigue, dizziness, and difficulty concentrating. Severe dehydration is a medical emergency with symptoms including rapid heartbeat, rapid breathing, sunken eyes, and confusion. Most people can avoid dehydration by drinking regularly throughout the day rather than waiting until thirsty.',
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
  name: 'Water Intake Calculator',
  url: 'https://fitnesscalculators.app/water-intake',
  description: 'Free daily water intake calculator with results in oz, cups, liters, and ml plus hydration schedule.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Daily Water Intake',
  step: [
    { '@type': 'HowToStep', name: 'Enter your weight', text: 'Input your body weight in pounds or kilograms. The base water recommendation is half your weight in ounces per day.' },
    { '@type': 'HowToStep', name: 'Set your activity and environment', text: 'Select your activity level, climate (temperate or hot/humid), and daily exercise duration. These factors increase your water needs.' },
    { '@type': 'HowToStep', name: 'View your personalized water target', text: 'Your daily water target appears in oz, cups, liters, and ml simultaneously, along with a suggested daily hydration schedule.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function WaterIntakePage() {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">Water Intake Calculator</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Find out exactly how much water you need each day. Personalized for your weight, activity level, and climate. Results in oz, cups, liters, and ml.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111122" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <WaterIntakeCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222233" /></div>
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-300 mb-2">Why proper hydration matters for fitness</h2>
            <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
              Water is involved in nearly every bodily process — digestion, temperature regulation, joint lubrication, nutrient transport, and waste removal. Even mild dehydration (1–2% of body weight) can impair physical and cognitive performance. Staying properly hydrated supports better workouts, faster recovery, clearer thinking, and healthier skin. Use our water intake calculator to find your personalized daily target and the suggested schedule to spread your intake throughout the day. All calculations run entirely in your browser — your data never leaves your device.
            </p>
          </div>
          {/* Depth Content */}
          <div className="space-y-8 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">How the Water Intake Calculator Works</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Daily water needs vary significantly based on body size, activity, and environment. Our calculator uses a body-weight-based baseline formula and applies adjustments for exercise, climate, and other factors:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Base formula:</strong> Body weight in lbs &divide; 2 = ounces of water per day (or body weight in kg &times; 0.033 = liters per day)</li>
                  <li><strong>Exercise adjustment:</strong> Add approximately 12 oz (350 ml) per 30 minutes of moderate-intensity exercise, or up to 24 oz (700 ml) per 30 minutes of vigorous exercise in heat</li>
                  <li><strong>Climate adjustment:</strong> Hot or humid conditions increase sweat loss; add 16–24 oz above the base target</li>
                </ul>
                <p>The widely quoted &quot;8 glasses a day&quot; (64 oz) recommendation is not grounded in controlled research — it originated from a 1945 U.S. Food and Nutrition Board recommendation that was misread as a guideline. The National Academies of Sciences actually recommends approximately <strong>125 oz (3.7 liters) per day total fluid intake for men</strong> and <strong>91 oz (2.7 liters) for women</strong> — including water from food, which contributes 20–30% of daily fluid intake through fruits, vegetables, and other foods.</p>
                <p>Water participates in virtually every biological process. It transports nutrients into cells, removes metabolic waste products, lubricates joints, regulates body temperature through sweating, maintains blood volume for cardiovascular function, and enables digestion. Even mild dehydration — a fluid deficit of just 1–2% of body weight — measurably impairs cognitive performance, mood, physical endurance, and coordination.</p>
                <p>The most practical real-time hydration indicator is urine color. Pale straw yellow indicates adequate hydration. Darker yellow or amber indicates dehydration. Colorless urine may indicate overhydration (not a concern in most adults but relevant in endurance athletes who over-drink during races, risking hyponatremia).</p>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Water Intake: Worked Example</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Marcus weighs 170 lbs (77 kg), exercises for 45 minutes daily, and lives in a hot climate.</p>
                <p><strong>Base water need:</strong> 170 &divide; 2 = <strong>85 oz/day</strong> (2.5 liters)</p>
                <p><strong>Exercise adjustment (45 min):</strong> +18 oz (530 ml)</p>
                <p><strong>Hot climate adjustment:</strong> +16 oz (470 ml)</p>
                <p><strong>Total daily target: &sim;119 oz (3.5 liters)</strong></p>
                <p>Not all of this needs to come from plain water. Marcus&apos; food contributes approximately 20–25 oz (600–750 ml) — particularly from fruits, vegetables, and cooked grains. His remaining fluid target from beverages is approximately 94–99 oz (2.7–2.9 liters), which he could distribute as:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Morning (waking): 16 oz — rehydrates after overnight fluid loss</li>
                  <li>Pre-workout: 16 oz</li>
                  <li>During workout (45 min): 16–24 oz</li>
                  <li>Post-workout recovery: 16 oz</li>
                  <li>Throughout afternoon/evening: remaining 20–25 oz spread across meals and between</li>
                </ul>
                <p>This schedule ensures Marcus stays hydrated before thirst signals appear. Thirst is a late-onset indicator — by the time you feel thirsty, you may already be 1–2% dehydrated.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Key Factors That Affect Your Water Needs</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong>Body weight:</strong> Larger bodies have more total fluid volume to maintain and produce more metabolic heat, requiring more water for temperature regulation. The weight-based formula (lbs &divide; 2 = oz) captures this proportionality — a 240 lb person needs substantially more water than a 120 lb person at the same activity level.</p>
                <p><strong>Exercise intensity and duration:</strong> Sweat rates during exercise range from 0.5 to 2.5 liters per hour depending on intensity, heat, and individual variation. High-intensity outdoor exercise in summer heat produces the highest sweat losses. Weighing yourself before and after a workout gives a precise measure: each pound lost during exercise equals approximately 16 oz of fluid to replace.</p>
                <p><strong>Climate and humidity:</strong> Heat and humidity dramatically increase fluid loss through sweating. High humidity impairs evaporative cooling (sweat doesn&apos;t evaporate as efficiently), so the body sweats more to compensate. Altitude also increases fluid losses through faster, deeper breathing in thinner air.</p>
                <p><strong>Pregnancy and breastfeeding:</strong> Pregnancy increases blood volume and metabolic demands, increasing water needs by 8–10 oz (250–300 ml) per day above baseline. Breastfeeding produces an additional 25–30 oz (750–900 ml) of fluid output daily and requires a corresponding intake increase of approximately 16 oz above pre-pregnancy levels.</p>
                <p><strong>Alcohol and caffeine:</strong> Alcohol is a diuretic — it increases urine output beyond the volume consumed, contributing to net fluid loss. For every alcoholic drink consumed, add 8–12 oz of water to compensate. Caffeine has a mild diuretic effect at high doses, but research shows coffee and tea at typical consumption levels still produce a net positive fluid contribution — the hydration from the beverage outweighs the mild diuresis.</p>
                <p><strong>Illness:</strong> Fever, vomiting, and diarrhea all dramatically increase fluid losses. For every degree Fahrenheit of fever above 98.6&deg;F, the body loses additional fluid through sweating. Gastrointestinal illnesses can cause rapid dehydration, particularly in children and older adults who have reduced thirst sensitivity.</p>
              </div>
            </div>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333344" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
