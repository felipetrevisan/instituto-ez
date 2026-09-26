'use client'

import { useEffect, useRef } from 'react'
import { createDust, createLinks, createShape, type ShapeName } from './shapes'
import { hexToRgb, type SceneConfig, sceneStore } from './store'

const VERTEX = /* glsl */ `
attribute vec3 a_from;
attribute vec3 a_to;
attribute float a_seed;

uniform mat4 u_proj;
uniform mat4 u_model;
uniform float u_time;
uniform float u_morph;
uniform float u_size;
uniform float u_pixel;
uniform vec2 u_mouse;
uniform float u_aspect;

varying float v_alpha;
varying float v_pulse;
varying float v_seed;

float ease(float t) {
  return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
}

void main() {
  float delay = a_seed * 0.35;
  float m = ease(clamp((u_morph - delay) / 0.65, 0.0, 1.0));
  vec3 p = mix(a_from, a_to, m);

  // Expansão durante a transição: as partículas "explodem" e se reorganizam
  vec3 dir = normalize(p + vec3(0.0001));
  p += dir * sin(m * 3.14159) * (0.25 + a_seed * 0.6);

  // Respiração orgânica
  p += dir * sin(u_time * 0.9 + a_seed * 40.0) * 0.018;

  vec4 mv = u_model * vec4(p, 1.0);
  vec4 clip = u_proj * mv;

  // Campo de repulsão do cursor em espaço de tela
  vec2 ndc = clip.xy / clip.w;
  vec2 d = (ndc - u_mouse) * vec2(u_aspect, 1.0);
  float dist = length(d);
  float push = smoothstep(0.32, 0.0, dist) * 0.28;
  mv.xy += normalize(d + vec2(0.0001)) * push;
  clip = u_proj * mv;

  gl_Position = clip;

  float depth = clamp((-mv.z - 3.0) / 12.0, 0.0, 1.0);
  float pulse = pow(max(0.0, sin(u_time * 1.4 + a_seed * 131.0)), 28.0);
  v_pulse = pulse;
  v_seed = a_seed;
  v_alpha = 1.0 - depth * 0.8;
  gl_PointSize = u_size * u_pixel * (0.55 + a_seed * 0.9) * (1.0 + pulse * 1.8) / -mv.z;
}
`

