import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedPaths = ['/dashboard', '/my-team', '/my-profile']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value
  const token2 = request.cookies.get('__Secure-next-auth.session-token')?.value
  const { pathname } = request.nextUrl

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )

  if (!token && !token2 && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if ((token || token2) && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
