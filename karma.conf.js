/*global require*/
const webpack = require('webpack'),
    path = require('path');

module.exports = function(config, webpackConfig) {
    return {

        files: [
            'node_modules/babel-polyfill/dist/polyfill.min.js',
            '**/*.test.js'
        ],

        exclude: ['**/node_modules/**/*.test.js'],

        frameworks: ['mocha', 'chai', 'sinon'],

        logLevel: config.LOG_INFO, //config.LOG_DISABLE, // config.LOG_INFO
        singleRun: true,

        preprocessors: {
            '**/*.test.js': ['webpack']
        },

        reporters: ['mocha'],

        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
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