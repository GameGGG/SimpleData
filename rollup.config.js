import json from 'rollup-plugin-json';
import {terser} from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';


export default {
  input: 'src/index.js',
  output: {
    file: 'build/index.js',
    format: 'umd',
    name: 'bundle-name',
  },
  plugins: [
    json(),
    terser(),
    commonjs(),
    eslint({
      include: ['src/**'],
      exclude: ['node_modules/**'],
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
