// Server-side GitHub repo metadata helpers shared by the landing page and the
// Available Plugins catalog. These run at build time to bake plugin card data
// (version, description, stars, download link) into the static HTML — no
// requests are made from visitors' browsers.
//
// Unauthenticated GitHub API access is capped at 60 requests/hour per IP, which
// a build can exhaust and silently fall back to empty cards. Set GITHUB_TOKEN
// (CI provides one automatically) to lift the limit to 5000/hour.
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

const apiHeaders: Record<string, string> = {
	Accept: "application/vnd.github+json",
	"User-Agent": "ocelescope-docs",
	...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
};

export function repoParts(githubUrl: string) {
	try {
		const url = new URL(githubUrl);
		const [owner, repo] = url.pathname.split("/").filter(Boolean);
		if (url.hostname !== "github.com" || !owner || !repo) return null;
		return {
			owner,
			repo,
			apiBase: `https://api.github.com/repos/${owner}/${repo}`,
		};
	} catch {
		return null;
	}
}

export function formatStars(stars?: number) {
	if (typeof stars !== "number") return undefined;
	if (stars >= 1000)
		return `${(stars / 1000).toFixed(stars >= 10000 ? 0 : 1)}k stars`;
	return `${stars} star${stars === 1 ? "" : "s"}`;
}

export function formatUpdated(date?: string) {
	if (!date) return undefined;
	const parsed = new Date(date);
	if (Number.isNaN(parsed.getTime())) return undefined;
	return `updated ${parsed.toLocaleDateString("en", { month: "short", year: "numeric" })}`;
}

function decodeBase64(value?: string) {
	if (!value) return undefined;
	try {
		return Buffer.from(value, "base64").toString("utf8");
	} catch {
		return undefined;
	}
}

function normalizeAboutText(markdown?: string) {
	if (!markdown) return undefined;

	const lines = markdown.replaceAll("\r\n", "\n").split("\n");
	const headingIndex = lines.findIndex((line) =>
		/^#{1,6}\s+about\s*$/i.test(line.trim()),
	);
	const startIndex = headingIndex >= 0 ? headingIndex + 1 : 0;
	const slice = lines.slice(startIndex);
	const buffer: string[] = [];

	for (const line of slice) {
		const trimmed = line.trim();
		if (!trimmed) {
			if (buffer.length) break;
			continue;
		}
		if (/^#{1,6}\s+/.test(trimmed) && buffer.length) break;
		if (/^#{1,6}\s+about\s*$/i.test(trimmed) && !buffer.length) continue;
		buffer.push(trimmed);
	}

	const text = buffer.join(" ");
	if (!text) return undefined;

	return text
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		.replace(/[`*_>#]/g, "")
		.replace(/\s+/g, " ")
		.trim();
}

export async function latestRepoVersion(githubUrl: string) {
	const repo = repoParts(githubUrl);
	if (!repo) return undefined;

	try {
		const release = await fetch(`${repo.apiBase}/releases/latest`, {
			headers: apiHeaders,
		});
		if (release.ok) {
			const data = await release.json();
			return data.tag_name || data.name || undefined;
		}
	} catch {
		// Continue with release feed and tag fallbacks.
	}

	try {
		const feed = await fetch(
			`https://github.com/${repo.owner}/${repo.repo}/releases.atom`,
			{ headers: { Accept: "application/atom+xml" } },
		);
		if (feed.ok) {
			const text = await feed.text();
			const titles = [...text.matchAll(/<title>\s*([^<]+?)\s*<\/title>/g)].map(
				(match) => match[1]?.trim(),
			);
			const title = titles.find(
				(item) => item && !item.toLowerCase().includes("release notes from"),
			);
			if (title) return title;
		}
	} catch {
		// Continue with tag fallback.
	}

	try {
		const tags = await fetch(`${repo.apiBase}/tags?per_page=10`, {
			headers: apiHeaders,
		});
		if (!tags.ok) return undefined;
		const tagList = await tags.json();
		const tag = tagList.find(
			(item: { name?: string }) =>
				typeof item?.name === "string" && item.name.trim(),
		);
		return tag?.name || undefined;
	} catch {
		return undefined;
	}
}

export async function latestReleaseAsset(githubUrl: string) {
	const repo = repoParts(githubUrl);
	if (!repo) return undefined;

	try {
		const release = await fetch(`${repo.apiBase}/releases/latest`, {
			headers: apiHeaders,
		});
		if (!release.ok) return undefined;
		const data = await release.json();
		const asset = Array.isArray(data.assets) ? data.assets[0] : undefined;
		if (asset?.browser_download_url) return asset.browser_download_url;
		// No uploaded asset on the release — fall back to the tagged source zip.
		if (data.tag_name) {
			return `https://github.com/${repo.owner}/${repo.repo}/archive/refs/tags/${data.tag_name}.zip`;
		}
		return undefined;
	} catch {
		return undefined;
	}
}

export async function repoDetails(githubUrl: string) {
	const repo = repoParts(githubUrl);
	if (!repo) return {};

	let description: string | undefined;
	let about: string | undefined;
	let stars: string | undefined;
	let updated: string | undefined;

	try {
		const response = await fetch(repo.apiBase, {
			headers: apiHeaders,
		});
		if (response.ok) {
			const details = await response.json();
			description = details.description || undefined;
			stars = formatStars(details.stargazers_count);
			updated = formatUpdated(details.pushed_at || details.updated_at);
		}
	} catch {
		// Continue with public page metadata fallback.
	}

	try {
		const readmeResponse = await fetch(`${repo.apiBase}/readme`, {
			headers: apiHeaders,
		});
		if (readmeResponse.ok) {
			const readme = await readmeResponse.json();
			about = normalizeAboutText(decodeBase64(readme.content));
		}
	} catch {
		// Leave about unset when GitHub does not expose the README.
	}

	return { description, about, stars, updated };
}

export type Plugin = {
	name: string;
	href: string;
	monogram: string;
	author?: string;
	description?: string;
	showLanding?: boolean;
	doi?: string;
};

// Pre-fills each plugin with repo metadata, latest version, and download link.
export async function enrichPlugins<T extends Plugin>(plugins: T[]) {
	return Promise.all(
		plugins.map(async (plugin) => ({
			...plugin,
			...(await repoDetails(plugin.href)),
			version: await latestRepoVersion(plugin.href),
			download: await latestReleaseAsset(plugin.href),
		})),
	);
}
