import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

export default defineConfig({
  root: "github-pages",
  base: "./",
  publicDir: false,
  plugins: [
    react(),
    {
      name: "copy-github-pages-assets",
      closeBundle() {
        copyFileSync(resolve(process.cwd(), "public/og.png"), resolve(process.cwd(), "docs/og.png"));
        writeFileSync(resolve(process.cwd(), "docs/.nojekyll"), "");
      },
    },
  ],
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
});
