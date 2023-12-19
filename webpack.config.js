const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
      'app': './src/index.js',
      'assets/js/banner': './src/assets/js/banner.js',
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'app'),
        // filename: 'app.js'
        filename: '[name].js',
    },

    devServer: {
        static: {
            directory: path.join(__dirname, '/app'),
        },
        // contentBase: path.join(__dirname, 'app'),
        compress: true,
        devMiddleware: {
            writeToDisk: true,
        },
        port: 8081,
        open: true,
        // allowedHosts: 'all',
    },

    module: {
        rules: [
          {
            test: /\.html$/i,
            loader: 'html-loader',
          },

          {
            test: /\.(sass|css|scss)$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader",
            ],
          },

          {
            test: /\.(svg|eot|woff|woff2|ttf)$/,
            exclude: /images/,
            use: [
              {
                loader: "file-loader", 
                options: {
                  name: '[name].[ext]',
                  outputPath: "assets/fonts",
                }
              }
            ]
          },

          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },

        ]
    },

    plugins: [
    // في حال واجهت مشكلة اختفاء ملف index.html الأساسي من ملفات البناء عدل خصائص إضافة مسح ملفات البناء clean-webpack-plugin كالتالي:
    // new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "assets/css/style.css"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({ 
          filename: "components/button.html",
          template: "./src/components/button.html",
          chunks: ['app']
      }),
      new HtmlWebpackPlugin({ 
        filename: "components/textfield.html",
        template: "./src/components/textfield.html",
        chunks: ['app']
      }),
      new HtmlWebpackPlugin({ 
        filename: "components/card.html",
        template: "./src/components/card.html",
        chunks: ['app']
      }),
      new HtmlWebpackPlugin({ 
        filename: "components/banner.html",
        template: "./src/components/banner.html",
        chunks: ['app', 'assets/js/banner']
      }),
    ]
}