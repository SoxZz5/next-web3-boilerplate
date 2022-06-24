/* eslint-disable import/no-anonymous-default-export */
import nodePolyfills from 'rollup-plugin-polyfill-node';
const production = process.env.NODE_ENV === 'production';

export default {
  plugins: [
    !production &&
      nodePolyfills({
        include: [
          'node_modules/**/*.js',
          new RegExp('node_modules/.vite/.*js'),
        ],
      }),
  ],
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
};
