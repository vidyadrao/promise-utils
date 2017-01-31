"use strict";
module.exports = (grunt) => {
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-coveralls');
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
                    reporters: {
                        'lcov': { dir: "coverage/reports/lcov" },
                        'html': { dir: "coverage/reports/html" },
                        'text-summary': true
                    }
                }
            },
            coveralls: {
                options: {
                    force: false
                },
                coverage: {
                    src: "coverage/reports/lcov/lcov.info"
                }
            }

        }
    );
    grunt.registerTask(
        'coverage',
        [
            'clean:coverage',
            'copy:coverage',
            'instrument',
            'mochaTest:coverage',
            'storeCoverage',
            'makeReport',
            'coveralls'
        ]
    );
    grunt.registerTask(
        'test',
        [
            'clean',
            'eslint',
            'mochaTest:test'
        ]
    );
};
