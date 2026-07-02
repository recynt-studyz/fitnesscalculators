import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — fitnesscalculators.app',
  description: 'Privacy policy for fitnesscalculators.app. We do not collect personal data. All calculations run in your browser.',
  alternates: { canonical: 'https://fitnesscalculators.app/privacy' },
}

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: July 2, 2026</p>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Overview</h2>
              <p className="text-sm leading-relaxed">
                fitnesscalculators.app is committed to your privacy. All calculations on this site run entirely in your browser using JavaScript. We do not collect, transmit, or store any personal health or fitness data you enter into our calculators.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Information we do not collect</h2>
              <ul className="text-sm leading-relaxed space-y-1 list-disc list-inside">
                <li>Height, weight, age, or other physical measurements</li>
                <li>Health conditions or medical history</li>
                <li>Fitness data or workout information</li>
                <li>Menstrual cycle or pregnancy information</li>
                <li>Any personally identifiable information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Local storage</h2>
              <p className="text-sm leading-relaxed">
                To improve your experience, we save your calculator inputs locally in your browser (localStorage). This data never leaves your device and is not accessible to us or any third party. You can clear this data at any time by clearing your browser storage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Cookies and analytics</h2>
              <p className="text-sm leading-relaxed">
                We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to this or other websites. You can opt out of personalized advertising by visiting Google&apos;s Ad Settings. We do not use any analytics services that collect personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Third-party advertising</h2>
              <p className="text-sm leading-relaxed">
                This site displays advertisements served by Google AdSense (publisher ID: ca-pub-8792838105001561). Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visits to our site and other sites on the Internet. For more information about how Google uses data, visit Google&apos;s Privacy & Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Medical disclaimer</h2>
              <p className="text-sm leading-relaxed">
                The calculators on fitnesscalculators.app are for general informational purposes only and do not constitute medical advice. Always consult a qualified healthcare provider before making health, nutrition, or fitness decisions based on any calculator results.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Contact</h2>
              <p className="text-sm leading-relaxed">
                If you have questions about this privacy policy, use the Contact link in the footer to reach us.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
