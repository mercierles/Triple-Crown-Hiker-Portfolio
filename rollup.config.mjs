import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";

export default  {
  input: [
    './public/js/dev/blog.js',
    './public/js/dev/fitbit.js',
    './public/js/dev/index.js',
    './public/js/dev/instagram.js',
    './public/js/dev/lighter-pack.js',
    './public/js/dev/page-load.js',
    './public/js/dev/pct-map.js',
    './public/js/dev/session-helper.js',
    './public/js/dev/trail-map-helper.js',
  ],
  // external: [/node_modules/],
  plugins: [nodeResolve(),commonjs(),replace({
    'process.env.NODE_ENV': JSON.stringify( 'production' )
  })],
  output: {
    dir:'./public/js/prod',
    format: 'esm'
  },
};