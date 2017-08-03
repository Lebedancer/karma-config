/*global require*/

module.exports = function(config, options = {}) {
    return {
        files: [
            'node_modules/babel-polyfill/dist/polyfill.min.js',
            'node_modules/karma-config/test-setup.js',
            'src/webStatic/**/*.test.js'
        ],

        exclude: ['**/node_modules/**/*.test.js'],

        frameworks: ['mocha', 'chai', 'sinon'],

        logLevel: config.LOG_INFO, //config.LOG_DISABLE, // config.LOG_INFO
        singleRun: true,

        preprocessors: {
            'src/webStatic/**/*.test.js': ['webpack']
        },

        reporters: ['mocha'],

        webpack: {
            module: {
                devtool: 'inline-source-map',
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel',
                        exclude: /node_modules(?!\/@moedelo)/,
                        query: {
                            presets: [require.resolve('babel-preset-es2015'), require.resolve('babel-preset-react')], //
                            plugins: ['transform-class-properties']
                        }
                    },
                    { test: /\.less$/, loader: 'null-loader' },
                    { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'null-loader' },
                    { test: /\.hbs$/, loader: 'handlebars-loader' }
                ]
            },

            externals: {
                cheerio: 'window',
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true,
                'react-addons-test-utils': 'react-dom'
            }
        },
        webpackMiddleware: {
            noInfo: true,
        },
        plugins: [
            require('karma-teamcity-reporter'),
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-chai'),
            require('karma-sinon'),
            require('karma-mocha-reporter'),
            require('karma-chrome-launcher')
        ],

        browsers: ['ChromeHeadless']
    }
};