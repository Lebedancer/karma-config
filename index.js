/*global module*/
const karmaConf = require('./karma.conf.js'),
    merge = require('merge');

module.exports = function(options, webpackConfig, staticDir) {
    return function(config) {
        const karmaConfig = karmaConf(config, staticDir);
        const karmaOptions = options ? merge(true, karmaConfig, options) : karmaConfig;
        config.set(karmaOptions);
    };
};