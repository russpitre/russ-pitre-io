/** jshint strict:true, node:true, expr:true
 *
 */
'use strict';

/**
 * Expose `status404()` middleware function.
 *
 * @return {Function}
 * @api public
 */
module.exports.status404 = function() {

    return function(req, res) {

        res.status(404);

        // respond with html page
        if (req.accepts('html')) {
            res.render('pages/error/404', { url: req.url });
            return;
        }

        // respond with json
        if (req.accepts('json')) {
            res.send({ error: 'Not found' });
            return;
        }

        // default to plain-text. send()
        res.type('txt').send('Not found');
    };
};

/**
 * Expose `status500()` function on requests.
 *
 * @return {Function}
 * @api public
 */
module.exports.status500 = function() {

    return function (err, req, res) {

        // we may use properties of the error object
        // here and next(err) appropriately, or if
        // we possibly recovered from the error, simply next().
        res.status(err.status || 500);
        res.render('pages/error/500', { error: err });
    };
};