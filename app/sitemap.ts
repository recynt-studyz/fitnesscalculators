import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://fitnesscalculators.app'
  return [
    { url: base, lastModified: new Date(), priority: 1.0 },
    { url: `${base}/calories`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/macros`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/body-fat`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/bmr`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/tdee`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/pregnancy`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/ovulation`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/ideal-weight`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/one-rep-max`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/running-pace`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/water-intake`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/sleep`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/privacy`, lastModified: new Date(), priority: 0.5 },
    { url: `${base}/about`, lastModified: new Date(), priority: 0.5 },
  ]
}
