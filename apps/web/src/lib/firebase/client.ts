'use client'

import { env } from '@ez/web/config/env'
import { type FirebaseApp, getApps, initializeApp } from 'firebase/app'
import { type Auth, connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, type Firestore, getFirestore } from 'firebase/firestore'
import { connectStorageEmulator, type FirebaseStorage, getStorage } from 'firebase/storage'

const config = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export const isFirebaseClientConfigured = Boolean(config.apiKey && config.projectId)

type Services = { app: FirebaseApp; auth: Auth; db: Firestore; storage: FirebaseStorage }

let services: Services | null = null

/** Instância única do Firebase no navegador (painel admin). */
export function firebase(): Services {
  if (services) return services
  if (!isFirebaseClientConfigured) {
    throw new Error('Firebase não configurado: defina as variáveis NEXT_PUBLIC_FIREBASE_*.')
  }

  const app = getApps()[0] ?? initializeApp(config)
  const auth = getAuth(app)
  const db = getFirestore(app)
  const storage = getStorage(app)

  if (env.NEXT_PUBLIC_FIREBASE_EMULATOR === 'true') {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
    connectFirestoreEmulator(db, '127.0.0.1', 8080)
    connectStorageEmulator(storage, '127.0.0.1', 9199)
  }

  services = { app, auth, db, storage }
  return services
}
