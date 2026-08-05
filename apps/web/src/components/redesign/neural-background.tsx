'use client'

import { Float, MeshDistortMaterial } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { usePrefersReducedMotion } from './use-reduced-motion'

const POINT_COUNT = 90
const CONNECT_DISTANCE = 2.5
const CONNECTIONS_UPDATE_EVERY = 3
const COPPER = '#cc8e5c'

/** Procedural soft circular glow sprite — avoids the default square GL point look. */
function useGlowTexture() {
  return useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.35, 'rgba(255,255,255,0.7)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])
}

function NeuralNetwork({ withHero, heroOffsetX }: { withHero: boolean; heroOffsetX: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const blobRef = useRef<THREE.Mesh>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const frameCount = useRef(0)
  const glowTexture = useGlowTexture()
  const scrollY = useRef(0)
  const maxScroll = useRef(1)

  useEffect(() => {
    const updateMaxScroll = () => {
      maxScroll.current = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
    }
    const handleScroll = () => {
      scrollY.current = window.scrollY
    }
    updateMaxScroll()
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateMaxScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateMaxScroll)
    }
  }, [])

  const positions = useMemo(() => {
    const arr = new Float32Array(POINT_COUNT * 3)
    for (let i = 0; i < POINT_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  const linePositions = useMemo(() => new Float32Array(POINT_COUNT * POINT_COUNT * 3), [])

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useFrame((state) => {
    const group = groupRef.current
    const lines = linesRef.current
    if (!group || !lines) return

    const scrollProgress = scrollY.current / maxScroll.current

    group.rotation.y += 0.0015 + scrollProgress * 0.004
    group.rotation.x += 0.0006 + scrollProgress * 0.0015
    group.position.x += (pointer.current.x * 0.5 - group.position.x) * 0.05
    group.position.y += (-pointer.current.y * 0.5 - group.position.y) * 0.05
    const targetScale = 1 + scrollProgress * 0.6
    group.scale.x += (targetScale - group.scale.x) * 0.05
    group.scale.y += (targetScale - group.scale.y) * 0.05
    group.scale.z += (targetScale - group.scale.z) * 0.05

    frameCount.current++
    if (frameCount.current % CONNECTIONS_UPDATE_EVERY === 0) {
      let count = 0
      for (let i = 0; i < POINT_COUNT; i++) {
        for (let j = i + 1; j < POINT_COUNT; j++) {
          const dx = positions[i * 3] - positions[j * 3]
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < CONNECT_DISTANCE) {
            linePositions[count * 3] = positions[i * 3]
            linePositions[count * 3 + 1] = positions[i * 3 + 1]
            linePositions[count * 3 + 2] = positions[i * 3 + 2]
            linePositions[count * 3 + 3] = positions[j * 3]
            linePositions[count * 3 + 4] = positions[j * 3 + 1]
            linePositions[count * 3 + 5] = positions[j * 3 + 2]
            count += 2
          }
        }
      }
      const geometry = lines.geometry
      geometry.setDrawRange(0, count)
      geometry.attributes.position.needsUpdate = true
    }

    const blob = blobRef.current
    if (blob) {
      blob.rotation.x = scrollProgress * Math.PI * 1.2
      blob.rotation.y = state.clock.elapsedTime * 0.12 + scrollProgress * Math.PI * 0.8
      // Only prominent near the hero — fades into the ambient field past it.
      const visibility = 1 - THREE.MathUtils.smoothstep(scrollProgress, 0.12, 0.3)
      const material = blob.material as THREE.Material & { opacity: number }
      material.transparent = true
      material.opacity = visibility
      blob.scale.setScalar(0.7 + visibility * 0.3)
    }
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        </bufferGeometry>
        <pointsMaterial
          color={COPPER}
          depthWrite={false}
          map={glowTexture}
          opacity={0.9}
          size={0.22}
          sizeAttenuation
          transparent
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute args={[linePositions, 3]} attach="attributes-position" />
        </bufferGeometry>
        <lineBasicMaterial color={COPPER} opacity={0.28} transparent />
      </lineSegments>
      {withHero && (
        <Float floatIntensity={1.4} rotationIntensity={0.4} speed={1.6}>
          <mesh position={[heroOffsetX, 0, 0]} ref={blobRef}>
            <icosahedronGeometry args={[1.7, 8]} />
            <MeshDistortMaterial
              color={COPPER}
              distort={0.45}
              emissive={COPPER}
              emissiveIntensity={0.15}
              metalness={0.6}
              roughness={0.25}
              speed={1.8}
              wireframe
            />
          </mesh>
        </Float>
      )}
    </group>
  )
}

type NeuralBackgroundProps = {
  className?: string
  /** Also render the abstract hero blob in this same canvas (avoids a second WebGL context). */
  hero?: boolean
  /** Horizontal offset (world units) for the hero blob — e.g. 2.2 to sit right of centered text. */
  heroOffsetX?: number
}

export function NeuralBackground({
  className,
  hero = false,
  heroOffsetX = 0,
}: NeuralBackgroundProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) return null

  return (
    <div aria-hidden className={className ?? '-z-10 pointer-events-none fixed inset-0'}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.6} />
        <pointLight color={COPPER} intensity={2} position={[4, 4, 4]} />
        <pointLight color="#ffffff" intensity={0.4} position={[-4, -2, -4]} />
        <NeuralNetwork heroOffsetX={heroOffsetX} withHero={hero} />
      </Canvas>
    </div>
  )
}
