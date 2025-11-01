import type { MetadataRoute } from "next";
import { allPosts } from "./(routes)/blog/posts";

const BASE_URL = "https://orderaconsulting.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", lastModified: now },
    { url: `${BASE_URL}/services`, changeFrequency: "weekly", lastModified: now },
    { url: `${BASE_URL}/compliance`, changeFrequency: "monthly", lastModified: now },
    { url: `${BASE_URL}/quiz`, changeFrequency: "monthly", lastModified: now },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", lastModified: now },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly", lastModified: now },
  ];

  // Blog routes (manually mirror slugs from blog data)
  const blogRoutes: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    changeFrequency: "weekly",
    lastModified: new Date(post.date),
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
    lastModified: now,
  }));

  return [...staticRoutes, ...blogRoutes, ...serviceRoutes];
}













