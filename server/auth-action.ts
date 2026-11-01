'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: String(formData.get('email') ?? '').trim(),
    password: String(formData.get('password') ?? ''),
  }

  if (!data.email || !data.password) {
    redirect('/error?message=El correo y la contraseña son obligatorios')
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const requestHeaders = await headers()
  const origin = requestHeaders.get('origin') ?? 'http://localhost:3000'

  const data = {
    email: String(formData.get('email') ?? '').trim(),
    password: String(formData.get('password') ?? ''),
    name: String(formData.get('name') ?? '').trim(),
  }

  if (!data.email || !data.password || !data.name) {
    redirect('/error?message=El nombre, el correo y la contraseña son obligatorios')
  }

  const { data: signupData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${origin}/api/auth/callback`,
      data: {
        name: data.name,
      },
    },
  })

  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`)
  }

  if (!signupData.user) {
    redirect('/error?message=No se pudo crear el usuario')
  }

  if (signupData.session) {
    const { error: profileError } = await supabase.from('profiles').upsert({
      id: signupData.user.id,
      name: data.name,
      
    })

    if (profileError) {
      redirect(`/error?message=${encodeURIComponent(profileError.message)}`)
    }
  }

  if (!signupData.session) {
    redirect(
      `/Login?message=${encodeURIComponent(
        'Revisa tu correo electrónico para confirmar tu cuenta.',
      )}`,
    )
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function LogOut(){
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}