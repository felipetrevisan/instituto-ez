'use client'

import { useEffect } from 'react'
import type { ShapeName } from './shapes'

export type SceneConfig = {
  shape: ShapeName
  /** Cor principal das partículas (hex). */
  accent: string
  /** Cor secundária usada no gradiente das partículas (hex). */
  accentSecondary: string
  /** Deslocamento horizontal do objeto no desktop (unidades de cena). */
  offsetX: number
}

type Listener = (config: SceneConfig) => void

const defaultConfig: SceneConfig = {
  shape: 'brain',
  accent: '#f2b544',
  accentSecondary: '#5b8cff',
  offsetX: 0,
}

let current = defaultConfig
const listeners = new Set<Listener>()

export const sceneStore = {
  get: () => current,
  set(partial: Partial<SceneConfig>) {
    current = { ...current, ...partial }
    for (const listener of listeners) listener(current)
  },
  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}

/** Define a forma/cores da cena 3D de fundo enquanto a página estiver montada. */
export function useScene(config: Partial<SceneConfig>) {
  const { shape, accent, accentSecondary, offsetX } = config

  useEffect(() => {
    sceneStore.set({
      shape: shape ?? defaultConfig.shape,
      accent: accent ?? defaultConfig.accent,
      accentSecondary: accentSecondary ?? defaultConfig.accentSecondary,
      offsetX: offsetX ?? 0,
    })
  }, [shape, accent, accentSecondary, offsetX])
}

export function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace('#', '')
  const full =
    value.length === 3
      ? value
          .split('')
          .map((c) => c + c)
          .join('')
      : value
  const num = Number.parseInt(full, 16)
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255]
}
