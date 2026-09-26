'use client'

import { authErrorMessage, useAuth } from '@ez/web/components/admin/auth'
import { Button, Field, Input } from '@ez/web/components/admin/ui'
import { useSiteSettings } from '@ez/web/hooks/use-site-settings'
import { Eye, EyeOff, Lock } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function LoginPage() {
  const { signIn, resetPassword, isAdmin, loading, configured } = useAuth()
  const router = useRouter()
  const site = useSiteSettings()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && isAdmin) router.replace('/admin')
  }, [loading, isAdmin, router])

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signIn(email, password)
      router.replace('/admin')
    } catch (err) {
      setError(authErrorMessage(err))
      setSubmitting(false)
    }
  }

  const onReset = async () => {
    if (!email.trim()) {
      setError('Informe seu e-mail para receber o link de redefinição.')
      return
    }
    try {
      await resetPassword(email)
      toast.success('Se o e-mail estiver cadastrado, você receberá o link de redefinição.')
    } catch (err) {
      setError(authErrorMessage(err))
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(700px 500px at 20% 10%, rgba(242,181,68,0.14), transparent 60%), radial-gradient(700px 500px at 90% 90%, rgba(91,140,255,0.12), transparent 60%)',
        }}
      />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            alt=""
            className="rounded-full ring-1 ring-white/15"
            height={56}
            priority
            src={site.logo}
            unoptimized
            width={56}
          />
          <h1 className="mt-5 font-semibold text-2xl text-white tracking-tight">
            Painel administrativo
          </h1>
          <p className="mt-1 text-sm text-white/50">{site.name}</p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#0c1120]/90 p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur sm:p-8">
          {!configured ? (
            <div className="text-sm text-white/70 leading-relaxed">
              <p className="font-medium text-white">Firebase não configurado</p>
              <p className="mt-2">
                Defina as variáveis <code className="text-[#f6c566]">NEXT_PUBLIC_FIREBASE_*</code>{' '}
                no ambiente (veja o README) para habilitar o login.
              </p>
            </div>
          ) : (
            <form className="flex flex-col gap-5" noValidate onSubmit={onSubmit}>
              <Field label="E-mail">
                {(id) => (
                  <Input
                    autoComplete="email"
                    autoFocus
                    id={id}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="voce@institutoez.com.br"
                    required
                    type="email"
                    value={email}
                  />
                )}
              </Field>
              <Field label="Senha">
                {(id) => (
                  <div className="relative">
                    <Input
                      autoComplete="current-password"
                      className="pr-11"
                      id={id}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                    />
                    <button
                      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                      className="absolute inset-y-0 right-0 grid w-11 place-items-center text-white/45 hover:text-white"
                      onClick={() => setShowPassword((value) => !value)}
                      type="button"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                )}
              </Field>

              {error && (
                <p
                  className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-3.5 py-2.5 text-rose-200 text-sm"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <Button
                className="w-full"
                disabled={!email || !password}
                loading={submitting}
                type="submit"
              >
                <Lock aria-hidden className="size-4" /> Entrar
              </Button>
              <button
                className="text-center text-sm text-white/50 underline-offset-4 hover:text-white hover:underline"
                onClick={onReset}
                type="button"
              >
                Esqueci minha senha
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
