import type { MetadataRoute } from "next";

const baseUrl = "https://www.davidkjellstrand.com";

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = ["", "/about", "/cv"];

	return routes.map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date(),
	}));
}
