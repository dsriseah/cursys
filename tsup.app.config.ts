import { defineConfig } from 'tsup';

export default defineConfig([
  // Node/server app build
  {
    entry: { 'serve': 'src/node/serve.ts' },
    format: ['cjs'],
    outDir: '_out/node',
    dts: false,
    tsconfig: 'tsconfig.node.json',
    clean: false,
    splitting: false,
    sourcemap: true,
    minify: false,
    target: 'node18'
  },
  // Web app build
  {
    entry: { 'main': 'src/web/main.ts' },
    format: ['esm'],
    outDir: '_out/web',
    dts: false,
    tsconfig: 'tsconfig.web.json',
    clean: false,
    splitting: false,
    sourcemap: true,
    minify: false,
    target: 'es2020'
  }
]);
