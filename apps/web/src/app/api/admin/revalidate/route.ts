import { unauthorized, verifyAdminRequest } from '@ez/web/server/admin-auth'
import { revalidatePath } from 'next/cache'

/** Chamado pelo painel após salvar: atualiza as páginas estáticas do site. */
export async function POST(request: Request) {
  if (!(await verifyAdminRequest(request))) return unauthorized()
  revalidatePath('/', 'layout')
  return Response.json({ revalidated: true })
}
