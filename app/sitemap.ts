import type { MetadataRoute } from "next";
import { projects } from "../content/site.ts";

const base = "https://omasan-etsano.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, priority: 1 },
    { url: `${base}/works`, priority: 0.9 },
    ...projects.map((p) => ({ url: `${base}/works/${p.slug}`, priority: 0.8 })),
    { url: `${base}/about`, priority: 0.8 },
    { url: `${base}/contact`, priority: 0.6 },
  ];
}
