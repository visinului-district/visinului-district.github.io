import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'username' and 'repo' accordingly
export default defineConfig({
  plugins: [react()],
  base: '/visinului-district/', // repo name
   build: {
    outDir: 'docs'
  }
})