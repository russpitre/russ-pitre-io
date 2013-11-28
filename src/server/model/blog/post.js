/** jshint strict:true, node:true, expr:true
 *
 */
'use strict';

var Schema = require('mongoose').Schema,
    //ObjectId = Schema.ObjectId,
    ctx = require('../../context/context');


/**
 * A Mongoose Schema type.
 *
 * @type {Schema}
 */
var PostSchema = new Schema({

    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    author: {
        type: String,
        default: 'Anon'
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    slug: {
        type: String,
        required: true,
        index: { unique: true }
    },

    format: {
        type: String,
        required: true,
        enum: ['Markdown', 'HTML'],
        default: 'Markdown'
    },

    body: {
        type: String,
        required: true
    }
});

/**
 * Post model
 *
 * @type {Model}
 */
module.exports.Post = ctx.mongooseDb.model('Post', PostSchema);

/**
 * Returns the Post Moongoose schema.
 *
 * @type {Schema}
 */
module.exports.PostSchema = PostSchema;
