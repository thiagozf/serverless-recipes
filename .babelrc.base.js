const babel = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '10.16'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-transform-typescript-metadata',
    'babel-plugin-parameter-decorator',
    ['babel-plugin-lodash', { id: ['lodash'] }]
  ].filter(Boolean)
}

module.exports = babel
