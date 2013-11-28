/* jshint strict:true, node:true, expr:true */

'use strict';

/**
 * Modules
 */
var settings = require('./settings');
var mongoose = require('mongoose');

/**
 * Instance variables.
 */
mongoose.createConnection(settings.mongoUri);

/**
 * Constructor.
 *
 * @constructor
 */
function ApplicationContext() {
    console.log('ApplicationContext instance created.');
}

/**
 * Connect to MongoDb via mongoose API.
 * @param uri
 * @returns {*}
 */
ApplicationContext.prototype.connect = function (uri) {
    return mongoose.createConnection(uri);
};

/**
 * The Application context instance to export.
 *
 * @type {ApplicationContext}
 */
var appCtx = new ApplicationContext();

var ctx = {
    mongooseDb: appCtx.connect(settings.mongoUri)
};

module.exports = ctx;
