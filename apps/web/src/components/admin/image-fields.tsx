'use client'

import {
  acceptByKind,
  uploadToStorage,
  useStorageEnabled,
  validateFile,
} from '@ez/web/lib/admin/uploads'
import { cn } from '@ez/web/lib/utils'
import { ArrowDown, ArrowUp, FileText, ImageOff, Plus, Trash2, Upload } from 'lucide-react'
import { type ChangeEvent, useEffect, useId, useState } from 'react'
import { toast } from 'sonner'
import { Button, Input } from './ui'

/** Aceita links absolutos (https://…) ou arquivos do próprio site (/assets/…, /files/…). */
export function isImageUrl(value: string) {
  return /^https?:\/\/\S+$/i.test(value) || /^\/\S+$/.test(value)
}

function Progress({ value }: { value: number }) {
  return (
    <div
      aria-label="Progresso do envio"
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={Math.round(value * 100)}
      className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
      role="progressbar"
    >
      <div
        className="h-full bg-[#f2b544] transition-[width]"
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </div>
  )
}

function Preview({ src, aspect, className }: { src: string; aspect: string; className?: string }) {
  const [failed, setFailed] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: nova URL, nova tentativa
  useEffect(() => setFailed(false), [src])

  return (
    <div
      className={cn(
        'relative grid w-full max-w-40 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]',
        aspect,
        className,
      )}
    >
      {src && !failed ? (
        // biome-ignore lint/performance/noImgElement: prévia de URL informada pelo usuário
        <img alt="" className="size-full object-cover" onError={() => setFailed(true)} src={src} />
      ) : (
        <span className="flex flex-col items-center gap-1.5 px-2 text-center text-[11px] text-white/40">
          <ImageOff aria-hidden className="size-5" />
          {src ? 'Não foi possível carregar' : 'Sem imagem'}
        </span>
      )}
    </div>
  )
}

/** Botão de envio ligado a um <input type="file"> escondido. */
function UploadButton({
  kind,
  multiple,
  onFiles,
  label,
  disabled,
}: {
  kind: 'image' | 'pdf'
  multiple?: boolean
  onFiles: (files: File[]) => void
  label: string
  disabled?: boolean
}) {
  const id = useId()
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    const valid = files.filter((file) => {
      const problem = validateFile(file, kind)
      if (problem) toast.error(`${file.name}: ${problem}`)
      return !problem
    })
    if (valid.length) onFiles(valid)
  }

  return (
    <>
      <label
        aria-disabled={disabled}
        className={cn(
          'inline-flex h-9 w-fit cursor-pointer items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-3 text-sm text-white transition hover:bg-white/[0.08]',
          disabled && 'pointer-events-none opacity-50',
        )}
        htmlFor={id}
      >
        <Upload aria-hidden className="size-4" /> {label}
      </label>
      <input
        accept={acceptByKind[kind]}
        className="sr-only"
        disabled={disabled}
        id={id}
        multiple={multiple}
        onChange={onChange}
        type="file"
      />
    </>
  )
}

