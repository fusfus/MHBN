import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { resolve } from 'path';

export default defineConfig({
    plugins: [basicSsl()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/MotionHand.js'),
            name: 'MotionHand',
            fileName: 'motion-hand',
            formats: ['es', 'umd'], // Generate ESM and UMD bundles
        },
        rollupOptions: {
            // Externalize deps that shouldn't be bundled if any
            // For a widget, we usually want to bundle everything except maybe huge frameworks?
            // But MediaPipe is imported... we might want to keep it internal so it's a single file solution.
        },
        target: 'esnext',
        outDir: 'dist/lib', // Output to a subfolder
        emptyOutDir: true,
    },
    base: '/MHBN/',
});
