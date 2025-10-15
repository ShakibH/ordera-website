import type { MetadataRoute } from "next";

const BASE_URL = "https://orderaconsulting.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly" },
    { url: `${BASE_URL}/services`, changeFrequency: "weekly" },
    { url: `${BASE_URL}/compliance`, changeFrequency: "monthly" },
    { url: `${BASE_URL}/quiz`, changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly" },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly" },
  ];

  // Blog routes (manually mirror slugs from blog data)
  const blogSlugs = [
    "lessons-from-sora-2",
    "rise-of-digital-co-workers",
    "ai-voice-agents-reimagining-patient-communication",
    "ethical-ai-legal-by-design",
    "empowering-employees-with-ai",
    "building-trust-in-ai",
    "safe-ai-adoption-five-rules",
    "roi-from-ai",
  ];
  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    changeFrequency: "weekly",
  }));

  // Service detail routes
  const serviceSlugs = [
    "ai-strategy-roadmaps",
    "model-selection-tuning",
    "workflow-automation",
    "data-integrations",
    "enablement-training",
    "compliance-by-design",
  ];
  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...blogRoutes, ...serviceRoutes];
}













