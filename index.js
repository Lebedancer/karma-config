/*global module*/
const karmaConf = require('./karma.conf.js'),
    merge = require('merge');

module.exports = function(options, webpackConfig) {
    return function(config) {
        const karmaOtrions = options ? merge(true, karmaConf(config, webpackConfig), options) : karmaConf(config, webpackConfig);
        config.set(karmaOtrions);
    };
};