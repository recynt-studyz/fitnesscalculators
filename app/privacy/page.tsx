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
                fitnesscalculators.app is built on a simple privacy principle: your health data belongs to you. All calculations on this site run entirely in your browser using JavaScript. We do not collect, transmit, or store any personal health or fitness data you enter into our calculators — not on our servers, not in any database, not anywhere outside your own device.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Information we do not collect</h2>
              <p className="text-sm leading-relaxed mb-2">The following types of personal data are never transmitted to any server:</p>
              <ul className="text-sm leading-relaxed space-y-1 list-disc list-inside">
                <li>Height, weight, age, or other physical measurements</li>
                <li>Health conditions, diagnoses, or medical history</li>
                <li>Fitness data, workout logs, or training information</li>
                <li>Menstrual cycle, ovulation, or pregnancy information</li>
                <li>Calorie intake, macronutrient targets, or dietary information</li>
                <li>Any personally identifiable information (name, email, location)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Local storage (browser only)</h2>
              <p className="text-sm leading-relaxed">
                To improve your experience, we save your calculator inputs locally in your browser using the Web Storage API (localStorage). This allows your values to persist between visits so you don&apos;t have to re-enter them. This data is stored exclusively on your device — it is not accessible to us, not transmitted over the network, and not accessible to any third party. You can clear this data at any time by clearing your browser&apos;s site data or local storage in your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Analytics</h2>
              <p className="text-sm leading-relaxed">
                We use Google Analytics 4 (GA4) to understand aggregate site usage — which pages are visited, how long users spend on each page, and general geographic distribution. GA4 collects anonymized page view and session data. It does not collect or transmit any data you enter into our calculators — calculator inputs are processed entirely in your browser and never reach analytics systems. GA4 data is used solely for understanding site performance and improving the user experience, not for targeting, advertising, or resale.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Third-party advertising</h2>
              <p className="text-sm leading-relaxed">
                This site displays advertisements served by Google AdSense (publisher ID: ca-pub-5035661017594256). Google uses cookies and similar technologies to serve ads based on your prior visits to this and other websites. These advertising cookies are set by Google, not by fitnesscalculators.app, and are governed by Google&apos;s own privacy policies. You can opt out of personalized advertising by visiting <strong>Google&apos;s Ad Settings</strong> or by using the <strong>Your Ad Choices</strong> opt-out link. For more information about how Google uses data in advertising, visit Google&apos;s Privacy &amp; Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">HIPAA notice</h2>
              <p className="text-sm leading-relaxed">
                fitnesscalculators.app is a consumer-facing informational website, not a covered entity or business associate under the Health Insurance Portability and Accountability Act (HIPAA). The site does not store, transmit, or process Protected Health Information (PHI) as defined under HIPAA. However, we recognize that health and fitness data is inherently sensitive, and our privacy architecture — client-side computation only, no server transmission of user inputs — reflects our commitment to health data privacy regardless of regulatory requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">GDPR and CCPA</h2>
              <p className="text-sm leading-relaxed">
                Because we do not collect personal data through calculator inputs, most GDPR and CCPA rights (access, deletion, correction, portability) apply primarily to data held by our third-party services (Google Analytics, Google AdSense). For requests related to data held by Google, use Google&apos;s privacy tools directly. For questions about any data fitnesscalculators.app itself may hold (e.g., contact form submissions), use the Contact link in the footer. California residents: we do not sell personal information as defined under CCPA.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Cookies</h2>
              <p className="text-sm leading-relaxed">
                fitnesscalculators.app itself does not set first-party cookies for tracking purposes. The only cookies set on this site originate from third-party services: Google AdSense (advertising cookies) and Google Analytics (session/analytics cookies). You can block or delete these cookies using your browser&apos;s privacy settings or a browser extension. Blocking advertising cookies will not affect calculator functionality — all calculator features work entirely without cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Medical disclaimer</h2>
              <p className="text-sm leading-relaxed">
                The calculators on fitnesscalculators.app are for general informational and educational purposes only. They do not constitute medical advice, diagnosis, or treatment. Results are estimates based on population-level formulas and may not accurately reflect your individual circumstances. Always consult a qualified healthcare provider before making decisions about diet, exercise, pregnancy, or any health-related matter based on calculator results or any other information on this site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Changes to this policy</h2>
              <p className="text-sm leading-relaxed">
                We may update this privacy policy from time to time. The &quot;Last updated&quot; date at the top of this page reflects when the most recent changes were made. We will not make changes that meaningfully reduce your privacy protections without prominent notice on the site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Contact</h2>
              <p className="text-sm leading-relaxed">
                If you have questions or concerns about this privacy policy, use the Contact link in the footer to reach us. We respond to all privacy-related inquiries.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
