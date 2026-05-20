import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  resolve: {
    alias: {
      '$lib': path.resolve(__dirname, './src/lib'),
      '@webs/common': path.resolve(__dirname, '../common/src'),
      '@webs/common/utils': path.resolve(__dirname, '../common/src/lib/utils')
    }
  }
});