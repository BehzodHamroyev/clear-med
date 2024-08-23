import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [svgr({ exportAsDefault: true }), react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  assetsInclude: ['**/*.mov','**/*.mp3'],

  define: {
    __IS_DEV__: JSON.stringify(true),

    // ----------  Server ----------
    __API__: JSON.stringify('http://socketmed.magicsoft.uz/'),
    __PROJECT__: JSON.stringify('frontend'),
  },
});
