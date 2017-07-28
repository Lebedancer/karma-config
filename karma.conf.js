/*global require*/
const webpack = require('webpack'),
    path = require('path');

module.exports = function(config, options = {}) {
    return {
        files: [
            'node_modules/babel-polyfill/dist/polyfill.min.js',
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
                rules: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        include: [
                            path.resolve(__dirname, '../../@moedelo'),
                            options.staticDir || path.resolve(__dirname, '../../../src/webStatic')
                        ],
                        query: {
                            presets: [
                                'react',
                                ["es2015", { "modules": false }],
                                'stage-0',
                                'airbnb'
                            ],
                            plugins: ["transform-decorators-legacy", "transform-class-properties"]
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
                'react/lib/ReactContext': true
            }
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