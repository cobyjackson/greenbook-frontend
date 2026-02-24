import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const inputPath = path.join(rootDir, "tokens", "sys.tokens.json");
const cssOutputPath = path.join(rootDir, "styles", "tokens.css");
const tailwindOutputPath = path.join(rootDir, "tailwind", "tokens.js");

const needsPx = (dotKey) =>
  dotKey.startsWith("sys.spacing.") ||
  dotKey.startsWith("sys.radius.") ||
  dotKey.startsWith("sys.border.") ||
  (dotKey.startsWith("sys.typography.") &&
    (dotKey.endsWith(".size") ||
      dotKey.endsWith(".lineHeight") ||
      dotKey.endsWith(".letterSpacing")));

function flatten(obj, prefix = "", out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v) && "value" in v) {
      out[next] = v.value;
    } else if (v && typeof v === "object" && !Array.isArray(v)) {
      flatten(v, next, out);
    }
  }
  return out;
}

function cssVarName(dotKey) {
  return `--${dotKey.replace(/\./g, "-")}`;
}

function cssValue(dotKey, raw) {
  if (!needsPx(dotKey)) return String(raw);
  if (typeof raw === "number") return `${raw}px`;
  return String(raw);
}

function buildTailwindObject() {
  return `// GENERATED FILE — do not edit by hand
// Source: /tokens/sys.tokens.json
export const tokens = {
  colors: {
    surface: {
      primary: "var(--sys-color-surface-primary)",
      secondary: "var(--sys-color-surface-secondary)",
    },
    text: {
      primary: "var(--sys-color-text-primary)",
      secondary: "var(--sys-color-text-secondary)",
      muted: "var(--sys-color-text-muted)",
    },
    divider: { primary: "var(--sys-color-divider-primary)" },
  },
  spacing: {
    2: "var(--sys-spacing-2)",
    4: "var(--sys-spacing-4)",
    6: "var(--sys-spacing-6)",
    8: "var(--sys-spacing-8)",
    10: "var(--sys-spacing-10)",
    12: "var(--sys-spacing-12)",
    safeBottom: "var(--sys-spacing-safeBottom)",
  },
  borderRadius: {
    sm: "var(--sys-radius-sm)",
    md: "var(--sys-radius-md)",
  },
  letterSpacing: {
    hero: "var(--sys-typography-hero-letterSpacing)",
    meta: "var(--sys-typography-meta-letterSpacing)",
  },
};
`;
}

async function main() {
  const raw = await fs.readFile(inputPath, "utf8");
  const parsed = JSON.parse(raw);

  const flat = flatten(parsed);

  const cssLines = [":root {"];
  for (const [dotKey, rawVal] of Object.entries(flat)) {
    const name = cssVarName(dotKey);
    const val = cssValue(dotKey, rawVal);
    cssLines.push(`  ${name}: ${val};`);
  }
  cssLines.push("}");
  cssLines.push("");

  await fs.mkdir(path.dirname(cssOutputPath), { recursive: true });
  await fs.mkdir(path.dirname(tailwindOutputPath), { recursive: true });

  await fs.writeFile(cssOutputPath, cssLines.join("\n"), "utf8");
  await fs.writeFile(tailwindOutputPath, buildTailwindObject(), "utf8");

  console.log("✅ Generated styles/tokens.css and tailwind/tokens.js");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
