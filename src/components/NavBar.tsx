'use client'

import { useApiRoutes } from '@/src/contexts/ApiContext'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Bars3Icon, XMarkIcon, HomeIcon, UsersIcon, UserIcon } from '@heroicons/react/24/outline'
import { brand, nav, githubUrl } from '@/src/content/site'

const appPaths = ['/dashboard', '/my-team', '/my-profile']
const noHeaderPaths = ['/login', '/invite']

type DrawerProps = { open: boolean; onClose: () => void; children: React.ReactNode }

const MobileDrawer = ({ open, onClose, children }: DrawerProps) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`absolute top-0 right-0 h-full w-72 glass-solid flex flex-col transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <span className="text-[17px] font-semibold tracking-tight text-white">{brand.name}</span>
          <button onClick={onClose} className="btn-glass p-2" aria-label="Fermer le menu">
            <XMarkIcon className="w-5 h-5 text-white" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

const NavBar = () => {
  const [mounted, setMounted] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { user } = useApiRoutes()
  const { data: session, status } = useSession()
  const pathname = usePathname()

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { setDrawerOpen(false) }, [pathname])

  if (!mounted) return null

  const isAppPage = appPaths.some(p => pathname === p || pathname.startsWith(`${p}/`))
  const isHidden = noHeaderPaths.some(p => pathname === p || pathname.startsWith(`${p}/`))

  if (isHidden) return null

  if (status === 'authenticated' && session && isAppPage) {
    const profileImage = user?.profileimage ?? session.user?.image ?? '/default-profile.png'
    const firstName = (user?.firstname || session.user?.name)?.split(' ')[0]
    const appNavLinks = [
      { href: '/dashboard', icon: HomeIcon, label: 'Home' },
      { href: '/my-team', icon: UsersIcon, label: 'My team' },
      { href: '/my-profile', icon: UserIcon, label: 'My profile' },
    ]

    return (
      <>
        {/* Desktop — md+ */}
        <div className="hidden md:flex w-[95vw] max-w-6xl mx-auto mt-4 glass rounded-2xl px-5 py-3 items-center justify-between animate-fade-in-up">
          <Link href="/dashboard" className="text-[17px] font-semibold tracking-tight text-white hover:text-white/90 transition-colors shrink-0">
            {brand.name}
          </Link>

          <nav className="flex items-center gap-1">
            {appNavLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  pathname === href
                    ? 'text-white bg-white/10 border border-violet-400/20'
                    : 'text-white/65 hover:text-white hover:bg-white/8'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="relative" style={{ zIndex: 100 }}>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="cursor-pointer group">
                <Image
                  src={profileImage}
                  height={36}
                  width={36}
                  alt="profile"
                  priority
                  className="rounded-xl border border-white/15 object-cover transition-all group-hover:border-violet-400/50 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.35)]"
                />
              </div>
              <ul tabIndex={0} className="dropdown-content glass rounded-xl w-44 p-1.5 shadow-2xl mt-2.5">
                <li>
                  <Link href="/my-profile" className="block px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/8 rounded-lg transition-colors">
                    My profile
                  </Link>
                </li>
                <div className="glass-divider mx-2" />
                <li>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-3 py-2 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile top bar — < md */}
        <div className="md:hidden w-[95vw] mx-auto mt-4 glass rounded-2xl px-4 py-3 flex items-center justify-between animate-fade-in-up relative z-40">
          <Link href="/dashboard" className="text-[17px] font-semibold tracking-tight text-white hover:text-white/90 transition-colors">
            {brand.name}
          </Link>
          <div className="flex items-center gap-3">
            <Image src={profileImage} height={32} width={32} alt="profile" className="rounded-xl border border-white/15 object-cover" />
            <button onClick={() => setDrawerOpen(true)} className="btn-glass p-2" aria-label="Ouvrir le menu">
              <Bars3Icon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Drawer — app */}
        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
            <Image src={profileImage} height={44} width={44} alt="profile" className="rounded-xl border border-white/15 object-cover" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{firstName}</p>
              <p className="text-xs text-white/45 truncate">{session.user?.email}</p>
            </div>
          </div>
          <nav className="flex-1 px-3 py-3 flex flex-col gap-1">
            {appNavLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                  pathname === href
                    ? 'bg-white/12 text-white border border-violet-400/25 shadow-[0_0_12px_rgba(139,92,246,0.12)]'
                    : 'text-white/70 hover:text-white hover:bg-white/8'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {label}
              </Link>
            ))}
          </nav>
          <div className="px-3 pb-8 pt-2 border-t border-white/8">
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              Logout
            </button>
          </div>
        </MobileDrawer>
      </>
    )
  }

  // Marketing header
  return (
    <>
      <header className="w-[95vw] max-w-6xl mx-auto mt-4 relative z-50">
        <div className="glass rounded-2xl px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="text-[18px] font-semibold tracking-tight text-white hover:text-white/90 transition-colors shrink-0">
            {brand.name}
          </Link>

          {/* Desktop nav — md+ */}
          <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'text-white bg-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/8'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions — md+ */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-glass text-sm px-4 py-2">GitHub</a>
            <Link href="/login" className="btn-glass text-sm px-4 py-2">Connexion</Link>
            <Link href="/login" className="btn-violet text-sm px-4 py-2">Commencer</Link>
          </div>

          {/* Mobile hamburger — < md */}
          <button
            className="md:hidden btn-glass flex items-center gap-2 px-3 py-2 text-sm shrink-0"
            onClick={() => setDrawerOpen(true)}
            aria-label="Menu"
          >
            <Bars3Icon className="w-4 h-4" />
            Menu
          </button>
        </div>
      </header>

      {/* Drawer — marketing */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <nav className="flex-1 px-3 py-3 flex flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-3 rounded-xl text-sm transition-all ${
                pathname === item.href
                  ? 'bg-white/12 text-white border border-violet-400/25'
                  : 'text-white/70 hover:text-white hover:bg-white/8'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-3 pb-8 pt-2 border-t border-white/8 flex flex-col gap-2">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-glass text-sm py-2.5 text-center">
            GitHub
          </a>
          <Link href="/login" className="btn-glass text-sm py-2.5 text-center">Connexion</Link>
          <Link href="/login" className="btn-violet text-sm py-2.5 text-center">Commencer gratuitement</Link>
        </div>
      </MobileDrawer>
    </>
  )
}

export default NavBar
