import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
const config = [
  {
    input: 'src/index.ts',
    plugins: [typescript({ tsconfig: 'tsconfig.json' })],
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
