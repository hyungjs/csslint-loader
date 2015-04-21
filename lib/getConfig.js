'use strict';

// Dependencies
var fs = require('fs');

/**
 * Checking and parsing config file
 *
 * @param {Buffer} file lint config file
 * @return {Object} JSON parsed config file
 */
function checkJSON(file) {
    

    return rules;
}

module.exports = function(options) {
    try {
        // Check the root folder to see if config file exists
        var config = fs.readFileSync(options.configFile);
    } catch (e) {
        console.log('There is no csslint config file');
    }

    if (config) {
        try {
            var rules = JSON.parse(config);
        } catch (e) {
            throw new Error('Error parsing csslintrc: ' + e);
        }
    }

    return (typeof rules === 'undefined') ? null : rules;
}
