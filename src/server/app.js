/* jshint strict:true, node:true, expr:true */


'use strict';

/**
 * Load required modules.
 */
var express = require('express');
var flash = require('connect-flash');
var middleware = require('./middleware');
var ctx = require('./context/index.js');

/**
 * Modules defined in this project.
 */
var postRoutes = require('./controller/blog.js');

/**
 * ExpressJS instance.
 */
var app = express();

/**
 * Configure express js app.
 */
app.configure(ctx.settings.mode, function () {
    app.engine('.jade', require('jade').__express);
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');
    app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({key: 'sid', secret: 'big rock software is rad', cookie: { maxAge: 5 * 1000 } }));
    app.use(flash());

    /**
     * Common data used in templates...
     */
    app.use(function (req, res, next) {
        app.locals.title = 'Big Rock Software';
        res.locals.infoMessages = req.flash('info');
        res.locals.successMessages = req.flash('success');
        res.locals.warnMessages = req.flash('warn');
        res.locals.errorMessages = req.flash('error');
        res.locals.csrftoken = req.session._csrf;

        next();
    });

    app.use(app.router);
    app.use(express.csrf());

    ctx.settings.staticDirectories.forEach(function(path) {
        console.log('path', path);
        app.use(express.static(path));
    });

    // development only
    if ('development' === app.get('env')) {
        app.use(express.errorHandler());
    }

    if (!ctx.settings.production) {
        app.use(express.errorHandler());
    }

    app.use(middleware.status404());
    app.use(middleware.status500());
});

app.get('/', function (req, res) {
    res.render('pages/index', {
    });
});

app.get('/map', function (req, res) {
    res.render('pages/map', {
        title: 'Big Rock Software : ESRI Map'
    });
});

app.get('/taskboard', function (req, res) {
    res.render('pages/taskboard', {
        title: 'Big Rock Software : Taskboard'
    });
});

app.get('/tmux', function (req, res) {
    res.render('pages/tmux', {
        title: 'Big Rock Software - tmux cheatsheet'
    });
});

app.get('/intellij', function (req, res) {
    res.render('pages/intellij', {
        title: 'IntelliJ Keymap'
    });
});

app.get('/posts', postRoutes.list);
app.get('/posts/new', postRoutes.new);
app.get('/posts/:slug', postRoutes.viewBySlug);
app.get('/posts/:id/edit', postRoutes.edit);
app.post('/posts', postRoutes.insert);
app.post('/posts/:id', postRoutes.update);

console.log('Settings: ', ctx.settings);

/**
 * Start express js app on the port specified for this environment.
 */
app.listen(ctx.settings.port, function () {
    console.log('Application is running in ' + ctx.settings.mode + ' mode on port ' + ctx.settings.port);
});
