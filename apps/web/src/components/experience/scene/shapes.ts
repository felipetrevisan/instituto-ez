// Geradores de nuvens de pontos 3D. Cada forma devolve exatamente `count` pontos
// (x, y, z intercalados) para que o shader possa interpolar entre elas.

export type ShapeName = 'brain' | 'orb' | 'lattice' | 'helix' | 'network' | 'galaxy' | 'book'

type Rng = () => number

function mulberry32(seed: number): Rng {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function gauss(rand: Rng) {
  const u = Math.max(rand(), 1e-6)
  const v = rand()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function unitSphere(rand: Rng): [number, number, number] {
  const u = rand() * 2 - 1
  const theta = rand() * Math.PI * 2
  const s = Math.sqrt(1 - u * u)
  return [s * Math.cos(theta), u, s * Math.sin(theta)]
}

function rotateX(out: Float32Array, angle: number) {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  for (let i = 0; i < out.length; i += 3) {
    const y = out[i + 1]
    const z = out[i + 2]
    out[i + 1] = y * c - z * s
    out[i + 2] = y * s + z * c
  }
}

function brain(count: number, rand: Rng) {
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const roll = rand()
    let x: number
    let y: number
    let z: number

    if (roll < 0.08) {
      // Cerebelo
      const [dx, dy, dz] = unitSphere(rand)
      x = dx * 0.55
      y = -0.55 + dy * 0.28
      z = -0.82 + dz * 0.34
    } else if (roll < 0.11) {
      // Tronco encefálico
      const t = rand()
      const a = rand() * Math.PI * 2
      x = Math.cos(a) * 0.11
      y = -0.45 - t * 0.85
      z = -0.35 - t * 0.2 + Math.sin(a) * 0.11
    } else {
      const side = rand() < 0.5 ? -1 : 1
      const [dx, dy, dz] = unitSphere(rand)
      // Sulcos e giros: deslocamento radial senoidal
      const folds =
        1 +
        0.07 * Math.sin(9 * dy + 5 * dz + side) * Math.sin(7 * dz - 4 * dx) +
        0.035 * Math.sin(17 * dx + 13 * dy)
      const interior = roll > 0.93 ? rand() ** 0.5 * 0.85 : 1
      x = dx * 0.78 * folds * interior
      y = dy * 0.78 * folds * interior
      z = dz * 1.18 * folds * interior
      // Parede medial achatada + fissura longitudinal
      if (x * side < 0) x *= 0.3
      x += side * 0.42
      if (y < -0.3) y = -0.3 + (y + 0.3) * 0.45
    }

    out[i * 3] = x * 1.45
    out[i * 3 + 1] = (y + 0.12) * 1.45
    out[i * 3 + 2] = z * 1.45
  }
  return out
}

function orb(count: number, rand: Rng) {
  const out = new Float32Array(count * 3)
  const shell = Math.floor(count * 0.62)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    let x: number
    let y: number
    let z: number
    if (i < shell) {
      const yy = 1 - (i / (shell - 1)) * 2
      const r = Math.sqrt(1 - yy * yy)
      const theta = golden * i
      const jitter = 1 + gauss(rand) * 0.025
      x = Math.cos(theta) * r * 1.35 * jitter
      y = yy * 1.35 * jitter
      z = Math.sin(theta) * r * 1.35 * jitter
    } else if (rand() < 0.2) {
      // Núcleo luminoso
      const [dx, dy, dz] = unitSphere(rand)
      const r = rand() ** 2 * 0.6
      x = dx * r
      y = dy * r
      z = dz * r
    } else {
      // Anéis orbitais inclinados
      const ring = Math.floor(rand() * 3)
      const a = rand() * Math.PI * 2
      const radius = 1.9 + ring * 0.32 + gauss(rand) * 0.03
      const tilt = [0.35, -0.9, 1.35][ring]
      const px = Math.cos(a) * radius
      const pz = Math.sin(a) * radius
      x = px
      y = pz * Math.sin(tilt)
      z = pz * Math.cos(tilt)
    }
    out[i * 3] = x
    out[i * 3 + 1] = y
    out[i * 3 + 2] = z
  }
  return out
}

function lattice(count: number, rand: Rng) {
  const out = new Float32Array(count * 3)
  const n = Math.ceil(Math.cbrt(count))
  const size = 3.2
  for (let i = 0; i < count; i++) {
    const ix = i % n
    const iy = Math.floor(i / n) % n
    const iz = Math.floor(i / (n * n)) % n
    let x = (ix / (n - 1) - 0.5) * size
    let z = (iz / (n - 1) - 0.5) * size
    let y = (iy / (n - 1) - 0.5) * size * 0.72
    y += 0.22 * Math.sin(x * 1.8 + z * 1.2)
    x += gauss(rand) * 0.012
    z += gauss(rand) * 0.012
    out[i * 3] = x
    out[i * 3 + 1] = y
    out[i * 3 + 2] = z
  }
  rotateX(out, 0.42)
  return out
}

function helix(count: number, rand: Rng) {
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const t = rand() * 2 - 1
    const angle = t * Math.PI * 3.2
    const y = t * 2.3
    const radius = 0.95
    let x: number
    let z: number
    if (rand() < 0.72) {
      const strand = rand() < 0.5 ? 0 : Math.PI
      x = Math.cos(angle + strand) * radius + gauss(rand) * 0.05
      z = Math.sin(angle + strand) * radius + gauss(rand) * 0.05
    } else {
      // Degraus entre as fitas, quantizados como etapas
      const step = Math.round(t * 16) / 16
      const a = step * Math.PI * 3.2
      const k = rand() * 2 - 1
      x = Math.cos(a) * radius * k
      z = Math.sin(a) * radius * k
    }
    out[i * 3] = x
    out[i * 3 + 1] = y
    out[i * 3 + 2] = z
  }
  return out
}

