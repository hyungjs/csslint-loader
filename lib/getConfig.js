'use strict';

// Dependencies
var fs = require('fs');
var stripJsonComments = require('strip-json-comments');

module.exports = function(options) {
    try {
        // Check the root folder to see if config file exists
        var config = fs.readFileSync(options.configFile, 'utf-8');
    } catch (e) {
        console.log('There is no csslint config file');
    }

    if (config) {
        try {
            var rules = JSON.parse(stripJsonComments(config));
        } catch (e) {
            throw new Error('Error parsing csslintrc: ' + e);
        }
    }

    return (typeof rules === 'undefined') ? null : rules;
}
