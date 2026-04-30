import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import javascriptObfuscator from 'vite-plugin-javascript-obfuscator'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: './',
  plugins: [
    svelte(),
    // Chỉ mã hóa khi build production
    command === 'build' && javascriptObfuscator({
      options: {
        // Mã hóa chuỗi
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.8,
        rotateStringArray: true,
        shuffleStringArray: true,
        // Làm rối control flow
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.5,
        // Chèn code giả
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.2,
        // Đổi tên biến/hàm
        identifierNamesGenerator: 'hexadecimal',
        // Vô hiệu hóa console
        disableConsoleOutput: true,
        // Chống debug
        debugProtection: true,
        debugProtectionInterval: 4000,
        // Tự phát hiện devtools
        selfDefending: true,
        // Xóa comments
        compact: true,
        simplify: true,
      },
      // Bỏ qua assets và svelte runtime thuần
      exclude: [/node_modules/],
    }),
  ].filter(Boolean),
}))

