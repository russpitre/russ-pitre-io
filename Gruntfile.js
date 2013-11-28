
'use strict';

module.exports = function (grunt) {

    /**
     * Load all grunt tasks matching the `grunt-*` pattern
     */
    require('load-grunt-tasks')(grunt);

    /**
     * Build configuration object.
     */
    var buildConfig = {

        dir: {
            bowerHome: 'bower_components',
            assets: 'src/assets',

            target: 'target',
            build: 'target/build',
            public: 'target/public',
            bowerTarget: 'target/public/vendor',

            src: {
                less:   'src/client/less',
                js:     'src/client/javascripts'
            },

            dest: {
                less:   'target/stylesheets',
                js:     'target/javascripts'
            }
        }
    };

    /**
     * Initialize the Grunt tasks. This project is setup to use thre 'dev' & 'prod'
     * targets.
     */
    grunt.initConfig({

        config: buildConfig,

        /**
         * Read project settings from package.json
         */
        package: grunt.file.readJSON('package.json'),

        /**
         * Clean the build directory.
         */
        clean: {
            target: '<%= config.dir.target %>'
        },

        /**
         * Copy files and directories.
         */
        copy: {
            assets: {
                files: [
                    // everything in the assets directory
                    { expand: true, cwd: '<%= config.dir.assets %>', src: ['**'], dest: '<%= config.dir.public %>' },
                ]
            },

            vendor: {
                files: [
                    // bower components
                    { expand: true, src: ['css/font-awesome.css','font/**'],  dest: '<%= config.dir.bowerTarget %>/font-awesome', cwd: '<%= config.dir.bowerHome %>/font-awesome'},
                    { expand: true, src: 'jquery.js', dest: '<%= config.dir.bowerTarget %>/jquery', cwd: '<%= config.dir.bowerHome %>/jquery' },
                    { expand: true, src: 'modernizr.js', dest: '<%= config.dir.bowerTarget %>/modernizr', cwd: '<%= config.dir.bowerHome %>/modernizr' },
                    { expand: true, src: 'angular.js', dest: '<%= config.dir.bowerTarget %>/angular', cwd: '<%= config.dir.bowerHome %>/angular' },
                    { expand: true, src: '**', dest: '<%= config.dir.bowerTarget %>/semantic', cwd: '<%= config.dir.bowerHome %>/semantic/build/packaged' }
                ]
            }
        },

        jshint: {
            options: {
                jshintrc:'.jshintrc'
            },
            all:['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },

        /**
         * Compress images (jpg, png) directly to the public directory.
         */
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.dir.assets %>/img/',
                        src: ['**/*.png'],
                        dest: '<%= config.dir.public %>/img/',
                        ext: '.png'
                    }
                ]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.dir.assets %>/img/',
                        src: ['**/*.jpg'],
                        dest: '<%= config.dir.public %>/img/',
                        ext: '.jpg'
                    }
                ]
            }
        },

        /**
         * Compile LESS to CSS to build directory.
         */
        less: {

            dist: {
                options: {
                    paths: ['<%= config.dir.src.less %>']
                },
                files: {
                    'target/build/stylesheets/main.css': '<%= config.dir.src.less %>/main.less'
                }
            }
        },

        /**
         * Minify CSS to public directory.
         */
        cssmin: {
            minify: {
                expand: true,
                cwd: 'target/build/stylesheets/',
                src: ['*.css'],
                dest: '<%= config.dir.public %>/css/',
                ext: '.css'
            }
        },

        /**
         * Watch for file changes and perform tasks
         */
        watch: {
            css: {
                files: ['**/*.less'],
                tasks: ['less', 'cssmin']
            },
            js: {
                files: ['**/*.js'],
                tasks: ['jshint']
            }
        }

    });

    /**
     * Register 'dev'
     */
    grunt.registerTask('dev', ['clean', 'copy:assets', 'copy:vendor', 'imagemin', 'less', 'cssmin', 'watch']);

};
