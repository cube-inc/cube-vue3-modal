import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/main.ts'),
        name: 'CubeVue3Modal',
        fileName: 'cube-vue3-modal',
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: 'Vue',
          },
          // exports: 'named',
        },
      },
    },
    plugins: [vue(), dts({ copyDtsFiles: false })],
    server: {
      host: '0.0.0.0',
      port: env.VITE_PORT ? Number(env.VITE_PORT) : 8080,
    },
  }
})
