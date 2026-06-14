import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://taskom.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/my-profile', '/my-team', '/invite/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
