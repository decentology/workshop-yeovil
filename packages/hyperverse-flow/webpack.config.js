const path = require('path');
const webpack = require('webpack');
const packageJSON = require('./package.json');

const configuration = {
  mode: 'production',
  entry: [
    path.resolve(__dirname, './source/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'distribution'),
    filename: 'bundle.js',
    library: {
      name: packageJSON.name,
      type: 'umd'
    }
  },
  devtool: 'eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        resolve: {
          fullySpecified: false
        },
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  resolve: {
    fallback: {
      'http': require.resolve('stream-http'),
      'https': require.resolve('https-browserify'),
      'url': require.resolve('url/'),
      'buffer': require.resolve('buffer/'),
      'crypto': require.resolve('crypto-browserify'),
      'stream': require.resolve('stream-browserify')
    },
    alias: {
      react: path.resolve(__dirname, './node_modules/react/'),
      '@decentology/hyperverse': path.resolve(__dirname, './node_modules/@decentology/hyperverse')
    },
    symlinks: false
  },
  externals: {
    'react': 'react',
    'react-dom': 'reactDOM',
    '@decentology/hyperverse': '@decentology/hyperverse'
  },
};

module.exports = configuration;