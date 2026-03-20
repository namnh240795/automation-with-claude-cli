import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  resolve: {
    alias: {
      '@': './src',
    },
  },
  source: {
    entry: {
      index: './src/main.tsx',
    },
  },
  output: {
    distPath: {
      root: 'dist',
    },
  },
  html: {
    template: './index.html',
  },
  server: {
    port: 5173,
  },
  tools: {
    rspack: {
      // Enable Rspack's CSS extraction and optimization
      builtins: {
        css: {
          modules: {
            localIdentName: '[folder]__[local]__[hash:base64:5]',
          },
        },
      },
    },
  },
});
