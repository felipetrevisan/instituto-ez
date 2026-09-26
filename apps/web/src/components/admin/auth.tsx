'use client'

import { firebase, isFirebaseClientConfigured } from '@ez/web/lib/firebase/client'
import {
  signOut as firebaseSignOut,
  onIdTokenChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  type User,
} from 'firebase/auth'
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type AuthState = {
  user: User | null
  isAdmin: boolean
  loading: boolean
  configured: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export class NotAdminError extends Error {
  constructor() {
    super('Esta conta não tem acesso ao painel administrativo.')
  }
}

const messages: Record<string, string> = {
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/wrong-password': 'E-mail ou senha incorretos.',
  // Mesma mensagem para não revelar quais e-mails têm conta.
  'auth/user-not-found': 'E-mail ou senha incorretos.',
  'auth/invalid-email': 'E-mail inválido.',
  'auth/user-disabled': 'Esta conta foi desativada.',
  'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
  'auth/network-request-failed': 'Falha de conexão. Verifique sua internet.',
}

export function authErrorMessage(error: unknown) {
  if (error instanceof NotAdminError) return error.message
  const code = (error as { code?: string })?.code ?? ''
  return messages[code] ?? 'Não foi possível entrar. Tente novamente.'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(isFirebaseClientConfigured)

  useEffect(() => {
    if (!isFirebaseClientConfigured) return
    return onIdTokenChanged(firebase().auth, async (next) => {
      const claims = next ? (await next.getIdTokenResult()).claims : null
      setUser(next)
      setIsAdmin(claims?.admin === true)
      setLoading(false)
    })
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const { auth } = firebase()
    const credential = await signInWithEmailAndPassword(auth, email.trim(), password)
    // Força a leitura de claims recém-atribuídas pelo script de criação de admin.
    const { claims } = await credential.user.getIdTokenResult(true)
    if (claims.admin !== true) {
      await firebaseSignOut(auth)
      throw new NotAdminError()
    }
  }, [])

  const signOut = useCallback(() => firebaseSignOut(firebase().auth), [])

  const resetPassword = useCallback(
    (email: string) => sendPasswordResetEmail(firebase().auth, email.trim()),
    [],
  )

  const value = useMemo(
    () => ({
      user,
      isAdmin,
      loading,
      configured: isFirebaseClientConfigured,
      signIn,
      signOut,
      resetPassword,
    }),
    [user, isAdmin, loading, signIn, signOut, resetPassword],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de <AuthProvider>')
  return context
}
