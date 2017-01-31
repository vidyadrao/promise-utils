"use strict";
module.exports = (grunt) => {
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.initConfig(
        {
            copy: {
                coverage: {
                    src: ["test/**/*.js"],
                    dest: "coverage/instrument/"

                }
            },
            clean: {
                coverage: "coverage"
            },
            eslint: {
                target: [
                    "Gruntfile.js",
                    "src/**/*.js"
                ]
            },
            instrument: {
                files: 'src/*.js',
                options: {
                    basePath: 'coverage/instrument/'
                }
            },
            mochaTest: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt',
                    quiet: false,
                    clearRequireCache: false,
                    noFail: false
                },
                test: {
                    src: ['test/**/*.js']
                },
                coverage: {
                    src: ['coverage/instrument/test/**/*.js']
                }
            },
            storeCoverage: {
                options: {
                    dir: 'coverage/reports'
                }
            },
            makeReport: {
                src: 'coverage/reports/**/*.json',
                options: {
                    type: 'html',
                    dir: 'coverage/html',
                    print: 'detail'
                }
            }

        }
    );
    grunt.registerTask('coverage',
        [
            'clean:coverage',
            'copy:coverage',
            'instrument',
            'mochaTest:coverage',
            'storeCoverage',
            'makeReport'
        ]
    );
};
