import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Creating a handler to a GET request to route /auth/confirm
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = '/Login?confirmed=1'

  // Create redirect link without the secret token
  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (code || (token_hash && type)) {
    const supabase = await createClient()

    const { data: authData, error } = code
      ? await supabase.auth.exchangeCodeForSession(code)
      : await supabase.auth.verifyOtp({
          type: type!,
          token_hash: token_hash!,
        })

    if (!error) {
      const user = authData.user

      if (!user) {
        redirectTo.pathname = '/error'
        return NextResponse.redirect(redirectTo)
      }

      const name = user.user_metadata?.name

      if (!name || typeof name !== 'string') {
        redirectTo.pathname = '/error'
        return NextResponse.redirect(redirectTo)
      }

      const { error: profileError } = await supabase.from('profiles').upsert({
        id: user.id,
        name,
        role: 'user',
      })

      if (profileError) {
        redirectTo.pathname = '/error'
        redirectTo.searchParams.set('message', profileError.message)
        return NextResponse.redirect(redirectTo)
      }

      redirectTo.searchParams.delete('next')
      redirectTo.searchParams.delete('code')
      return NextResponse.redirect(redirectTo)
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}