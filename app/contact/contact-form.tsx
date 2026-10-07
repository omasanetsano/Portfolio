"use client";
import { useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, Mail, MessageSquareText, UserRound } from "lucide-react";
import { site } from "../../content/site.ts";

type Status = "idle" | "sending" | "sent" | "error";

function openMail(data: FormData) {
  const subject = encodeURIComponent(`Portfolio enquiry: ${data.get("type") || "New project"}`);
  const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nProject type: ${data.get("type")}\n\n${data.get("message")}`);
  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (res.ok) {
        form.reset();
        setStatus("sent");
        return;
      }
      // The mail service is not set up (or is down): fall back to the visitor's email app.
      if (res.status === 503 || res.status === 502) {
        setStatus("idle");
        openMail(data);
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="success" role="status">
        <span>✓</span>
        <h2>Message sent.</h2>
        <p>Thanks for reaching out. I will reply to the email address you gave, usually within a couple of days.</p>
        <button type="button" onClick={() => setStatus("idle")}>SEND ANOTHER</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <label><span><UserRound /> YOUR NAME</span><input required name="name" maxLength={120} placeholder="Name" autoComplete="name" /></label>
      <label><span><Mail /> EMAIL ADDRESS</span><input required type="email" name="email" maxLength={200} placeholder="you@example.com" autoComplete="email" /></label>
      <label><span><BriefcaseBusiness /> PROJECT TYPE</span><select name="type" defaultValue=""><option value="" disabled>Select a service</option><option>Website design</option><option>Product design</option><option>Full-stack development</option><option>Frontend development</option></select></label>
      <label><span><MessageSquareText /> ABOUT THE PROJECT</span><textarea required name="message" maxLength={5000} placeholder="A little about the project, timing and goals…" rows={6} /></label>
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <button className="talk" type="submit" disabled={status === "sending"}>{status === "sending" ? "SENDING…" : "SEND MESSAGE"} <ArrowUpRight /></button>
      {status === "error" && <small role="alert">Something went wrong. Please try again, or email {site.email} directly.</small>}
    </form>
  );
}
