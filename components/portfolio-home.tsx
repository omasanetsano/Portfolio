"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, CloudCog, Code2, Layers3, Menu, PenTool, X } from "lucide-react";
import { useEffect, useState } from "react";
import { faqs, projects, services, site, type Project } from "../content/site.ts";
import { SocialMark, TechBadge } from "./brand-icons.tsx";

const ease = [0.22, 1, 0.36, 1] as const;
const serviceIcons = [Code2, Layers3, PenTool, CloudCog];
const marqueeTools = ['React','TypeScript','Next.js','Supabase','FastAPI','Git/GitHub','Docker','Vercel'];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: .7, ease }}>{children}</motion.div>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return <>
    <header className="topbar frame">
      <Link href="/" className="brand" aria-label="Home"><span>{site.initials}</span><i /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {[['HOME','/'],['WORK','/works'],['ABOUT','/about'],['CONTACT','/contact']].map(([label, href]) => <Link key={href} href={href} className="nav-link"><span>{label}</span><span>{label}</span></Link>)}
      </nav>
      <Link href="/contact" className="talk desktop-talk">LET&apos;S TALK <ArrowUpRight size={17} /></Link>
      <button className="menu-button" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
    </header>
    <AnimatePresence>{open && <motion.div className="menu-overlay" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: .65, ease }}>
      <div className="menu-head"><span className="brand"><span>{site.initials}</span><i /></span><button className="menu-button" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button></div>
      <nav>{[['01','Home','/'],['02','Work','/works'],['03','About','/about'],['04','Contact','/contact']].map(([n,l,h],i)=><motion.div key={h} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:.2+i*.07}}><Link href={h} onClick={()=>setOpen(false)}><small>{n}</small>{l}<ArrowUpRight /></Link></motion.div>)}</nav>
      <div className="menu-foot"><a href={site.github}>GITHUB</a><a href={site.linkedin}>LINKEDIN</a><a href={`mailto:${site.email}`}>EMAIL</a></div>
    </motion.div>}</AnimatePresence>
  </>;
}

export function Art({ tone, number }: { tone: string; number: string }) {
  return <div className={`project-art ${tone}`}><span className="art-orbit"/><span className="art-disc"/><b>{number}</b><em>SELECTED<br/>OBJECT</em></div>;
}

export function ProjectVisual({ project, priority = false }: { project: Project; priority?: boolean }) {
  const host = project.url ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "in development";
  return <div className={`project-visual stage ${project.tone}`}>
    <span className="stage-grid" aria-hidden/><span className="stage-glow" aria-hidden/><span className="stage-num" aria-hidden>{project.number}</span>
    <div className={`device ${project.phone ? "with-phone" : ""}`}>
      <div className="device-bar"><i/><i/><i/><span>{host}</span></div>
      <div className="device-screen"><Image src={project.image} alt={`${project.title} project preview`} fill priority={priority} sizes="(max-width: 900px) 100vw, 50vw"/></div>
    </div>
    {project.phone && <div className="phone"><Image src={project.phone} alt={`${project.title} on mobile`} width={350} height={626} sizes="220px"/></div>}
    <div className="project-visual-chrome"><span className="project-brand"><Image src={project.logo} width={24} height={24} alt=""/><b>{project.title}</b></span><span>{project.url ? "LIVE PROJECT" : "IN PROGRESS"}</span></div>
  </div>;
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  return <Reveal className={`project-card ${index % 2 ? "offset" : ""}`}><Link href={`/works/${project.slug}`}>
    <div className="project-image"><ProjectVisual project={project} priority={index<2}/><span className="view-pill">VIEW CASE <ArrowUpRight size={15}/></span></div>
    <div className="project-meta"><div><h3>{project.title}</h3><p>{project.type}</p></div><span>{project.year}</span></div>
  </Link></Reveal>;
}

function FAQ() {
  const [active, setActive] = useState<number | null>(0);
  return <div className="faq-list">{faqs.map(([q,a],i)=><div className="faq" key={q}><button onClick={()=>setActive(active===i?null:i)} aria-expanded={active===i}><span>{String(i+1).padStart(2,'0')}</span><b>{q}</b><i>{active===i?'−':'+'}</i></button><AnimatePresence initial={false}>{active===i&&<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.4,ease}}><p>{a}</p></motion.div>}</AnimatePresence></div>)}</div>;
}

export function SiteFooter() {
  return <footer className="footer frame contour"><p className="eyebrow light">HAVE A PROJECT IN MIND?</p><Reveal><h2>Let&apos;s build<br/><em>something useful.</em></h2></Reveal><a href={`mailto:${site.email}`} className="footer-email">{site.email} <ArrowUpRight/></a><div className="footer-bottom"><span>© 2026 {site.name.toUpperCase()}</span><div><a href={site.github} target="_blank" rel="noreferrer"><SocialMark name="github"/> GITHUB</a><a href={site.linkedin} target="_blank" rel="noreferrer"><SocialMark name="linkedin"/> LINKEDIN</a><Link href="/contact">CONTACT</Link></div><span>ABUJA · NIGERIA</span></div></footer>;
}

