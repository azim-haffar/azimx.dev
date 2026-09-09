import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", ...projects.map((p) => p.caseStudyHref)];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
