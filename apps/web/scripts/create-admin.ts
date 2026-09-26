// Cria (ou promove) um usuário administrador do painel.
// Uso: bun run admin:create <email> [senha]
// Sem senha, apenas concede acesso admin a um usuário já existente.
import { auth, target } from './firebase-admin'

const [email, password] = process.argv.slice(2)

if (!email) {
  console.error('Uso: bun run admin:create <email> [senha]')
  process.exit(1)
}

if (password && password.length < 8) {
  console.error('Use uma senha com pelo menos 8 caracteres.')
  process.exit(1)
}

let user = await auth.getUserByEmail(email).catch(() => null)

if (!user) {
  if (!password) {
    console.error(`Usuário ${email} não existe. Informe uma senha para criá-lo.`)
    process.exit(1)
  }
  user = await auth.createUser({ email, password, emailVerified: true })
  console.log(`Usuário criado: ${email}`)
} else if (password) {
  await auth.updateUser(user.uid, { password })
  console.log(`Senha atualizada: ${email}`)
}

await auth.setCustomUserClaims(user.uid, { ...user.customClaims, admin: true })
console.log(`✔ ${email} agora é administrador (${target}).`)
process.exit(0)
