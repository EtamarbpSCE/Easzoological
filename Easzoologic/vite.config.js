import { defineConfig } from 'vite'
import fs from 'fs';
import path from 'path'
import react from '@vitejs/plugin-react'
const certPath = path.resolve(__dirname, 'localhost.pem');
const keyPath = path.resolve(__dirname, 'localhost-key.pem');
console.log(certPath)
// https://vitejs.dev/config/
// https://vitejs.dev/config/
export default defineConfig({
//   server: {
//     host: '0.0.0.0'
//   },
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  server: {
      host: '0.0.0.0',
      https: {
          key: fs.readFileSync('./.cert/key.pem'),
          cert: fs.readFileSync('./.cert/cert.pem'),
        },  
  },
  base: './',
})
