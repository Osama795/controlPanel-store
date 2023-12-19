const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'app'),
        filename: 'app.js'
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
        }),
    ]
}