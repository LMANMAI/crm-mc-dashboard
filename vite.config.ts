import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { 
        find: '@mas-copies/core-contracts', 
        replacement: '/packages/core-contracts/src/index.ts' 
      },
      { 
        find: '@mas-copies/editor-copys', 
        replacement: '/packages/features/editor-copys/src/index.ts' 
      }
    ]
  }
})