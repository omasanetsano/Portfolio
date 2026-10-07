import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  metadataBase: new URL("https://omasan-etsano.vercel.app"),
  title: "Omasan Etsano — Software Engineer",
  description: "Software engineer working across full-stack products, AI evaluation, public-health systems and DevOps. Based in Abuja, Nigeria.",
  openGraph: { title: "Omasan Etsano — Software Engineer", description: "Full-stack products, AI evaluation and dependable delivery systems.", images: [{ url: "/omasan.jpg", width: 1100, height: 1438 }] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${GeistMono.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

