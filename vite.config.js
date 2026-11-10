import { defineConfig } from 'vite'

// Static build: output goes to dist/ (Vercel detects Vite automatically)
export default defineConfig({
  build: { outDir: 'dist' }
})
