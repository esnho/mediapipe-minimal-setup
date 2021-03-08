const path = require('path');

const Webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.BUILD === 'production';

// html output
const htmlTitle = 'Mediapipe Demo';
const htmlFileName = './index.html';
const htmlTemplate = './Index.html';

const port = process.env.PORT || 8181;

// bundle directives
const outputName = 'mediapipe-first-demo';
const sourcePath = path.join(__dirname, 'src');
const outPath = path.join(__dirname, 'dist');
const entry = {
  'index': ['./Index.ts']
};

console.info({
  productionMode: isProduction
});

const plugins = [
  new Webpack.EnvironmentPlugin({
    BUILD: process.env.BUILD,
    NODE_ENV: process.env.BUILD,
  }),
  new MiniCssExtractPlugin({ filename: '[name].css' }),
  new HtmlWebpackPlugin({
    title: htmlTitle,
    filename: htmlFileName,
    template: htmlTemplate
  })
];

const devPlugins = [
  new Webpack.HotModuleReplacementPlugin()
];

const prodPlugins = [
  new BundleAnalyzerPlugin({
    analyzerMode: (isProduction) ? 'static' : 'disabled',
    openAnalyzer: false
  })
];

module.exports = {
  context: sourcePath,
  entry: entry,
  output: {
    path: outPath,
    filename: `${outputName}.js`,
    chunkFilename: `${outputName}-[name].js`
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    symlinks: false
  },
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.(tsx?)|(jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/env' , {
                'targets': {
                  'browsers': ['>1%', 'not ie 1-11']
                },
                useBuiltIns: 'usage',
                corejs: '3',
              }],
              '@babel/typescript'
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-transform-typescript',
              '@babel/plugin-transform-runtime',
              ['@babel/proposal-class-properties', { 'loose': true }]
            ]
          }
        }
      }, {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            }
          },
          'css-loader',
          'sass-loader',
        ],
      },
      { test: /\.(jpe?g|gif|woff|woff2|ttf|otf|eot|svg)$/, loader: 'file-loader?name=assets/[name].[ext]' },
      { 
        test: /\.png$/i,
        use: [{
          loader: 'url-loader',
          options: { limit: false },
        }]
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ],
  },
  plugins: (isProduction) ? [
    ...plugins,
    ...prodPlugins
  ] : [
    ...plugins,
    ...devPlugins
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    headers: { 'Access-Control-Allow-Origin': '*' },
    host: '0.0.0.0',
    hot: true,
    port: port,
    stats: {
      warnings: false
    }
  },
  node: {
    fs: 'empty',
    net: 'empty'
  }
};
