import external from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  external: [
    'react',
    'react-dom',
    'qiscus-sdk-core',
    'superagent',
    'mqtt',
    'websocket-stream',
    'moment',
    'lodash',
    'styled-components',
    'shortid',
    'nanoid',
    'react-confirm-alert'
  ],
  plugins: [
    external(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      preferBuiltins: true
    }),
    // HACK: removes formidable's attempt to overwrite `require`
    replace({
      include: 'node_modules/formidable/lib/*.js',
      values: {
        'if \\(global\\.GENTLY\\) require = GENTLY\\.hijack\\(require\\);': ''
      }
    }),
    typescript({
      rollupCommonJSResolveHack: false,
      exclude: ['**/__tests__/**', 'node_modules/**/*', 'images/*', 'assets/*'],
      clean: true,
      check: false
    }),
    commonjs({
      include: ['node_modules/**'],
      namedExports: {
        'node_modules/react/react.js': [
          'Children',
          'Component',
          'PropTypes',
          'createElement'
        ],
        'node_modules/react-dom/index.js': ['render']
      }
    }),
    postcss({
      extensions: ['.css']
    }),
    json({
      compact: true
    })
  ]
};
