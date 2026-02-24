import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const candidateDirs = ["app", "src", "pages", "components"];
const allowedExtensions = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".mjs",
  ".cjs",
  ".css",
  ".mdx",
  ".html",
]);

const checks = [
  { label: "text-[#", regex: /text-\[#/g },
  { label: "bg-[#", regex: /bg-\[#/g },
  { label: "border-[#", regex: /border-\[#/g },
  { label: "-[#", regex: /-\[#/g },
  { label: "-[", regex: /-\[/g },
  { label: "bg-white", regex: /\bbg-white\b/g },
  { label: "bg-black", regex: /\bbg-black\b/g },
  { label: "text-white", regex: /\btext-white\b/g },
  { label: "text-black", regex: /\btext-black\b/g },
];

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function collectFiles(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) {
        continue;
      }
      files.push(...(await collectFiles(fullPath)));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (allowedExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function findViolations(content, relativePath) {
  const violations = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    for (const check of checks) {
      check.regex.lastIndex = 0;
      if (check.regex.test(line)) {
        violations.push({
          file: relativePath,
          line: i + 1,
          check: check.label,
          text: line.trim(),
        });
      }
    }
  }

  return violations;
}

async function main() {
  const violations = [];

  for (const dirName of candidateDirs) {
    const dirPath = path.join(rootDir, dirName);
    if (!(await pathExists(dirPath))) {
      continue;
    }

    const files = await collectFiles(dirPath);
    for (const filePath of files) {
      const content = await fs.readFile(filePath, "utf8");
      const relativePath = path.relative(rootDir, filePath);
      violations.push(...findViolations(content, relativePath));
    }
  }

  if (violations.length > 0) {
    console.error("Tailwind token audit failed. Found forbidden patterns:");
    for (const v of violations) {
      console.error(`${v.file}:${v.line} [${v.check}] ${v.text}`);
    }
    process.exit(1);
  }

  console.log("Tailwind token audit passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
