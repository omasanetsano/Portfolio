import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { SiteHeader } from "../../components/portfolio-home.tsx";
import { SocialMark } from "../../components/brand-icons.tsx";
import { site } from "../../content/site.ts";
import { ContactForm } from "./contact-form.tsx";

export const metadata = {
  title: "Contact — Omasan Etsano",
  description: "Get in touch about product, website or frontend engineering work.",
};

export default function Contact() {
  return (
    <main>
      <SiteHeader />
      <section className="contact frame contour">
        <div className="contact-copy">
          <p className="eyebrow"><span /> START A CONVERSATION</p>
          <h1>Have an idea?<br /><em>Let&apos;s shape it.</em></h1>
          <p>Tell me what you are building, where you are now, and what a strong outcome looks like.</p>
          <div className="contact-links">
            <a href={`mailto:${site.email}`}><Mail size={17} /><span>{site.email}</span><ArrowUpRight size={16} /></a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}><Phone size={17} /><span>{site.phone}</span></a>
            <a href={site.github} target="_blank" rel="noreferrer"><SocialMark name="github" /><span>GitHub</span><ArrowUpRight size={16} /></a>
            <a href={site.linkedin} target="_blank" rel="noreferrer"><SocialMark name="linkedin" /><span>LinkedIn</span><ArrowUpRight size={16} /></a>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
