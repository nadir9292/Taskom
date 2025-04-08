import { supabase } from '@/src/lib/supabaseClient'
import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { error } = await supabase
        .from('User')
        .insert([{ email: user.email }])

      if (error && error.code !== '23505') {
        console.error(error)
        return false
      }

      return true
    },
  },
})

export { handler as GET, handler as POST }