const FRAGMENT = /* glsl */ `
precision mediump float;

uniform vec3 u_color;
uniform vec3 u_color2;
uniform float u_mode;
uniform float u_opacity;

varying float v_alpha;
varying float v_pulse;
varying float v_seed;

void main() {
  vec3 base = mix(u_color, u_color2, smoothstep(0.55, 1.0, v_seed));
  if (u_mode < 0.5) {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    float a = smoothstep(0.5, 0.0, r);
    a *= a;
    vec3 col = mix(base, vec3(1.0), v_pulse * 0.85 + smoothstep(0.18, 0.0, r) * 0.4);
    gl_FragColor = vec4(col, a * v_alpha * u_opacity);
  } else {
    gl_FragColor = vec4(base, 0.085 * v_alpha * u_opacity);
  }
}
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function perspective(fov: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fov / 2)
  const nf = 1 / (near - far)
  // biome-ignore format: matriz 4x4 em colunas
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0,
  ])
}

function modelMatrix(rx: number, ry: number, tx: number, ty: number, tz: number) {
  const cx = Math.cos(rx)
  const sx = Math.sin(rx)
  const cy = Math.cos(ry)
  const sy = Math.sin(ry)
  // Rx * Ry, depois translação
  // biome-ignore format: matriz 4x4 em colunas
  return new Float32Array([
    cy, sx * sy, -cx * sy, 0,
    0, cx, sx, 0,
    sy, -sx * cy, cx * cy, 0,
    tx, ty, tz, 1,
  ])
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

export function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: true,
      premultipliedAlpha: false,
    })
    if (!gl) {
      canvas.dataset.fallback = 'true'
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isSmall = window.matchMedia('(max-width: 767px)').matches
    const mainCount = isSmall ? 1400 : 2600
    const dustCount = isSmall ? 260 : 520
    const total = mainCount + dustCount

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    const program = gl.createProgram()
    if (!vs || !fs || !program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    // biome-ignore lint/correctness/useHookAtTopLevel: API do WebGL, não é um hook React
    gl.useProgram(program)

    const loc = {
      from: gl.getAttribLocation(program, 'a_from'),
      to: gl.getAttribLocation(program, 'a_to'),
      seed: gl.getAttribLocation(program, 'a_seed'),
    }
    const uni = (name: string) => gl.getUniformLocation(program, name)
    const u = {
      proj: uni('u_proj'),
      model: uni('u_model'),
      time: uni('u_time'),
      morph: uni('u_morph'),
      size: uni('u_size'),
      pixel: uni('u_pixel'),
      mouse: uni('u_mouse'),
      aspect: uni('u_aspect'),
      color: uni('u_color'),
      color2: uni('u_color2'),
      mode: uni('u_mode'),
      opacity: uni('u_opacity'),
    }

    const dust = createDust(dustCount)
    const shapeCache = new Map<ShapeName, Float32Array>()
    const buildPositions = (name: ShapeName) => {
      const cached = shapeCache.get(name)
      if (cached) return cached
      const full = new Float32Array(total * 3)
      full.set(createShape(name, mainCount))
      full.set(dust, mainCount * 3)
      shapeCache.set(name, full)
      return full
    }

    const seeds = new Float32Array(total)
    for (let i = 0; i < total; i++) seeds[i] = (Math.sin(i * 12.9898) * 43758.5453) % 1
    for (let i = 0; i < total; i++) seeds[i] = Math.abs(seeds[i])

    const fromBuffer = gl.createBuffer()
    const toBuffer = gl.createBuffer()
    const seedBuffer = gl.createBuffer()
    const linkBuffer = gl.createBuffer()

    gl.bindBuffer(gl.ARRAY_BUFFER, seedBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW)
    gl.enableVertexAttribArray(loc.seed)
    gl.vertexAttribPointer(loc.seed, 1, gl.FLOAT, false, 0, 0)

    let config: SceneConfig = sceneStore.get()
    let fromPositions = buildPositions(config.shape)
    let toPositions = fromPositions
    let linkCount = 0
    let morph = 1
    let morphStart = 0

    const upload = () => {
      gl.bindBuffer(gl.ARRAY_BUFFER, fromBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, fromPositions, gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(loc.from)
      gl.vertexAttribPointer(loc.from, 3, gl.FLOAT, false, 0, 0)

      gl.bindBuffer(gl.ARRAY_BUFFER, toBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, toPositions, gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(loc.to)
      gl.vertexAttribPointer(loc.to, 3, gl.FLOAT, false, 0, 0)

      const links = createLinks(toPositions.subarray(0, mainCount * 3), isSmall ? 500 : 900, 0.34)
      linkCount = links.length
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, linkBuffer)
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, links, gl.STATIC_DRAW)
    }
    upload()

    // Captura a posição atual (interpolada) para iniciar a próxima transição sem saltos.
    const snapshot = () => {
      const out = new Float32Array(total * 3)
      for (let i = 0; i < total; i++) {
        const m = ease(Math.min(Math.max((morph - seeds[i] * 0.35) / 0.65, 0), 1))
        for (let k = 0; k < 3; k++) {
          const idx = i * 3 + k
          out[idx] = fromPositions[idx] + (toPositions[idx] - fromPositions[idx]) * m
        }
      }
      return out
    }

    const color = hexToRgb(config.accent)
    const color2 = hexToRgb(config.accentSecondary)
    let targetColor = color.slice() as typeof color
    let targetColor2 = color2.slice() as typeof color2
    let offsetX = config.offsetX
    // Inclinação extra por forma (a galáxia é vista de cima, girando no próprio eixo)
    const tiltFor = (shape: ShapeName) => (shape === 'galaxy' ? 0.95 : 0)
    let tilt = tiltFor(config.shape)

    const unsubscribe = sceneStore.subscribe((next) => {
      targetColor = hexToRgb(next.accent)
      targetColor2 = hexToRgb(next.accentSecondary)
      if (next.shape !== config.shape) {
        fromPositions = snapshot()
        toPositions = buildPositions(next.shape)
        morph = reducedMotion ? 1 : 0
        morphStart = performance.now()
        upload()
      }
      config = next
      if (reducedMotion) requestRender()
    })

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
    gl.disable(gl.DEPTH_TEST)
    gl.clearColor(0, 0, 0, 0)

    let width = 0
    let height = 0
    let pixelRatio = 1
    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 1.75)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * pixelRatio)
      canvas.height = Math.floor(height * pixelRatio)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniformMatrix4fv(u.proj, false, perspective((50 * Math.PI) / 180, width / height, 0.1, 60))
      gl.uniform1f(u.aspect, width / height)
      gl.uniform1f(u.pixel, pixelRatio)
      if (reducedMotion) requestRender()
    }
    resize()

    const pointer = { x: 0, y: 0, tx: 0, ty: 0, sx: 10, sy: 10 }
    const onPointer = (event: PointerEvent) => {
      pointer.tx = (event.clientX / width) * 2 - 1
      pointer.ty = -((event.clientY / height) * 2 - 1)
      pointer.sx = pointer.tx
      pointer.sy = pointer.ty
    }
    const onLeave = () => {
      pointer.sx = 10
      pointer.sy = 10
    }

    let frame = 0
    let running = true
    const start = performance.now()
    let smoothScroll = 0
    let screenMouseX = 10
    let screenMouseY = 10

    const render = (now: number) => {
      const time = reducedMotion ? 12 : (now - start) / 1000
      if (morph < 1) morph = Math.min(1, (now - morphStart) / 2600)

      pointer.x += (pointer.tx - pointer.x) * 0.04
      pointer.y += (pointer.ty - pointer.y) * 0.04
      screenMouseX += (pointer.sx - screenMouseX) * 0.12
      screenMouseY += (pointer.sy - screenMouseY) * 0.12

      const scroll = window.scrollY / Math.max(height, 1)
      smoothScroll += (scroll - smoothScroll) * (reducedMotion ? 1 : 0.08)

      for (let k = 0; k < 3; k++) {
        color[k] += (targetColor[k] - color[k]) * 0.04
        color2[k] += (targetColor2[k] - color2[k]) * 0.04
      }
      const targetOffset = width >= 1024 ? config.offsetX : 0
      offsetX += (targetOffset - offsetX) * 0.05
      tilt += (tiltFor(config.shape) - tilt) * 0.03

      const settle = Math.min(smoothScroll, 1.6)
      const rx = -0.12 + tilt + pointer.y * 0.18 + smoothScroll * 0.18
      const ry = 0.85 + time * 0.07 + pointer.x * 0.4 + smoothScroll * 0.85
      const tz = -6.2 - settle * 1.3 - (width < 768 ? 1.4 : 0)
      const tx = offsetX * (1 - Math.min(smoothScroll, 1) * 0.6)
      const ty = settle * 0.25

      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniformMatrix4fv(u.model, false, modelMatrix(rx, ry, tx, ty, tz))
      gl.uniform1f(u.time, time)
      gl.uniform1f(u.morph, morph)
      gl.uniform1f(u.size, width < 768 ? 34 : 44)
      gl.uniform2f(u.mouse, screenMouseX, screenMouseY)
      gl.uniform3f(u.color, color[0], color[1], color[2])
      gl.uniform3f(u.color2, color2[0], color2[1], color2[2])
      gl.uniform1f(u.opacity, 1 - 0.5 * Math.min(Math.max((smoothScroll - 0.2) / 1.2, 0), 1))

      gl.uniform1f(u.mode, 1)
      gl.drawElements(gl.LINES, linkCount, gl.UNSIGNED_SHORT, 0)
      gl.uniform1f(u.mode, 0)
      gl.drawArrays(gl.POINTS, 0, total)
    }

    const loop = (now: number) => {
      if (!running) return
      render(now)
      frame = requestAnimationFrame(loop)
    }

    function requestRender() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame((now) => render(now))
    }

    const onVisibility = () => {
      if (reducedMotion) return
      running = !document.hidden
      cancelAnimationFrame(frame)
      if (running) frame = requestAnimationFrame(loop)
    }

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    if (reducedMotion) {
      window.addEventListener('scroll', requestRender, { passive: true })
      requestRender()
    } else {
      window.addEventListener('pointermove', onPointer, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
      frame = requestAnimationFrame(loop)
    }

    return () => {
      running = false
      cancelAnimationFrame(frame)
      unsubscribe()
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', requestRender)
      window.removeEventListener('pointermove', onPointer)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return <canvas aria-hidden className="ez-neural-field" ref={canvasRef} />
}