function network(count: number, rand: Rng) {
  const out = new Float32Array(count * 3)
  const centers: [number, number, number][] = []
  for (let c = 0; c < 11; c++) {
    const [dx, dy, dz] = unitSphere(rand)
    const r = 0.9 + rand() * 0.9
    centers.push([dx * r * 1.25, dy * r * 0.8, dz * r])
  }
  for (let i = 0; i < count; i++) {
    let x: number
    let y: number
    let z: number
    if (rand() < 0.8) {
      const [cx, cy, cz] = centers[Math.floor(rand() * centers.length)]
      const sigma = 0.2
      x = cx + gauss(rand) * sigma
      y = cy + gauss(rand) * sigma
      z = cz + gauss(rand) * sigma
    } else {
      // Sinapses entre grupos de pessoas
      const a = centers[Math.floor(rand() * centers.length)]
      const b = centers[Math.floor(rand() * centers.length)]
      const t = rand()
      const lift = Math.sin(t * Math.PI) * 0.35
      x = a[0] + (b[0] - a[0]) * t
      y = a[1] + (b[1] - a[1]) * t + lift
      z = a[2] + (b[2] - a[2]) * t
    }
    out[i * 3] = x
    out[i * 3 + 1] = y
    out[i * 3 + 2] = z
  }
  return out
}

function galaxy(count: number, rand: Rng) {
  const out = new Float32Array(count * 3)
  const arms = 3
  for (let i = 0; i < count; i++) {
    const core = rand() < 0.14
    const r = core ? rand() ** 2 * 0.45 : 0.25 + rand() ** 0.7 * 2.25
    const arm = Math.floor(rand() * arms)
    const angle = (arm / arms) * Math.PI * 2 + r * 2.1 + gauss(rand) * (0.22 / (r + 0.3))
    out[i * 3] = Math.cos(angle) * r
    out[i * 3 + 1] = gauss(rand) * 0.09 * (1.2 - r / 2.6) + (core ? gauss(rand) * 0.12 : 0)
    out[i * 3 + 2] = Math.sin(angle) * r
  }
  // Disco no plano XZ: a cena gira em Y (em torno do próprio eixo) e inclina via câmera.
  return out
}

function book(count: number, rand: Rng) {
  const out = new Float32Array(count * 3)
  const layers = 9
  for (let i = 0; i < count; i++) {
    const u = rand() ** 0.8
    const v = rand() * 2 - 1
    const layer = Math.floor(rand() * layers)
    const side = rand() < 0.5 ? -1 : 1
    let theta: number
    if (rand() < 0.12) {
      // Páginas sendo folheadas
      theta = Math.PI * (0.3 + rand() * 0.4)
    } else {
      theta = side < 0 ? Math.PI * (0.94 - layer * 0.012) : Math.PI * (0.06 + layer * 0.012)
    }
    const width = 1.75
    const bend = Math.sin(u * Math.PI) * 0.12
    out[i * 3] = Math.cos(theta) * u * width
    out[i * 3 + 1] = v * 1.25
    out[i * 3 + 2] = Math.sin(theta) * u * width * 0.9 + bend
  }
  rotateX(out, -0.95)
  return out
}

const generators: Record<ShapeName, (count: number, rand: Rng) => Float32Array> = {
  brain,
  orb,
  lattice,
  helix,
  network,
  galaxy,
  book,
}

export function createShape(name: ShapeName, count: number) {
  return generators[name](count, mulberry32(name.length * 7919 + count))
}

export function createDust(count: number) {
  const rand = mulberry32(42)
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const [dx, dy, dz] = unitSphere(rand)
    const r = 5 + rand() * 9
    out[i * 3] = dx * r
    out[i * 3 + 1] = dy * r
    out[i * 3 + 2] = dz * r
  }
  return out
}

/** Pares de vizinhos próximos (grade espacial) para desenhar as sinapses. */
export function createLinks(positions: Float32Array, sample: number, maxDistance: number) {
  const total = positions.length / 3
  const cell = maxDistance
  const grid = new Map<string, number[]>()
  const key = (x: number, y: number, z: number) =>
    `${Math.floor(x / cell)}|${Math.floor(y / cell)}|${Math.floor(z / cell)}`

  for (let i = 0; i < total; i++) {
    const k = key(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])
    const bucket = grid.get(k)
    if (bucket) bucket.push(i)
    else grid.set(k, [i])
  }

  const links: number[] = []
  const stride = Math.max(1, Math.floor(total / sample))
  const max2 = maxDistance * maxDistance

  for (let i = 0; i < total; i += stride) {
    const x = positions[i * 3]
    const y = positions[i * 3 + 1]
    const z = positions[i * 3 + 2]
    const cx = Math.floor(x / cell)
    const cy = Math.floor(y / cell)
    const cz = Math.floor(z / cell)
    let found = 0
    for (let ox = -1; ox <= 1 && found < 2; ox++) {
      for (let oy = -1; oy <= 1 && found < 2; oy++) {
        for (let oz = -1; oz <= 1 && found < 2; oz++) {
          const bucket = grid.get(`${cx + ox}|${cy + oy}|${cz + oz}`)
          if (!bucket) continue
          for (const j of bucket) {
            if (j <= i) continue
            const dx = positions[j * 3] - x
            const dy = positions[j * 3 + 1] - y
            const dz = positions[j * 3 + 2] - z
            if (dx * dx + dy * dy + dz * dz < max2) {
              links.push(i, j)
              if (++found >= 2) break
            }
          }
        }
      }
    }
  }

  return new Uint16Array(links)
}
