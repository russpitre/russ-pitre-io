/* jshint strict:true, node:true, expr:true */

'use strict';

/**
 *  Describes the environment the application is running under.
 *
 * @return {Object} options.
 * @api private
 *
 */
function Settings() {
    console.log('Settings instance created.');
}

/**
 * Returns the mode the application is running in.
 *
 * @return {String}
 * @api private
 *
 */
Settings.prototype.mode = function() {
    return process.env.ENV || 'development';
};

/**
 * Returns the port the application is running on.
 *
 * @return {String}
 *
 */
Settings.prototype.port = function port() {
    return process.env.APP_PORT || '8080';
};

/**
 * Returns the port the application is running on.
 *
 * @return {String}
 *
 */
Settings.prototype.homeDirectory = function homeDirectory() {

    var dir = process.env.APP_HOME;
    
    if (dir === undefined) {
        throw new Error('The \'APP_HOME\' environment variable must be set.');
    }
    
    return dir;
};

/**
 * Returns true when application is in `production` mode.
 *
 * @returns {boolean}
 *
 */
Settings.prototype.isProduction = function isProduction() {
    return (this.mode() === 'production') ? true : false;
};

/**
 * Returns the path to the static files.
 *
 * @return {Array}
 *
 */
Settings.prototype.staticPaths = function staticPaths() {
    return [this.homeDirectory() + '/target/public'];
};

/**
 * Return the MongoDB connection URI.
 *
 * @returns {string}
 *
 */
Settings.prototype.mongoUri = function mongoUri() {

    var uri = process.env.APP_MONGO_URI;

    if (uri === undefined) {
        throw new Error('The \'APP_MONGO_URI\' environment variable must be set.');
    }

    return uri;


//    return this.isProduction() ? 'not-found' : 'mongodb://localhost:49153/bigrocksoftware';
};



var s = new Settings();

var settings = {

    mode: s.mode(),
    
    port: s.port(),
    
    mongoUri: s.mongoUri(),
    
    staticDirectories: s.staticPaths(),
    
    production: s.isProduction()
};

module.exports = settings;
