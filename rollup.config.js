import typescript from 'rollup-plugin-typescript2';


export default [
  {
    input: 'src/index.ts',
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
    ],
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
];
