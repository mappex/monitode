"use strict";
/**
 * @file gruntfile
 * @subpackage main
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n' + ' * <%= pkg.name %> v<%= pkg.version %>\n'
                + ' * (c) <%= pkg.author.name %> <%= pkg.homepage %>\n'
                + ' * Licensed under <%= pkg.license %>\n' + ' */\n',

        clean: [ 'index.min.js', 'min/**/*.js', 'public/**/*.min.*' ],

        concat: {
            library: {
                src: [ 'bower_components/**/*.min.js' ],
                dest: 'public/js/lib.min.js'
            },
            own: {
                src: [ 'public/js/ajax.js', 'public/js/console.js' ],
                dest: 'public/js/concat.min.js'
            },
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            target: {
                files: [ {
                    expand: true,
                    src: 'lib/*.js',
                    dest: 'min'
                }, {
                    expand: true,
                    src: 'module/*.js',
                    dest: 'min'
                }, {
                    'index.min.js': 'index.js'
                } ]
            },
            script: {
                options: {
                    mangle: false,
                    banner: '<%= banner %>'
                },
                files: {
                    'public/js/script.min.js': 'public/js/concat.min.js'
                }
            }
        },

        cssmin: {
            css: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    'public/css/style.min.css': 'public/css/console.css'
                }
            }
        },

        htmlmin: {
            html: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: {
                    'public/index.min.html': 'public/index.html'
                }
            }
        },

        shell: {
            options: {
                failOnError: false
            },
            docs: {
                command: 'jsdoc ./lib/*.js ./module/*.js -c .jsdoc.json'
            }
        },

        endline: {
            target: {
                options: {
                    except: [ 'node_modules', 'bower_components' ]
                },
                files: [ {
                    src: './**/*.js'
                }, {
                    src: './**/*.css'
                }, {
                    src: './**/*.html'
                } ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-endline');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('html', [ 'concat', 'cssmin', 'htmlmin' ]);
    grunt.registerTask('min', [ 'clean', 'html', 'uglify', 'endline' ]);
    grunt.registerTask('doc', [ 'shell' ]);
    grunt.registerTask('default', [ 'min', 'doc' ]);

    return;
};
