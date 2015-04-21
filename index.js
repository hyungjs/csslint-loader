// Dependencies
var csslint       = require("csslint").CSSLint,
    loaderUtils   = require("loader-utils"),
    assign        = require("object-assign");

// Helper utilities
var formatter = require('./lib/formatter'),
    getConfig = require('./lib/getConfig');

// extract-text-plugin runs through the files again
// adding the linted files to array to prevent duplication of linting
var lintedFiles = [];
// Saving default csslint rules
var ruleSet = csslint.getRuleset();

/**
 * Css Linter
 *
 * @param {String|Buffer} input CSS string
 * @param {Object} options csslint configuration
 * @param {Object} webpack webpack instance
 * @param {Function} callback optional callback for async loader
 * @return {void}
 */
function lint(input, options, webpack, callback) {
  var rules = getConfig(options);

  // Override ruleSet with config file
  if (rules) {
    assign(ruleSet, rules);
  }

  // Run csslint
  var report = csslint.verify(input, ruleSet);

  // Run the formatter if there are errors/warnings and is not already linted
  if (report.messages.length && lintedFiles.indexOf(webpack.resourcePath) === -1) {
    // Add file to list of linted files
    lintedFiles.push(webpack.resourcePath);

    var output = formatter(report.messages, webpack.resourcePath);

    if (output.errors || (options.failWarning == true && output.warnings)) {
      webpack.emitError(output.message);

      if (options.failOnError) {
        throw new Error("Module failed because of a csslint error.");
      }
    } else if (output.warnings) {
      webpack.emitWarning(output.message);
    }
  }

  if (callback) {
    callback(null, input)
  }
}

/**
 * Webpack Loader
 *
 * @param {String|Buffer} input JavaScript string
 * @returns {String|Buffer} original input
 */
module.exports = function(input) {
  var options = assign(
    {
      configFile: './.csslintrc',
      failOnError: true,
      failWarning: true
    },
    loaderUtils.parseQuery(this.query)
  );

  this.cacheable();

  var callback = this.async();
  
  if (!callback) { // sync
    lint(input, options, this);

    return input;
  } else { // async
    try {
      lint(input, options, this, callback);
    } catch(e) {
      callback(e);
    }
  }
}
