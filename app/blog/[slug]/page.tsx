import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MarketingShell from '@/src/components/marketing/MarketingShell'
import JsonLd from '@/src/components/marketing/JsonLd'
import { brand, siteUrl } from '@/src/content/site'
import { posts, getPost } from '@/src/content/posts'

export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

const Article = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'fr',
    author: { '@type': 'Organization', name: brand.name },
    publisher: { '@type': 'Organization', name: brand.name },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    keywords: post.keywords.join(', '),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${post.slug}`,
      },
    ],
  }

  return (
    <MarketingShell>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumb} />

      <article className="w-[92vw] max-w-3xl mx-auto mt-16 sm:mt-24">
        <Link href="/blog" className="text-sm text-violet-300">
          ← Tous les articles
        </Link>
        <h1 className="mt-5 text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.12]">
          {post.title}
        </h1>
        <p className="mt-4 text-xs text-white/40">
          {post.readingMinutes} min de lecture
        </p>

        <div className="mt-8 space-y-4">
          {post.intro.map((p, i) => (
            <p key={i} className="text-white/70 leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {post.sections.map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-white/70 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            {section.bullets && (
              <ul className="mt-4 space-y-2">
                {section.bullets.map((b) => (
                  <li
                    key={b}
                    className="text-white/65 flex items-start gap-2.5 leading-relaxed"
                  >
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0"
                      aria-hidden
                    />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="glass-strong rounded-3xl p-8 mt-16 text-center">
          <h2 className="text-2xl font-semibold text-white">
            Essayez {brand.name}
          </h2>
          <p className="mt-3 text-white/65">{brand.tagline}</p>
          <Link
            href="/login"
            className="btn-violet btn-violet-lg sm:w-auto sm:px-10 mt-6 inline-flex"
          >
            Commencer gratuitement
          </Link>
        </div>
      </article>
    </MarketingShell>
  )
}

export default Article
