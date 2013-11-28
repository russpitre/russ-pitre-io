/** jshint strict:true, node:true, expr:true
 *
 * Helper module to write flash messages.
 *
 */
'use strict';

exports.info = function(req, message) {
        req.flash('info', message);
    };

exports.warn = function(req, message) {
        req.flash('warn', message);
    };

exports.success = function(req, message) {
        req.flash('success', message);
    };

exports.error = function(req, message) {
        req.flash('error', message);
    };