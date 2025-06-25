import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    'node/serve': 'src/node/serve.ts',
    'web/main': 'src/web/main.ts',
    'lib-web/lib-web': 'src-lib/lib-web.ts',
    'lib-node/lib-node': 'src-lib/lib-node.ts',
  },
  format: ['cjs', 'esm'],
  target: ['node18', 'es2020'],
  outDir: '_dist',
  clean: true,
  dts: true,
  splitting: false,
  sourcemap: true,
  minify: false,
  // Bundle dependencies for web builds
  noExternal: ['socket.io-client'],
}) 