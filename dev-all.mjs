import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function run(name, cwd) {
  const command = process.platform === "win32" ? "cmd.exe" : "npm";
  const args =
    process.platform === "win32" ? ["/d", "/s", "/c", "npm run dev"] : ["run", "dev"];

  const child = spawn(command, args, {
    cwd,
    stdio: "pipe",
    shell: false,
    env: process.env,
  });

  const prefix = `[${name}]`;

  child.stdout.on("data", (chunk) => {
    process.stdout.write(`${prefix} ${chunk}`);
  });

  child.stderr.on("data", (chunk) => {
    process.stderr.write(`${prefix} ${chunk}`);
  });

  child.on("exit", (code) => {
    process.stderr.write(`${prefix} exited with code ${code ?? "null"}\n`);
  });

  return child;
}

const site = run("site", __dirname);
const admin = run("admin", path.join(__dirname, "admin"));

function shutdown(signal) {
  site.kill(signal);
  admin.kill(signal);
  process.exit(0);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
