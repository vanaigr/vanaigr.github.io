import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

const orig = import.meta.dirname
const root = path.join(orig, 'src')

export default defineConfig(() => {
    return {
        root: root,
        publicDir: path.join(root, 'public'),
        build: {
            outDir: path.join(orig, 'build'),
            emptyOutDir: true,
        },
        define: {
            GENERATED_AT: JSON.stringify(new Date().toISOString()),
        },
        resolve: {
            alias: {
                '@': root,
            }
        },
        plugins: [
            react(),
            tailwind(),
        ],
    }
})
