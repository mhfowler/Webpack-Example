import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
var CopyWebpackPlugin = require('copy-webpack-plugin')

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist'),
  public: path.join(__dirname, 'app/public'),
}

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: PATHS.app + '/index.html',
  filename: 'index.html',
  inject: 'body',
})

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
})

const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  { from: 'app/public', to: 'public' },
])

const base = {
  entry: [
    PATHS.app,
  ],
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: 'index_bundle.js',
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]', // this version, images don't work
        // loader: 'style!css?modules&localIdentName=[local]___[hash:base64:5]',  // this version, images work
      },
      {test: /\.json$/, loader: 'json'},
    ],
  },
  resolve: {
    root: path.resolve('./app'),
  },
  debug: true,
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true,
    proxy: {
      '/api': 'http://127.0.0.1:5000',
    },
    historyApiFallback: true,
  },
  plugins: [HTMLWebpackPluginConfig, CopyWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()],
  output: {
    path: PATHS.build,
    publicPath: 'http://localhost:8080/',
    filename: 'index_bundle.js',
  },
}

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HTMLWebpackPluginConfig, CopyWebpackPluginConfig, productionPlugin],
}

export default Object.assign({}, base, isProduction === true ? productionConfig : developmentConfig)
