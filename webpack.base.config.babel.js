import _ from 'lodash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const common = {
  entry: {
    calendarDemo: './src',
  },
  output: {
    path: `${__dirname}/build`,
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel!eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html',
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss'),
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        removeCDATASectionsFromCDATA: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      },
      template: './src/index.html',
      inject: 'body',
      chunks: ['calendarDemo'],
    }),
  ],
};

function getConfig(particularConfig) {
  function customizer(dest, src) {
    if (_.isArray(dest)) {
      return dest.concat(src);
    }
  }

  return _.mergeWith(common, particularConfig, customizer);
}

const api = {
  getConfig: getConfig
};

export default api;
