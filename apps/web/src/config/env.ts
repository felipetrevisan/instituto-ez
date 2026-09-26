import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

const nodeEnv = z.enum(['development', 'production', 'test'])

const optional = z.string().optional()

export const env = createEnv({
  server: {
    // Opcional: sem a chave o formulário de contato avisa que o envio falhou.
    RESEND_API_KEY: optional,
    // Conta de serviço do Firebase Admin (leitura do catálogo, checkout e downloads).
    FIREBASE_PROJECT_ID: optional,
    FIREBASE_CLIENT_EMAIL: optional,
    FIREBASE_PRIVATE_KEY: optional,
    STRIPE_SECRET_KEY: optional,
    // Cloudflare R2 (upload de imagens e PDFs pelo painel).
    R2_ACCOUNT_ID: optional,
    R2_ACCESS_KEY_ID: optional,
    R2_SECRET_ACCESS_KEY: optional,
    R2_BUCKET: optional,
  },
  client: {
    NEXT_PUBLIC_VERCEL_URL: z.string().url().min(1),
    NEXT_PUBLIC_FIREBASE_API_KEY: optional,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: optional,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: optional,
    NEXT_PUBLIC_FIREBASE_APP_ID: optional,
    /** "true" conecta o painel aos emuladores locais do Firebase. */
    NEXT_PUBLIC_FIREBASE_EMULATOR: z.enum(['true', 'false']).default('false'),
  },
  shared: {
    NODE_ENV: nodeEnv,
    VERCEL_ENV: z.enum(['production', 'preview', 'development']).default('development'),
  },
  runtimeEnv: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET: process.env.R2_BUCKET,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_EMULATOR: process.env.NEXT_PUBLIC_FIREBASE_EMULATOR,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
  clientPrefix: 'NEXT_PUBLIC_',
  skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
  emptyStringAsUndefined: true,
})
