import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslintPlugin from "vite-plugin-eslint";
import {createStyleImportPlugin, AntdResolve} from 'vite-plugin-style-import';
import { resolve } from "path";

function pathResolve(dir) {
  return resolve(process.cwd(), ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      failOnError: false,
      include: ["src/**/*.js", "src/**/*.tsx", "src/**/*.ts"],
    }),
    createStyleImportPlugin({
      resolves: [AntdResolve()]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    postcss:{}
  },
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: `${pathResolve("src")}/`,
      },
    ],
  },
  server: {
    host: 'localhost',
    https: false,
    proxy: {
      '^/api': {
        target: 'http://b.ananjj.top',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    // 是否开启自动刷新
    hmr: true,
    // 是否开启自动打开浏览器
    open: true,
  },
})
