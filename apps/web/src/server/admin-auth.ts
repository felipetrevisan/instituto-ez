import { adminAuth, isFirebaseAdminConfigured } from '@ez/web/lib/firebase/admin'

/**
 * Valida o ID token do Firebase enviado pelo painel (Authorization: Bearer <token>)
 * e exige a custom claim `admin`.
 */
export async function verifyAdminRequest(request: Request) {
  if (!isFirebaseAdminConfigured) return null
  const header = request.headers.get('authorization') ?? ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return null

  try {
    const decoded = await adminAuth().verifyIdToken(token)
    return decoded.admin === true ? decoded : null
  } catch {
    return null
  }
}

export function unauthorized() {
  return Response.json({ error: 'Não autorizado' }, { status: 401 })
}
