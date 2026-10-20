import "server-only"
import { getDb, hasDatabase } from "./db"
import { contentSections, defaultProjects, type ContentSectionKey, type ContentSectionValues, type StoredProject } from "@/lib/content-sections"

type SectionDoc = { _id: string; data: unknown; updatedAt: Date }
type ProjectDoc = StoredProject & { _id: string }

const sections = async () => (await getDb()).collection<SectionDoc>("content")
const projectsCollection = async () => (await getDb()).collection<ProjectDoc>("projects")

/** All sections, with database copies where they exist and file defaults otherwise. */
export async function loadSections(): Promise<ContentSectionValues> {
  const values = Object.fromEntries(Object.entries(contentSections).map(([key, section]) => [key, section.defaults])) as ContentSectionValues
  if (!hasDatabase()) return values
  try {
    for (const doc of await (await sections()).find().toArray()) {
      if (Object.hasOwn(values, doc._id)) (values as Record<string, unknown>)[doc._id] = doc.data
    }
  } catch (error) {
    console.error("[content] Falling back to file content:", error)
  }
  return values
}

export async function getSection<K extends ContentSectionKey>(key: K): Promise<{ value: ContentSectionValues[K]; edited: boolean; updatedAt?: Date }> {
  const doc = await (await sections()).findOne({ _id: key })
  return doc ? { value: doc.data as ContentSectionValues[K], edited: true, updatedAt: doc.updatedAt } : { value: contentSections[key].defaults as ContentSectionValues[K], edited: false }
}

export async function saveSection(key: ContentSectionKey, data: unknown) {
  await (await sections()).updateOne({ _id: key }, { $set: { data, updatedAt: new Date() } }, { upsert: true })
}

/** Drop the database copy so the section goes back to the file defaults. */
export async function resetSection(key: ContentSectionKey) {
  await (await sections()).deleteOne({ _id: key })
}

const stripId = ({ _id, ...project }: ProjectDoc): StoredProject => {
  void _id
  return project
}

/** Projects in display order. Hidden projects are included only when asked (admin). */
export async function loadProjects({ includeHidden = false } = {}): Promise<StoredProject[]> {
  if (!hasDatabase()) return defaultProjects
  try {
    const collection = await projectsCollection()
    if ((await collection.estimatedDocumentCount()) === 0) return defaultProjects
    const docs = await collection.find(includeHidden ? {} : { hidden: { $ne: true } }).sort({ order: 1 }).toArray()
    return docs.map(stripId)
  } catch (error) {
    console.error("[content] Falling back to file projects:", error)
    return defaultProjects
  }
}

/** Copy the file projects into the database the first time projects are edited. */
export async function ensureProjectsSeeded() {
  const collection = await projectsCollection()
  if ((await collection.estimatedDocumentCount()) > 0) return
  const now = new Date().toISOString()
  await collection.insertMany(defaultProjects.map((project) => ({ ...project, _id: project.slug, updatedAt: now })))
}

export async function getProject(slug: string) {
  await ensureProjectsSeeded()
  const doc = await (await projectsCollection()).findOne({ _id: slug })
  return doc ? stripId(doc) : null
}

/** Create (previousSlug null) or update a project. Changing the slug moves the document. */
export async function saveProject(previousSlug: string | null, project: StoredProject) {
  await ensureProjectsSeeded()
  const collection = await projectsCollection()
  const doc: StoredProject = { ...project, updatedAt: new Date().toISOString() }
  const slugTaken = async () => Boolean(await collection.findOne({ _id: project.slug }))
  if (!previousSlug) {
    if (await slugTaken()) throw new Error(`A project with the slug "${project.slug}" already exists`)
    const last = await collection.find().sort({ order: -1 }).limit(1).next()
    doc.order = (last?.order ?? -1) + 1
    await collection.insertOne({ ...doc, _id: project.slug })
    return
  }
  if (previousSlug !== project.slug) {
    if (await slugTaken()) throw new Error(`A project with the slug "${project.slug}" already exists`)
    await collection.deleteOne({ _id: previousSlug })
    await collection.insertOne({ ...doc, _id: project.slug })
    return
  }
  await collection.replaceOne({ _id: project.slug }, doc, { upsert: true })
}

export async function deleteProject(slug: string) {
  await ensureProjectsSeeded()
  await (await projectsCollection()).deleteOne({ _id: slug })
}

export async function reorderProjects(slugs: string[]) {
  await ensureProjectsSeeded()
  await (await projectsCollection()).bulkWrite(slugs.map((slug, order) => ({ updateOne: { filter: { _id: slug }, update: { $set: { order } } } })))
}
