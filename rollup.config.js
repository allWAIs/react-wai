import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
const config = [
  {
    input: 'src/index.ts',
    plugins: [PeerDepsExternalPlugin(), nodeResolve(), commonjs(), image(), typescript({ tsconfig: 'tsconfig.json' })],
    output: [
      { file: 'dist/index.cjs.js', format: 'cjs' },
      { file: 'dist/index.esm.js', format: 'esm' },
      {
        file: 'dist/index.js',
        format: 'es',
        banner: '/* eslint-disable */',
      },
    ],
  },
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
export default config;
