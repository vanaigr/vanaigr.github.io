import { defineConfig } from 'vite'
import path from 'node:path'

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
        }
    }
})
