import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

export default defineConfig({
  root: "github-pages",
  base: "./",
  publicDir: resolve(process.cwd(), "public"),
  plugins: [
    react(),
    {
      name: "copy-github-pages-assets",
      closeBundle() {
        writeFileSync(resolve(process.cwd(), "docs/.nojekyll"), "");
      },
    },
  ],
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
});
