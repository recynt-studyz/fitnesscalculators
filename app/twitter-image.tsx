import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Free Fitness Calculators'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', marginBottom: 24 }}>
          <svg width="80" height="50" viewBox="0 0 80 50" fill="none">
            <polyline
              points="0,25 16,25 22,5 30,45 37,15 45,35 52,25 80,25"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          Free Fitness Calculators
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.82)',
            textAlign: 'center',
            marginBottom: 40,
            maxWidth: 800,
          }}
        >
          BMI, calories, macros, body fat, running pace and more. Instant results, no signup, completely free.
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Free', 'Instant', 'Private', 'No Signup'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 100,
                padding: '8px 22px',
                color: 'white',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
