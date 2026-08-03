import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const ORIGIN = "https://devrajchatribin.com";
const OUT_DIR = join(process.cwd(), "reference-dump", "devrajchatribin.com");

const SEED_PATHS = ["/", "/about", "/contact", "/projects"];

const SKIP_PATHS = new Set(["/manifest.webmanifest", "/favicon.ico"]);

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

function pathToFile(pathname) {
  if (pathname === "/") return join(OUT_DIR, "index.html");
  const clean = pathname.replace(/^\//, "");
  return join(OUT_DIR, clean, "index.html");
}

function extractPaths(html) {
  const paths = new Set();
  for (const match of html.matchAll(/href="(\/[^"#?]*?)"/g)) {
    const path = normalizePath(match[1]);
    if (path.startsWith("/_next") || path.startsWith("/cdn-cgi") || SKIP_PATHS.has(path)) continue;
    paths.add(path);
  }
  for (const match of html.matchAll(/"(\/projects\/[a-z0-9-]+)"/g)) {
    paths.add(normalizePath(match[1]));
  }
  for (const match of html.matchAll(/(\/projects\/[a-z0-9-]+)/g)) {
    paths.add(normalizePath(match[1]));
  }
  return paths;
}

async function fetchHtml(path) {
  const url = `${ORIGIN}${path === "/" ? "" : path}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "portfolio-v4-reference-dump/1.0" },
  });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return { url, html: await res.text() };
}

async function main() {
  const queue = [...SEED_PATHS.map(normalizePath)];
  const seen = new Set();
  const saved = [];

  while (queue.length) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);

    process.stdout.write(`fetch ${path}\n`);
    let result;
    try {
      result = await fetchHtml(path);
    } catch (err) {
      process.stderr.write(`skip ${path}: ${err.message}\n`);
      continue;
    }

    const file = pathToFile(path);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, result.html, "utf8");
    saved.push({ path, file: file.replace(process.cwd(), "").replace(/^\\/, "") });

    for (const next of extractPaths(result.html)) {
      if (!seen.has(next) && !queue.includes(next)) queue.push(next);
    }
  }

  const manifest = {
    origin: ORIGIN,
    dumpedAt: new Date().toISOString(),
    pages: saved.sort((a, b) => a.path.localeCompare(b.path)),
  };

  await writeFile(
    join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8",
  );

  process.stdout.write(`done: ${saved.length} pages\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
