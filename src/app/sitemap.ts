import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const PATHS = ["", "/how-it-works", "/charity-market-cap", "/emergency-pool", "/charities", "/cherrions", "/faq", "/about", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "weekly", priority: p === "" ? 1 : 0.7 }));
}
