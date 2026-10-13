import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Manrope } from "next/font/google";
import { site } from "../content/site.ts";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  metadataBase: new URL("https://omasan-etsano.vercel.app"),
  title: "Omasan Etsano — Software Engineer",
  description: "Software engineer working across full-stack products, AI evaluation, public-health systems and DevOps. Based in Abuja, Nigeria.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: { type: "website", siteName: "Omasan Etsano", title: "Omasan Etsano — Software Engineer", description: "Full-stack products, AI evaluation and dependable delivery systems.", images: [{ url: "/omasan.jpg", width: 1100, height: 1438 }] },
  twitter: { card: "summary_large_image" },
};

export const viewport = { themeColor: "#0c0c0c", colorScheme: "dark" as const };

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.shortName,
  jobTitle: site.role,
  url: "https://omasan-etsano.vercel.app",
  image: "https://omasan-etsano.vercel.app/omasan.jpg",
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Abuja", addressCountry: "NG" },
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${GeistMono.variable}`}>
      <body suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        {children}
      </body>
    </html>
  );
}

