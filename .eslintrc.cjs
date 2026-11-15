module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'scripts', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // react-three-fiber uses three.js props (args, attach, position…) that the DOM rule doesn't know.
    'react/no-unknown-property': ['error', { ignore: ['args', 'attach', 'position', 'rotation', 'scale', 'intensity', 'color', 'map', 'transparent', 'opacity', 'blending', 'depthWrite', 'toneMapped', 'metalness', 'roughness', 'wireframe', 'emissive', 'flatShading', 'sizeAttenuation', 'size', 'count', 'array', 'itemSize'] }],
  },
};
