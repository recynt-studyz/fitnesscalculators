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
              fitnesscalculators.app is a free suite of health and fitness calculators built for anyone who wants accurate, instant answers without signup, ads cluttering the experience, or data being collected.
            </p>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">What we offer</h2>
            <p>
              We provide 13 free fitness calculators including BMI, calorie needs, macro targets, body fat percentage, ideal weight, one rep max, running pace, pregnancy due date, ovulation window, daily water intake, sleep cycles, basal metabolic rate, and total daily energy expenditure.
            </p>
            <p>
              Every calculator uses standard, peer-reviewed formulas: Mifflin-St Jeor for BMR, the US Navy method for body fat, Naegele&apos;s rule for due dates, Epley and Brzycki for 1RM, and established ideal weight formulas (Devine, Hamwi, Robinson, Miller).
            </p>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">Privacy first</h2>
            <p>
              All calculations run entirely in your browser. We do not collect, store, or transmit any of the personal information you enter — your height, weight, health data, and fitness numbers stay on your device. Input values are saved locally in your browser for convenience, but this data never leaves your computer.
            </p>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">A note on accuracy</h2>
            <p>
              Our calculators provide estimates based on validated population-level formulas. Individual results may vary due to factors like body composition, genetics, and medical conditions. These tools are for general informational purposes and should not replace advice from a qualified healthcare provider.
            </p>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">Contact</h2>
            <p>
              Questions or feedback? We welcome it. Use the Contact link in the footer to reach us.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
