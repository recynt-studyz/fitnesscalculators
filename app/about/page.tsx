import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About — fitnesscalculators.app',
  description: 'About fitnesscalculators.app — free online fitness and health calculators including BMI, calories, macros, body fat, and more.',
  alternates: { canonical: 'https://fitnesscalculators.app/about' },
}

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-cover bg-center bg-no-repeat min-h-[200px]" style={{ backgroundImage: "url('/herobgfc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10">
          <ToolHeader />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <main className="bg-white dark:bg-[#0f172a] flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About fitnesscalculators.app</h1>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-5 text-gray-700 dark:text-gray-300">
            <p>
              fitnesscalculators.app is a free suite of health and fitness calculators built for anyone who wants accurate, instant answers without creating an account, without their health data being collected, and without having to wade through cluttered, slow pages to get a result.
            </p>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">Why we built this</h2>
            <p>
              Most fitness calculator sites are slow, ad-heavy, and require you to hand over personal information before showing a result. We built fitnesscalculators.app on the opposite principle: your data belongs to you, results should be instant, and a useful health tool should not cost anything to access.
            </p>
            <p>
              Every calculator on this site runs entirely in your browser. Nothing you enter — your weight, height, age, health history, or fitness data — ever leaves your device. There are no user accounts, no data collection, no tracking of your personal inputs. Input values are saved locally in your browser for convenience so you don&apos;t have to re-enter them on your next visit, but this storage is on your device only, not on our servers.
            </p>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">Our 13 free fitness calculators</h2>
            <p>
              We cover the full spectrum of fitness and health calculation needs:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong>BMI Calculator:</strong> Body mass index with visual scale, category breakdown, and healthy weight range</li>
              <li><strong>Calorie Calculator:</strong> Daily calorie needs using Mifflin-St Jeor with six goal-based scenario cards</li>
              <li><strong>Macro Calculator:</strong> Protein, carbs, and fat targets with diet style options and per-meal breakdown</li>
              <li><strong>Body Fat Calculator:</strong> US Navy circumference method with fat mass and lean mass output</li>
              <li><strong>Ideal Weight Calculator:</strong> Four formulas (Devine, Hamwi, Robinson, Miller) with frame size adjustment</li>
              <li><strong>One Rep Max Calculator:</strong> Epley and Brzycki formulas with full percentage-based training table</li>
              <li><strong>Running Pace Calculator:</strong> Three modes — pace, finish time, and distance — with race time predictions</li>
              <li><strong>Pregnancy Due Date Calculator:</strong> Four calculation methods with trimester breakdown and milestone dates</li>
              <li><strong>Ovulation Calculator:</strong> Fertile window with color-coded calendar view for up to 3 cycles</li>
              <li><strong>Water Intake Calculator:</strong> Daily hydration target in oz, cups, liters, and ml with schedule</li>
              <li><strong>Sleep Calculator:</strong> Cycle-based bedtime and wake suggestions aligned to 90-minute sleep stages</li>
              <li><strong>BMR Calculator:</strong> Mifflin-St Jeor and Harris-Benedict comparison with activity level table</li>
              <li><strong>TDEE Calculator:</strong> Total daily energy expenditure with goal-based calorie targets</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">Evidence-based formulas</h2>
            <p>
              Every calculator uses formulas from peer-reviewed research and established clinical guidelines. We use Mifflin-St Jeor (1990) for BMR — the formula validated as most accurate for modern populations in a 2005 meta-analysis. We use the US Navy circumference method for body fat, validated against hydrostatic weighing. We use Naegele&apos;s rule for pregnancy dating, Epley and Brzycki for 1RM estimation, and the Devine, Hamwi, Robinson, and Miller formulas for ideal weight — each developed from independent clinical populations.
            </p>
            <p>
              We display results from multiple formulas where relevant (BMR, ideal weight, 1RM) to show the spread of estimates rather than presenting a single number as definitive. Honest uncertainty is more useful than false precision.
            </p>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">Who uses fitnesscalculators.app</h2>
            <p>
              Our tools are designed to serve a broad audience with varying needs:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong>Beginners</strong> starting a fitness journey who need straightforward starting points for calorie targets, BMI, and healthy weight ranges</li>
              <li><strong>Recreational athletes</strong> looking to optimize training loads using 1RM percentages, running paces, and macro targets</li>
              <li><strong>Personal trainers and coaches</strong> who need a fast, reliable reference to share with clients without requiring accounts or subscriptions</li>
              <li><strong>Healthcare professionals</strong> who want a clean, formula-transparent tool to show patients how estimates like BMI and ideal weight are calculated</li>
              <li><strong>Pregnant individuals and those trying to conceive</strong> who need accurate timeline and fertility window estimates in a private, no-login environment</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">Imperial and metric support</h2>
            <p>
              Every calculator on the site fully supports both imperial and metric units. A toggle at the top of each calculator switches between unit systems instantly, with all values converting automatically. Your preferred unit system is saved locally so it persists across visits. We built dual-unit support from the ground up rather than as an afterthought because fitness data is genuinely international — some people think in pounds and miles, others in kilograms and kilometers, and many use both depending on context.
            </p>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">A note on accuracy and medical use</h2>
            <p>
              Our calculators provide estimates based on validated population-level formulas. Individual results vary due to body composition, genetics, medical conditions, measurement accuracy, and the inherent limitations of any predictive formula applied to a single person. These tools are for general informational and educational purposes only.
            </p>
            <p>
              They are not medical devices and do not constitute medical advice. Always consult a qualified healthcare provider before making significant health, nutrition, or fitness decisions — particularly if you have an existing medical condition, are pregnant, or are under medical supervision.
            </p>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">Contact</h2>
            <p>
              Questions, feedback, or formula corrections? We take accuracy seriously and welcome input. Use the Contact link in the footer to reach us.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
