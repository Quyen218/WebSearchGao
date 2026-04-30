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
        // Mã hóa chuỗi (an toàn)
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75,
        rotateStringArray: true,
        shuffleStringArray: true,
        // Đổi tên biến/hàm (an toàn)
        identifierNamesGenerator: 'hexadecimal',
        // Vô hiệu hóa console (an toàn)
        disableConsoleOutput: true,
        // Xóa comments, nén code (an toàn)
        compact: true,
        simplify: true,

        // ❌ KHÔNG dùng các option sau — phá vỡ app trên Vercel/production:
        // selfDefending: true          → gây infinite loop khi code bị bundle
        // debugProtection: true        → block JS thread trước khi app load xong
        // controlFlowFlattening: true  → phá vỡ async/await và Svelte reactivity
        // deadCodeInjection: true      → có thể gây conflict với Svelte compiler
      },
      // Bỏ qua node_modules
      exclude: [/node_modules/],
    }),
  ].filter(Boolean),
}))

