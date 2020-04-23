const webpack = require( 'webpack' )
const path    = require( 'path' )
const config  = require( './src/config' )

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin      = require('html-webpack-plugin')
const HtmlWebpackTemplate    = require('html-webpack-template')
const GoogleFontsPlugin      = require("google-fonts-webpack-plugin")
const ExtractTextPlugin      = require('extract-text-webpack-plugin')

const makeAbsolute = _path => {
    return path.normalize(path.resolve(__dirname, _path))
}

module.exports = {
    entry: {
        app: makeAbsolute( path.join( 'src', 'main.js' ) )
    },
    output: {
        filename: '[name].js',
        path: makeAbsolute( 'app' )
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".scss", ".css"]
    },
    plugins: [
        /* new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'LIMS',
            inject: false,
            template: HtmlWebpackTemplate,
            appMountId: 'app',
            mobile: true,
            links: [ "https://fonts.googleapis.com/icon?family=Material+Icons" ],
            meta:  [
                { "apple-mobile-web-app-capable": "yes" },
                { "apple-mobile-web-app-status-bar-style": "black" },
                { "viewport": "user-scalable=no, width=device-width" }
            ]
        }),
        new ExtractTextPlugin( "styles.css" ), */
        new GoogleFontsPlugin({
            fonts: config["thirdPartyFonts"]["google"].map(f => ({ family: f }))
        })
    ],
    module: {
        rules: [
            {
                test: /\.(.css|.scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [ makeAbsolute( path.join( 'src', 'modules' ) ) ],
                            data: config["sassImports"].map(x => `@import "${x}";`).join('\n')
                        }
                    }]
                })
            },
            {
                test: /\.(jpe?g|png|gif|eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: { name: '[name].[ext]' }
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [ "lodash" ],
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-flow',
                            '@babel/preset-typescript',
                            'minify'
                        ]
                    }
                }
            }
        ]
    }
}