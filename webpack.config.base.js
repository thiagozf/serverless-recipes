const path = require('path')

module.exports = ({ root }) => {
  return {
    entry: path.join(root, 'src/index.ts'),
    target: 'node',
    output: {
      libraryTarget: 'commonjs',
      path: path.join(root, 'build'),
      filename: 'index.js'
    },
    // Generate sourcemaps for proper error messages
    devtool: 'source-map',
    externals: ['aws-sdk', 'bufferutil', 'utf-8-validate'],
    mode: 'production',
    optimization: {
      // We no not want to minimize our code.
      minimize: false
    },
    performance: {
      // Turn off size warnings for entry points
      hints: false
    },
    // Run babel on all .js files and skip those in node_modules
    module: {
      exprContextCritical: false,
      rules: [
        {
          test: /\.(ts|js)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            babelrc: true
          }
        }
      ]
    },
    resolve: {
      modules: [path.resolve(root, 'node_modules'), 'node_modules'],
      extensions: ['.mjs', '.ts', '.js', '.json']
    }
  }
}
