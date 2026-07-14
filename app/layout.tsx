import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fitness Calculators — Free Health & Fitness Tools',
  description:
    'Free fitness calculators for BMI, calories, macros, body fat, ideal weight, running pace, pregnancy due date and more. Instant results, no signup required.',
  keywords: [
    'fitness calculator',
    'BMI calculator',
    'calorie calculator',
    'macro calculator',
    'body fat calculator',
    'ideal weight calculator',
    'running pace calculator',
    'pregnancy calculator',
    'ovulation calculator',
    'TDEE calculator',
    'BMR calculator',
    'water intake calculator',
    'sleep calculator',
    'fitness calculators',
    'health calculator',
  ],
  metadataBase: new URL('https://fitnesscalculators.app'),
  alternates: { canonical: 'https://fitnesscalculators.app' },
  openGraph: {
    title: 'Fitness Calculators — Free Health & Fitness Tools',
    description:
      'Free fitness calculators for BMI, calories, macros, body fat, running pace, pregnancy due date and more. Instant results, no signup.',
    url: 'https://fitnesscalculators.app',
    siteName: 'fitnesscalculators.app',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Free Fitness Calculators' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fitness Calculators — Free Health & Fitness Tools',
    description: 'Free fitness calculators for BMI, calories, macros, body fat and more. No signup.',
    images: ['/twitter-image.png'],
  },
  robots: { index: true, follow: true },
  verification: { google: 'PLACEHOLDER_GOOGLE_SITE_VERIFICATION' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-5035661017594256" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('fitnesscalculators-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z5HBKFB19B"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z5HBKFB19B');
          `}
        </Script>
      </head>
      <body
        className="min-h-full flex flex-col bg-white dark:bg-[#0f172a] text-gray-900 dark:text-[#e2e8f0]"
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5035661017594256"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
