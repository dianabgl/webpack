//path existe en node
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

//se crea un módulo que se va a exportar
module.exports = {
    //entry punto de entrada a la aplicación, output a dónde se va a enviar lo que va a preparar webpack (estándar dist)
    //main también se puede encontrar como bunddle
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true,
    //qué extensiones tendrá que utilizar para leer los archivos del proyecto
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
          },
          {
            test: /\.css|\.styl$/i,
            use: [MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
            ],
          },
          {
            test: /\.png/,
            type: 'asset/resource'
          },
          {
            
            test: /\.(woff|woff2)$/i,  // Tipos de fuentes a incluir
            type: 'asset/resource',  // Tipo de módulo a usar (este mismo puede ser usado para archivos de imágenes)
            generator: {
                filename: './assets/fonts/[hash][ext][query]',  // Directorio de salida
            },

            //test: /\.(woff|woff2)$/,
            //use: {
              //  loader: 'url-loader',
                //options: {
                  //  limit: 10000,
                    //mimetype: "applocation/font-woff",
                    //name: "[name].[contenthash].[ext]",
                    //outputPath: "./assets/fonts/",
                    //publicPath: "../assets/fonts/",
                    //esModule: false,
                //}
            //}
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv()
    ],
   
}