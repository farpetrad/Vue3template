const path = require('path');

const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackBundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

// Output location
const appOutputPath = './wwwroot/Scripts/Bundle';
const styleOutputPath = '../../Content/Styles';
const imgOutputPath = '../../Content';
const pageOutputPath = './wwwroot/';

// App lication in sln
const appbasePath = './ClientApp/';

// Paths
const scriptPath = './Scripts/Bundle/';
const stylePath = '/Content/Styles';

const environmentName = (process.env.NODE_ENV || '').trim();
const isProduction = environmentName === 'production';


console.log(`Using babel config: ${path.resolve(__dirname, './babel.config.js')}`);

module.exports = {
    context: path.resolve(__dirname, appbasePath),
    entry: {
        main: './main.js',
    },
    externals: {
        //vue: 'Vue'
    },

  mode: environmentName,
  output: {
    path: path.resolve(__dirname, appOutputPath),
    publicPath: scriptPath,
    filename: `[name]${isProduction ? '.[chunkhash]' : ''}.js`,
    sourceMapFilename: '[file].map',
  },
  resolve: {
    extensions: ['.vue', '.js', '.json'],
    alias: {
      components: path.resolve(__dirname, appbasePath + 'components'),
      views: path.resolve(__dirname, appbasePath + 'views'),
    }
  },
  module: {
    rules: [      
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          hotReload: isProduction ? false : true,
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include:[
            path.resolve(__dirname, appbasePath),
        ],
        options:{
            configFile: path.resolve(__dirname, './babel.config.js'),    
        }
      },
      {
        test: /\.*scss$/,
        use: [
          MiniCssExtractPlugin.loader,          
          'css-loader',
          {
            loader: 'sass-loader',
              options: {
                  sassOptions: {
                    indentedSyntax: false,
                  }
              
            },
          },
        ],
      },
      {
        test: /\.*sass$/,
        use: [
          MiniCssExtractPlugin.loader,          
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
                sassOptions: {
                    indentedSyntax: true,
                }
            },
          },
        ],
      },
      {
        test: /\.css$/,
          use: [
              MiniCssExtractPlugin.loader,
              'style-loader!css-loader'
          ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
              name: '[name].[ext]?[hash]',
              outputPath: imgOutputPath + '/Images',
            },
          },
        ],
      },
    ],
  },
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
            dry: false,
            dangerouslyAllowCleanPatternsOutsideProject: true,
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                '../../**/*.css',
                '../../*.html'
            ],
        }),

      new VueLoaderPlugin(),

      new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          '__VUE_OPTIONS_API__': true,          // disables vue2 style code when set to false
          '__VUE_PROD_DEVTOOLS__': !isProduction
      }),

      new HtmlWebpackPlugin({
          title: 'Vuetemplate',
          filename: path.resolve(__dirname, pageOutputPath + 'index.html'),
          inject: true,
          template: path.resolve(__dirname, appbasePath + '/public/index.html'),
      }),
      new ScriptExtHtmlWebpackPlugin({
          custom: {
              test: /\.js$/,
              attribute: 'nonce',
              value: '__replaceme__'
          }
      }),

      new MiniCssExtractPlugin({
          filename: isProduction ? styleOutputPath + '[name].[hash].css' : styleOutputPath + '[name].css',
          chunkFilename: isProduction ? styleOutputPath + '[id].[hash].css' : styleOutputPath + '[id].css',
      }),

     //new WebpackBundleAnalyzerPlugin(),
  ],
  optimization: {
      moduleIds: 'deterministic',
      chunkIds: 'named',
      runtimeChunk: {
          name: 'runtime',
      },
      splitChunks: {
          cacheGroups: {
              vendor: {
                  chunks: 'all',
                  test: /[\\/]node_modules[\\/]/,
                  enforce: true,
                  name(module) {
                      // get the name. E.g. node_modules/packageName/not/this/part.js
                      // or node_modules/packageName
                      const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                      // npm package names are URL-safe, but some servers don't like @ symbols
                      return `npm.${packageName.replace('@', '')}`;
                  },
              },
          },
      },
  },
};

switch (process.env.NODE_ENV) {
  case 'production':
    module.exports.devtool = undefined;
    module.exports.optimization.minimize = true;

    module.exports.optimization.minimizer = (module.exports.optimization.minimizer || []).concat([
      new OptimizeCssPlugin(),
        new TerserPlugin({ parallel: true }),
    ]);

    break;
  case 'development':
    module.exports.devtool = 'source-map';

    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.SourceMapDevToolPlugin({
        moduleFilenameTemplate: path.relative(appOutputPath, '[resourcePath]'),
      }),
    ]);

    break;
  default:
    break;
}