export function PortfolioHome() {
  return <main><SiteHeader/><section className="hero frame contour">
    <motion.div className="hero-copy" initial={false}>
      <p className="eyebrow"><span/> FULL-STACK DEVELOPER · FRONTEND FOCUSED</p>
      <h1>{["Digital products,", "thoughtfully designed,", "carefully built."].map((line,i)=><span className={i===2?'accent-line':''} key={line}><motion.i initial={false}>{line}</motion.i></span>)}</h1>
      <div className="hero-bottom"><p>I turn complex ideas into clear, responsive products—from interface and architecture to deployment.</p><div className="hero-actions"><Link className="talk" href="/contact">START A PROJECT <ArrowUpRight size={17}/></Link><Link className="text-link" href="/works">VIEW MY WORK <ArrowDownRight size={17}/></Link></div></div>
    </motion.div>
    <motion.aside className="hero-console" initial={false} aria-label="Professional summary">
      <div className="console-top"><span>ENGINEERING PROFILE</span><b>● AVAILABLE</b></div>
      <div className="console-photo"><Image src="/omasan.jpg" alt="Portrait of Omasan Etsano" fill priority sizes="(max-width: 900px) 90vw, 430px"/><div className="console-name"><small>OMASAN ETSANO</small><strong>Full-stack<br/>software engineer.</strong></div></div>
      <div className="console-grid"><div><span>04</span><small>FEATURED BUILDS</small></div><div><span>03</span><small>CORE DISCIPLINES</small></div></div>
      <div className="console-focus"><small>CURRENT FOCUS</small><p>Product engineering, AI evaluation and dependable delivery systems.</p></div>
      <div className="console-stack">{['React','TypeScript','Python','Docker'].map(x=><TechBadge name={x} key={x}/>)}</div>
    </motion.aside>
    <div className="hero-status"><span>{site.location}</span><span>SCROLL TO EXPLORE ↓</span></div>
  </section>
  <section className="section frame"><Reveal className="section-head"><p className="eyebrow">01 / SELECTED WORK</p><h2>Work with purpose,<br/><em>built to be remembered.</em></h2><Link href="/works" className="text-link">ALL WORK <ArrowUpRight size={17}/></Link></Reveal><div className="project-grid">{projects.map((p,i)=><ProjectCard key={p.slug} project={p} index={i}/>)}</div></section>
  <section className="approach frame"><Reveal className="section-head"><p className="eyebrow">02 / PROCESS</p><h2>From ambiguity<br/><em>to working software.</em></h2></Reveal><div className="steps">{[['01','Frame the problem','Understand the users, constraints and evidence that define a useful outcome.'],['02','Design the system','Shape information, interface patterns and technical boundaries before adding polish.'],['03','Build the product','Connect responsive frontend work to data, APIs, permissions and real operational flows.'],['04','Test and deliver','Challenge assumptions, fix edge cases, measure quality and prepare a dependable release.']].map(([n,t,d],i)=><Reveal className="step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><i>0{i+1}</i></Reveal>)}</div></section>
  <section className="manifesto frame"><Reveal><p className="eyebrow light">03 / CAPABILITIES</p><h2>I combine visual craft with full-stack engineering to build products that look clear and work hard.</h2></Reveal><div className="tool-ticker"><div>{[...marqueeTools,...marqueeTools].map((x,i)=><TechBadge name={x} key={`${x}-${i}`}/>)}</div></div></section>
  <section className="services section frame"><Reveal className="section-head"><p className="eyebrow">04 / SERVICES</p><h2>Focused expertise.<br/><em>Flexible collaboration.</em></h2></Reveal><div className="service-grid">{services.map((s,i)=>{const Icon=serviceIcons[i];return <Reveal className="service" key={s.name}><span>0{i+1}</span><Icon className="service-icon" aria-hidden/><h3>{s.name}</h3><p>{s.detail}</p><ul>{s.tags.map(t=><li key={t}>{t}</li>)}</ul><ArrowUpRight className="service-arrow"/></Reveal>})}</div></section>
  <section className="experience frame"><Reveal className="section-head"><p className="eyebrow">05 / EXPERIENCE</p><h2>Engineering across<br/><em>products, AI and health.</em></h2></Reveal><div className="timeline">{[['2026 — NOW','SHIPD · PROJECT OLYMPUS','AI coding-agent evaluation'],['2026 — NOW','GEORGETOWN GLOBAL HEALTH','DevOps intern'],['2024','FLEXISAF EDUSOFT','Frontend developer intern']].map((r,i)=><Reveal className="timeline-row" key={i}><span>{r[0]}</span><h3>{r[1]}</h3><p>{r[2]}</p><ArrowUpRight/></Reveal>)}</div><Link href="/about" className="experience-link">FULL PROFILE <ArrowUpRight size={16}/></Link></section>
  <section className="faq-section frame"><Reveal className="section-head"><p className="eyebrow">06 / COMMON QUESTIONS</p><h2>Before we begin.</h2></Reveal><FAQ/></section>
  <SiteFooter/></main>;
}
