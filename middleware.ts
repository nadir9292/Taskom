import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value
  const token2 = request.cookies.get('__Secure-next-auth.session-token')?.value
  const { pathname } = request.nextUrl

  if (!token && !token2 && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if ((token || token2) && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
