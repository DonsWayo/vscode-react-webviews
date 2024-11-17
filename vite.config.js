import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'out/webviews',
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: 'src/webviews/src/index.tsx',
      output: {
        entryFileNames: 'index.js',
        assetFileNames: '[name][extname]'
      }
    }
  }
})
