import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [basicSsl()],
  server: {
    host: true, // Internal IP access
    port: 5173,
    https: true,
  },
  build: {
    target: 'esnext',
  },
  base: '/MHBN/',
});
