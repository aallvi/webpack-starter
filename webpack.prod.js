const HtmlWebPackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin           = require("copy-webpack-plugin");
 

const Cssminimizer = require("css-minimizer-webpack-plugin")
const Terser = require("terser-webpack-plugin")

module.exports = {
    mode: 'production', 

    output: {
        clean: true,
        filename: 'main.[contenthash].js'
    },




    module: {
        rules: [
        {
            test: /\.html$/i,
            loader: 'html-loader',
            options: {
            // Disables attributes processing
            sources: false,
            minimize: false,
            },
        },
        {
          test:  /\.css$/,
          exclude: /styles.css$/,
          use : ['style-loader', 'css-loader' ]
        },
        {

            test : /styles.css$/,
            use : [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
            test: /\.(png|jpe?g|gif)$/,
            loader: 'file-loader'
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
          }
        





        ]
    },
    optimization : {
        minimize: true,
        minimizer: [
            new Cssminimizer(),
            new Terser(),
        ]



    },

    plugins: [
        new HtmlWebPackPlugin({
            title: 'Mi webpackApp',
            filename: 'index.html',
            template: './src/index.html'
        
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css'
        }),
        new CopyPlugin({
            patterns: [
                {from: 'src/assets/', to: 'assets/'}
            ]
        })
    ]
}