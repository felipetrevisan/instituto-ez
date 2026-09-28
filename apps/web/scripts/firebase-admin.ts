// Inicialização do Firebase Admin para scripts de linha de comando (bun carrega o .env.local).
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

const projectId = process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const usingEmulator = Boolean(
  process.env.FIRESTORE_EMULATOR_HOST || process.env.FIREBASE_AUTH_EMULATOR_HOST,
)

if (!projectId) {
  console.error(
    'Defina FIREBASE_PROJECT_ID (ou NEXT_PUBLIC_FIREBASE_PROJECT_ID) no apps/web/.env.local.',
  )
  process.exit(1)
}

if (!usingEmulator && !(process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY)) {
  console.error(
    'Defina FIREBASE_CLIENT_EMAIL e FIREBASE_PRIVATE_KEY (conta de serviço) no apps/web/.env.local.',
  )
  process.exit(1)
}

const app =
  getApps()[0] ??
  initializeApp({
    projectId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    ...(usingEmulator
      ? {}
      : {
          credential: cert({
            projectId,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          }),
        }),
  })

export const auth = getAuth(app)
export const db = getFirestore(app)
export const bucket = () => {
  if (!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) {
    console.error('Defina NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET no apps/web/.env.local.')
    process.exit(1)
  }
  return getStorage(app).bucket()
}
export const target = usingEmulator ? `emulador (${projectId})` : `projeto ${projectId}`