/** Link de uma imagem com prévia — e envio ao Firebase Storage quando configurado. */
export function ImageUrlField({
  value,
  onChange,
  folder,
  id,
  invalid,
  aspect = 'aspect-[3/4]',
  placeholder = 'https://… ou /assets/…',
}: {
  value: string
  onChange: (url: string) => void
  folder: string
  id?: string
  invalid?: boolean
  aspect?: string
  placeholder?: string
}) {
  const storage = useStorageEnabled()
  const [progress, setProgress] = useState<number | null>(null)

  const upload = async ([file]: File[]) => {
    setProgress(0)
    try {
      const { url } = await uploadToStorage({
        kind: 'image',
        folder,
        file,
        onProgress: setProgress,
      })
      if (url) onChange(url)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Falha no envio da imagem.')
    } finally {
      setProgress(null)
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <Preview aspect={aspect} src={value} />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Input
          aria-invalid={invalid || (Boolean(value) && !isImageUrl(value))}
          id={id}
          onChange={(event) => onChange(event.target.value.trim())}
          placeholder={placeholder}
          value={value}
        />
        {progress !== null && <Progress value={progress} />}
        <div className="flex flex-wrap gap-2">
          {storage && (
            <UploadButton
              disabled={progress !== null}
              kind="image"
              label="Enviar imagem"
              onFiles={upload}
            />
          )}
          {value && (
            <Button onClick={() => onChange('')} size="sm" variant="ghost">
              <Trash2 aria-hidden className="size-4" /> Remover
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

/** Lista ordenável de imagens (páginas de amostra do ebook). */
export function ImageUrlList({
  value,
  onChange,
  folder,
}: {
  value: string[]
  onChange: (urls: string[]) => void
  folder: string
}) {
  const storage = useStorageEnabled()
  const [draft, setDraft] = useState('')
  const [progress, setProgress] = useState<number | null>(null)
  const valid = isImageUrl(draft)

  const move = (from: number, to: number) => {
    const next = [...value]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    onChange(next)
  }

  const add = () => {
    if (!valid) return
    onChange([...value, draft.trim()])
    setDraft('')
  }

  const upload = async (files: File[]) => {
    const urls: string[] = []
    setProgress(0)
    try {
      for (const [index, file] of files.entries()) {
        const { url } = await uploadToStorage({
          kind: 'image',
          folder,
          file,
          onProgress: (p) => setProgress((index + p) / files.length),
        })
        if (url) urls.push(url)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Falha no envio de uma das imagens.')
    } finally {
      setProgress(null)
      if (urls.length) onChange([...value, ...urls])
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {value.length > 0 && (
        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {value.map((url, index) => (
            <li className="relative" key={`${url}-${index}`}>
              <Preview aspect="aspect-[1/1.414]" className="max-w-none" src={url} />
              <span className="absolute top-2 left-2 rounded-md bg-black/70 px-1.5 py-0.5 text-white text-xs">
                {index + 1}
              </span>
              <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 rounded-b-xl bg-gradient-to-t from-black/80 p-2">
                <button
                  aria-label="Mover para a esquerda"
                  className="rounded-lg p-1.5 text-white/80 hover:bg-white/15 disabled:opacity-30"
                  disabled={index === 0}
                  onClick={() => move(index, index - 1)}
                  type="button"
                >
                  <ArrowUp aria-hidden className="-rotate-90 size-4" />
                </button>
                <button
                  aria-label="Mover para a direita"
                  className="rounded-lg p-1.5 text-white/80 hover:bg-white/15 disabled:opacity-30"
                  disabled={index === value.length - 1}
                  onClick={() => move(index, index + 1)}
                  type="button"
                >
                  <ArrowDown aria-hidden className="-rotate-90 size-4" />
                </button>
                <button
                  aria-label="Remover página"
                  className="rounded-lg p-1.5 text-rose-300 hover:bg-rose-500/20"
                  onClick={() => onChange(value.filter((_, i) => i !== index))}
                  type="button"
                >
                  <Trash2 aria-hidden className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
      {progress !== null && <Progress value={progress} />}
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          aria-invalid={Boolean(draft) && !valid}
          aria-label="Link da página"
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              add()
            }
          }}
          placeholder="Cole o link da imagem da página e pressione Enter"
          value={draft}
        />
        <Button disabled={!valid} onClick={add} variant="secondary">
          <Plus aria-hidden className="size-4" /> Adicionar
        </Button>
      </div>
      {storage && (
        <UploadButton
          disabled={progress !== null}
          kind="image"
          label="Enviar páginas"
          multiple
          onFiles={upload}
        />
      )}
    </div>
  )
}

/** PDF privado no Firebase Storage (entregue só após pagamento). */
export function PdfField({
  value,
  onChange,
  folder,
}: {
  value: { key: string; name: string } | null
  onChange: (file: { key: string; name: string } | null) => void
  folder: string
}) {
  const storage = useStorageEnabled()
  const [progress, setProgress] = useState<number | null>(null)

  const upload = async ([file]: File[]) => {
    setProgress(0)
    try {
      const { key } = await uploadToStorage({ kind: 'pdf', folder, file, onProgress: setProgress })
      onChange({ key, name: file.name })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Falha no envio do PDF.')
    } finally {
      setProgress(null)
    }
  }

  if (!storage && !value) return null

  return (
    <div className="flex flex-col gap-3">
      {value ? (
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <FileText aria-hidden className="size-8 shrink-0 text-[#f2b544]" />
          <span className="min-w-0 flex-1 truncate text-sm text-white">{value.name}</span>
          <Button onClick={() => onChange(null)} size="sm" variant="ghost">
            <Trash2 aria-hidden className="size-4" /> Remover
          </Button>
        </div>
      ) : (
        <p className="text-sm text-white/45">Nenhum PDF enviado.</p>
      )}
      {progress !== null && <Progress value={progress} />}
      {storage && (
        <UploadButton
          disabled={progress !== null}
          kind="pdf"
          label={value ? 'Substituir PDF' : 'Enviar PDF'}
          onFiles={upload}
        />
      )}
    </div>
  )
}
