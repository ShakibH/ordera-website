import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ordera.example.com";
  const routes = ["/", "/services", "/compliance", "/quiz", "/blog", "/contact"].map((r) => ({ url: base + r, changeFrequency: "weekly" as const }));
  return routes;
}











