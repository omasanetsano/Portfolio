import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectVisual, SiteFooter, SiteHeader } from "../../components/portfolio-home.tsx";
import { projects } from "../../content/site.ts";

export const metadata={title:"Work — Omasan Etsano",description:"Selected products and websites by Omasan Etsano, spanning SaaS, AI, education and corporate services.",alternates:{canonical:"/works"}};

export default function WorksPage(){return <main><SiteHeader/><section className="inner-hero frame contour"><p className="eyebrow">HOME / WORK</p><h1>Selected projects,<br/><em>built end to end.</em></h1><p>Real products and websites spanning education, AI, operations and corporate services.</p></section><section className="archive frame"><div className="filters"><span>{String(projects.length).padStart(2,"0")} LIVE &amp; PRODUCT PROJECTS</span></div><div className="archive-grid">{projects.map(p=><Link href={`/works/${p.slug}`} className="archive-card" key={p.slug}><ProjectVisual project={p}/><div><span>{p.type}</span><h2>{p.title}</h2><p>{p.year}</p><ArrowUpRight/></div></Link>)}</div></section><SiteFooter/></main>}
