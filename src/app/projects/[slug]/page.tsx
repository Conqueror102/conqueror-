import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { absoluteUrl, site } from "@/content"
import { getPortfolioContent } from "@/lib/portfolio-content"
import { JsonLd } from "@/components/json-ld"
import { schemaIds } from "@/lib/structured-data"
import { PortfolioHeader } from "@/components/layout/site-header"
import { ProjectDetail } from "@/components/projects/project-detail"

type Props = { params:Promise<{slug:string}> }
export async function generateStaticParams() {
  const content = await getPortfolioContent()
  return content.projects.map(project=>({slug:project.slug}))
}
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const {slug}=await params
  const content=await getPortfolioContent()
  const project=content.projects.find(item=>item.slug===slug)
  if (!project) notFound()
  const path=`/projects/${project.slug}`
  return {title:project.referenceDemo ? `${project.title} — Case-study layout demo` : project.title,description:project.referenceDemo ? project.description : project.summary,...(project.referenceDemo ? {robots:{index:false,follow:true}} : {}),alternates:{canonical:path},openGraph:{type:"article",url:path,title:`${project.title} by ${content.profile.name}`,description:project.description,authors:[site.url],images:[{url:project.image,alt:project.title}],siteName:site.name},twitter:{card:"summary_large_image",title:project.title,description:project.description,images:[project.image]}}
}
export default async function ProjectPage({params}:Props) {
  const {slug}=await params
  const content=await getPortfolioContent()
  const index=content.projects.findIndex(project=>project.slug===slug)
  const project=index>=0 ? content.projects[index] : undefined
  if(!project) notFound()
  const structured={"@context":"https://schema.org","@graph":[{"@type":"CreativeWork","@id":schemaIds.project(slug),name:project.title,headline:`${project.title}: ${project.summary}`,description:project.description,abstract:project.summary,genre:project.category,url:absoluteUrl(`/projects/${slug}`),mainEntityOfPage:absoluteUrl(`/projects/${slug}`),image:absoluteUrl(project.image),keywords:project.technologies.join(", "),about:project.technologies.map(name=>({"@type":"Thing",name})),creator:{"@type":"Person","@id":schemaIds.person,name:content.profile.name,url:site.url},author:{"@id":schemaIds.person},isPartOf:{"@id":schemaIds.website},inLanguage:"en",...(project.updatedAt?{dateModified:project.updatedAt}:{}),...(project.repoUrl?{codeRepository:project.repoUrl}:{}),...(project.liveUrl?{sameAs:project.liveUrl}:{})},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:content.projectDetailCopy.home,item:absoluteUrl("/")},{"@type":"ListItem",position:2,name:project.title,item:absoluteUrl(`/projects/${slug}`)}]}]}
  const pageSchema=project.referenceDemo ? {"@context":"https://schema.org","@type":"WebPage",name:"Rentium case-study layout demo",description:project.description,url:absoluteUrl(`/projects/${slug}`)} : structured
  return <div className="project-story-page"><JsonLd data={pageSchema}/><PortfolioHeader content={content} homePath="/"/><ProjectDetail project={project} next={content.projects[(index+1)%content.projects.length]} index={Math.max(0,index)} content={content}/></div>
}
