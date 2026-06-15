'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { brand, nav, githubUrl } from '@/src/content/site'

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="w-[95vw] max-w-6xl mx-auto mt-4 relative z-50">
      <div className="glass rounded-2xl px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-[18px] font-semibold tracking-tight text-white hover:text-white/90 transition-colors shrink-0"
        >
          {brand.name}
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/8 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex btn-glass text-sm px-4 py-2"
          >
            GitHub
          </a>
          <Link href="/login" className="hidden md:inline-flex btn-glass text-sm px-4 py-2">
            Connexion
          </Link>
          <Link href="/login" className="hidden md:inline-flex btn-violet text-sm px-4 py-2">
            Commencer
          </Link>

          <button
            className="md:hidden btn-glass flex items-center gap-2 px-3 py-2 text-sm"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Menu"
          >
            {mobileOpen
              ? <XMarkIcon className="w-4 h-4" />
              : <Bars3Icon className="w-4 h-4" />
            }
            Menu
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="glass rounded-2xl mt-2 px-2 py-2 md:hidden animate-fade-in-up">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-3 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/8 transition-colors border-b border-white/5 last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <div className="glass-divider mx-2" />
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-3 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/8 transition-colors"
          >
            Connexion
          </Link>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-3 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/8 transition-colors"
          >
            GitHub
          </a>
          <div className="px-2 pt-1 pb-1">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="btn-violet w-full text-sm py-2.5 text-center"
            >
              Commencer gratuitement
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default SiteHeader
