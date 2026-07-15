import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = process.cwd();
const outputPublicDir = resolve(rootDir, ".output", "public");
const distDir = resolve(rootDir, "dist");

if (!existsSync(outputPublicDir)) {
  console.error("Build output not found at .output/public. Run the Nitro build first.");
  process.exit(1);
}

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });
cpSync(outputPublicDir, distDir, { recursive: true });

console.log("Synced static site files from .output/public to dist/");
