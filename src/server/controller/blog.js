/** jshint strict:true, node:true, expr:true
 *
 * Blog controller definitions.
 *
 */

'use strict';

/**
 * Module imports
 */
var Post = require('../model/blog/post').Post,
    success = require('./flash').success;

/**
 * Templates
 */
var templateList = 'pages/blog/list',
    templateForm = 'pages/blog/edit',
    templateView = 'pages/blog/view';

/**
 * Action urls
 */
var actionInsert = '/posts/',
    actionUpdate = function (id) {
        return '/posts/' + id;
    };

/**
 * Form options
 */
var formatOptions = Post.schema.path('format').enumValues;

/**
 * Build error messages
 */
var buildErrorMessages = function(req, errors) {

    var errorsMessages = [];

    for (var property in errors) {
        if (errors.hasOwnProperty(property)) {
            errorsMessages.push(errors[property].message);
        }
    }
    return errorsMessages;
};

/**
 * Render functions
 */
var renderForm = function (req, res, post, errorMessages) {

    if (errorMessages && errorMessages.length) {
        res.locals.errorMessages = errorMessages;
    }

    res.render(templateForm, {
        post: post,
        formatOptions: formatOptions,
        action: post.isNew ? actionInsert : actionUpdate(post.id)
    });
};

/**
 * GET: Controller to list all blog posts.
 *
 * @param req the request.
 * @param res the response.
 */
exports.list = function (req, res) {
    Post.find({})
        .sort({date: -1})
        .exec(function (err, posts) {
            res.render(templateList, {
                posts: posts
            });
        });
};

/**
 * GET: Controller to present a form to create a new post.
 *
 * @param req the request.
 * @param res the response.
 */
exports.new = function (req, res) {

    /* create a new post instance to pass to the view */
    var post = new Post({title: '', slug: ''});

    /* render the blog post form */
    renderForm(req, res, post);
};

/**
 * GET: Controller to view a single post.
 *
 * @param req the request.
 * @param res the response.
 */
exports.viewBySlug = function (req, res) {
    Post.findOne({slug: req.params.slug}, function (err, post) {
        res.render(templateView, {
            post: post
        });
    });
};

/**
 * GET: Controller to edit blog post.
 *
 * @param req the request.
 * @param res the response.
 */
exports.edit = function (req, res) {
    Post.findOne({_id: req.params.id}, function (err, post) {
        renderForm(req, res, post);
    });
};

/**
 * POST: Controller to handle blog post save.
 *
 * @param req the request.
 * @param res the response.
 */
exports.update = function (req, res) {

    Post.findOne({ _id: req.params.id }, function (err, post) {

        post.title = req.body.title;
        post.body = req.body.body;
        post.slug = req.body.slug;
        post.format = req.body.format;

        post.save(function (err) {

            if (err) {
                renderForm(req, res, post, buildErrorMessages(req, err.errors));
            } else {
                success(req, 'Post successfully updated.');
                res.redirect('/posts/' + post.id + '/edit');
            }
        });
    });
};

/**
 * POST: Controller to handle blog post insert.
 *
 * @param req the request.
 * @param res the response.
 */
exports.insert = function (req, res) {

    var post = new Post(req.body);

    post.save(function (err) {
        if (err) {
            renderForm(req, res, post, buildErrorMessages(req, err.errors));
        } else {
            success(req, 'Successfully saved new post.');
            res.redirect('/posts/' + post.id + '/edit');
        }
    });
};