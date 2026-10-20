"use client"

import { createContext, useContext } from "react"
import { MediaInput } from "./media-input"

/**
 * Edits any JSON value as a form: text, numbers, switches, lists you can add to and reorder,
 * and image fields with uploads. Used for every site section and for projects.
 */
type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

const imageKey = /(^|[A-Z_])(image|img|src|photo|photoAlt|portrait|logo|cover|avatar|thumbnail|picture|poster|og)$/i
const fileKey = /^(cv|resume|file|pdf)$/i
const videoKey = /(^|[A-Z_])video$/i
const longKey = /(description|summary|body|bio|answer|story|content|text|intro|introduction|notice|excerpt|quote|detail|paragraph)/i

const singular = (word: string) => word.replace(/ies$/i, "y").replace(/(?<!s)s$/i, "")

export function humanize(key: string) {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim()
  const label = spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase()
  return label.replace(/\burl\b/gi, "URL").replace(/\bcv\b/gi, "CV").replace(/\bseo\b/gi, "SEO").replace(/\butm\b/gi, "UTM")
}

/** An empty value with the same shape, used when adding a list item. */
export function blankLike(value: Json): Json {
  if (Array.isArray(value)) return []
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, blankLike(inner)]))
  if (typeof value === "number") return 0
  if (typeof value === "boolean") return false
  if (value === null) return null
  return ""
}

function itemTitle(item: Json, index: number) {
  if (item && typeof item === "object" && !Array.isArray(item)) {
    for (const key of ["title", "name", "label", "question", "role", "credential", "slug", "id", "caption", "value"]) {
      const value = item[key]
      if (typeof value === "string" && value.trim()) return value
    }
  }
  if (typeof item === "string" && item.trim()) return item
  return `Item ${index + 1}`
}

/** Item shapes for lists that may be empty, keyed by field name (e.g. gallery). */
const TemplatesContext = createContext<Record<string, unknown>>({})

type NodeProps = { name: string; value: Json; onChange: (value: Json) => void; depth: number; folder: string }

function Field({ name, value, onChange, depth, folder }: NodeProps) {
  const label = humanize(name)
  if (typeof value === "boolean") {
    return <label className="admin-check"><input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} /> {label}</label>
  }
  if (typeof value === "number") {
    return <label className="admin-field"><span>{label}</span><input type="number" step="any" value={Number.isFinite(value) ? value : 0} onChange={(event) => onChange(event.target.value === "" ? 0 : Number(event.target.value))} /></label>
  }
  if (value === null) {
    return <label className="admin-field"><span>{label}</span><input type="text" placeholder="Empty" value="" onChange={(event) => onChange(event.target.value)} /></label>
  }
  if (typeof value === "string") {
    if (imageKey.test(name) && !/^(color|position)/i.test(name)) return <MediaInput label={label} value={value} onChange={onChange} folder={folder} />
    if (fileKey.test(name)) return <MediaInput label={label} value={value} onChange={onChange} folder="files" accept="application/pdf" />
    if (videoKey.test(name)) return <MediaInput label={label} value={value} onChange={onChange} folder="videos" accept="video/*" />
    const long = value.length > 90 || value.includes("\n") || longKey.test(name)
    return (
      <label className="admin-field">
        <span>{label}</span>
        {long ? <textarea rows={Math.min(10, Math.max(3, Math.ceil(value.length / 90)))} value={value} onChange={(event) => onChange(event.target.value)} /> : <input type="text" value={value} onChange={(event) => onChange(event.target.value)} />}
      </label>
    )
  }
  if (Array.isArray(value)) return <ListField name={name} value={value} onChange={onChange} depth={depth} folder={folder} />
  return (
    <details className="admin-group" open={depth < 1}>
      <summary>{label}</summary>
      <ObjectFields value={value} onChange={onChange} depth={depth + 1} folder={folder} />
    </details>
  )
}

function ObjectFields({ value, onChange, depth, folder }: { value: { [key: string]: Json }; onChange: (value: Json) => void; depth: number; folder: string }) {
  return (
    <div className="admin-node">
      {Object.entries(value).map(([key, inner]) => (
        <Field key={key} name={key} value={inner} depth={depth} folder={folder} onChange={(next) => onChange({ ...value, [key]: next })} />
      ))}
    </div>
  )
}

function ListField({ name, value, onChange, depth, folder }: NodeProps & { value: Json[] }) {
  const template = useContext(TemplatesContext)[name] as Json | undefined
  const move = (from: number, to: number) => {
    const next = [...value]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    onChange(next)
  }
  const add = () => onChange([...value, template !== undefined ? blankLike(template) : value.length ? blankLike(value[value.length - 1]) : ""])
  const simple = value.every((item) => typeof item !== "object" || item === null)
  return (
    <details className="admin-group" open={depth < 1 || simple}>
      <summary>{humanize(name)} <span className="admin-badge">{value.length}</span></summary>
      <div className="admin-node">
        {value.map((item, index) => {
          const controls = (
            // preventDefault stops the buttons from also opening or closing the item.
            <span className="admin-row" style={{ gap: 4, flexWrap: "nowrap" }} onClick={(event) => event.preventDefault()}>
              <button type="button" className="admin-icon-button" title="Move up" disabled={index === 0} onClick={() => move(index, index - 1)}>↑</button>
              <button type="button" className="admin-icon-button" title="Move down" disabled={index === value.length - 1} onClick={() => move(index, index + 1)}>↓</button>
              <button type="button" className="admin-icon-button" title="Remove" onClick={() => onChange(value.filter((_, i) => i !== index))}>✕</button>
            </span>
          )
          const update = (next: Json) => onChange(value.map((old, i) => (i === index ? next : old)))
          if (typeof item !== "object" || item === null) {
            return (
              <div key={index} className="admin-row" style={{ flexWrap: "nowrap", alignItems: "flex-end" }}>
                <div style={{ flex: 1, minWidth: 0 }}><Field name={`${singular(name)} ${index + 1}`} value={item} onChange={update} depth={depth + 1} folder={folder} /></div>
                {controls}
              </div>
            )
          }
          return (
            <details key={index} className="admin-item" open={value.length <= 2}>
              <summary className="admin-item-head" style={{ listStyle: "none", cursor: "pointer" }}><strong>{itemTitle(item, index)}</strong>{controls}</summary>
              {Array.isArray(item) ? <ListField name="Items" value={item} onChange={update} depth={depth + 1} folder={folder} /> : <ObjectFields value={item} onChange={update} depth={depth + 1} folder={folder} />}
            </details>
          )
        })}
        <div><button type="button" className="admin-button admin-button-small" onClick={add}>+ Add {singular(humanize(name).toLowerCase())}</button></div>
      </div>
    </details>
  )
}

export function StructuredEditor({ value, onChange, folder = "images", templates = {} }: { value: unknown; onChange: (value: unknown) => void; folder?: string; templates?: Record<string, unknown> }) {
  const json = value as Json
  const body = Array.isArray(json)
    ? <ListField name="Items" value={json} onChange={onChange} depth={0} folder={folder} />
    : json && typeof json === "object"
      ? <ObjectFields value={json} onChange={onChange} depth={0} folder={folder} />
      : <Field name="Value" value={json} onChange={onChange} depth={0} folder={folder} />
  return <TemplatesContext.Provider value={templates}>{body}</TemplatesContext.Provider>
}
