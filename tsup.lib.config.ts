import { defineConfig } from 'tsup';

export default defineConfig([
  // Web ESM library build: .js and .d.ts
  {
    entry: { 'lib-web': 'src-lib/lib-web.ts' },
    format: ['esm'],
    outDir: '_exports',
    outExtension: () => ({ js: '.js' }),
    dts: { resolve: true, entry: 'src-lib/lib-web.ts' },
    tsconfig: 'tsconfig.web.json',
    clean: true,
    splitting: false,
    sourcemap: true,
    minify: false,
    target: 'es2020'
  },
  // Node CJS/ESM library build: .cjs, .mjs, and .d.ts/.d.mts
  {
    entry: { 'lib-node': 'src-lib/lib-node.ts' },
    format: ['cjs', 'esm'],
    outDir: '_exports',
    outExtension({ format }) {
      if (format === 'cjs') return { js: '.cjs' };
      if (format === 'esm') return { js: '.mjs' };
      return { js: '.js' };
    },
    dts: { resolve: true, entry: 'src-lib/lib-node.ts' },
    tsconfig: 'tsconfig.node.json',
    clean: true,
    splitting: false,
    sourcemap: true,
    minify: false,
    target: 'node18'
  }
]);
