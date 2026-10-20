import fs from "node:fs"
import assert from "node:assert/strict"

const origin = "http://localhost:3000"
const slugs = [...fs.readFileSync("src/content/projects.ts","utf8").matchAll(/slug:\s*"([^"]+)"/g)].map(match=>match[1])
assert.equal(new Set(slugs).size,11)
const results = await Promise.all(slugs.map(async slug=>{
  const response=await fetch(`${origin}/projects/${slug}`)
  assert.equal(response.status,200,slug)
  const html=await response.text()
  assert(html.includes(`/projects/${slug}`),`${slug}: canonical/route`)
  for (const section of ["challenge","solution","outcomes","architecture","gallery","stack"]) assert(html.includes(`id="${section}"`),`${slug}: ${section} server-rendered`)
  for (const label of ["CLIENT","ROLE","SERVICES PROVIDED","ILLUSTRATIVE METRICS","DEMO CASE STUDY"]) assert(html.includes(label),`${slug}: ${label}`)
  const ld=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match=>JSON.parse(match[1]))
  assert(ld.some(item=>item["@graph"]?.some(node=>node["@type"]==="CreativeWork"&&node.url.endsWith(`/projects/${slug}`))),`${slug}: project structured data`)
  assert(html.includes('rel="canonical"'),`${slug}: canonical`)
  return slug
}))
assert.equal((await fetch(`${origin}/projects/project-not-found`)).status,404)
const sitemap=await (await fetch(`${origin}/sitemap.xml`)).text()
const llms=await (await fetch(`${origin}/llms.txt`)).text()
for(const slug of slugs){assert(sitemap.includes(`/projects/${slug}`));assert(llms.includes(`/projects/${slug}`))}
const home=await (await fetch(origin)).text()
assert(home.includes('href="/projects/medark"'))
assert(home.includes('View case study: Medark'))
const preview=await fetch(`${origin}/projects/rentium`)
assert.equal(preview.status,200)
const demo=await preview.text()
for (const text of ["457+","1.2s","99.9%","Global","The Challenge","The Solution","Key Outcomes","System Design &amp; Technical Rigor","Supabase","BullMQ","Proprietary Commercial Architecture"]) assert(demo.includes(text),`Rentium: ${text}`)
assert(demo.includes('noindex'))
assert(!sitemap.includes('/projects/rentium'))
assert(!home.includes('href="/projects/rentium"'))
console.log(JSON.stringify({pages:results.length,referenceDemo:true,caseStudySections:6,clientRoleServicesMetrics:true,SSR:true,structuredData:true,sitemap:true,llms:true,unknownProject:404,primaryCaseStudyLink:true}))
