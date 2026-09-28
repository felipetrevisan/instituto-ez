import { env } from '@ez/web/config/env'
import { type App, cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

// Com os emuladores ativos (FIRESTORE_EMULATOR_HOST etc.) basta o projectId.
const usingEmulator = Boolean(process.env.FIRESTORE_EMULATOR_HOST)
const projectId = env.FIREBASE_PROJECT_ID ?? env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

export const isFirebaseAdminConfigured = Boolean(
  projectId && (usingEmulator || (env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY)),
)

let app: App | null = null

function adminApp() {
  if (app) return app
  if (!isFirebaseAdminConfigured) {
    throw new Error(
      'Firebase Admin não configurado: defina FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL e FIREBASE_PRIVATE_KEY.',
    )
  }

  app =
    getApps()[0] ??
    initializeApp({
      projectId,
      storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      ...(usingEmulator
        ? {}
        : {
            credential: cert({
              projectId,
              clientEmail: env.FIREBASE_CLIENT_EMAIL,
              // Variáveis de ambiente costumam trazer as quebras de linha escapadas.
              privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
          }),
    })
  return app
}

export const adminDb = () => getFirestore(adminApp())
export const adminAuth = () => getAuth(adminApp())
export const adminBucket = () => getStorage(adminApp()).bucket()
