/* jshint strict:true, node:true, expr:true */

var settings = require('./settings'),
    context = require('./context');


/**
 * Expose application context
 */
exports.settings = settings;

/**
 * Expose application context
 */
exports.moongoseDb = context.moongoseDb;