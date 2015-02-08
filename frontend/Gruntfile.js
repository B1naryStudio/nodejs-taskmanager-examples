module.exports = function (grunt) {
	grunt.initConfig({
		javascripts: ['javascripts/**/*.js'],
		server_js: ['../backend/**/*.js', '!../backend/*/node_modules/**/*.js',],
		stylesheets: ['stylesheets/**/*.styl'],

		jshint: {
			client: ['Gruntfile.js', '<%= javascripts %>', '!javascripts/libs/**/*.js'],
			server: ['<%= server_js %>'],
			options: {
				jshintrc: true
			}
		},

		watch: {
			options:{
				livereload: true
			},
			scripts: {
				files: ['<%= javascripts %>'],
				tasks: ['javascripts']
			},
			server_js: {
				files: ['<%= server_js %>'],
				tasks: ['jshint:server'],
				options:{
					livereload: false
				}
			},
			styles: {
				files: ['<%= stylesheets %>'],
				tasks: ['stylus']
			},
			jade: {
				files: ['views/'],
				tasks: []
			}
		},

		stylus: {
			compile: {
				options: {
					'include css': true,
					'paths': ['stylesheets/'],
					'compress': true
				},
				files: {
					'../public/styles/style.css': ['<%= stylesheets %>']
				}
			}
		},

		copy: {			
			libs: {files: [{expand: false, src: ['bower_components/requirejs/require.js'], dest: '../public/javascripts/libs/require.js'}]},
			js: {files: [{expand: true, cwd: 'javascripts/', src: ['**'], dest: '../public/javascripts/'}]}
		},

		clean: {	
			options: { force: true },
			public_js: { src: ['../public/javascripts']}
		},

		requirejs: {
			options: {
				baseUrl: '.',
				appDir: 'javascripts',
				mainConfigFile: 'javascripts/main.js',
				optimize: 'uglify2',
				generateSourceMaps: false,
				preserveLicenseComments: false,
				useStrict: true,
				removeCombined: false,
				modules: [{
					name: 'main'
				}]
			},

			main : {
				options: {
					dir: '../public/javascripts'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('common', ['jshint', 'stylus', 'clean', 'copy']);
	grunt.registerTask('javascripts', ['jshint', 'clean', 'copy']);
	
	grunt.registerTask('default', ['common', 'copy']);
	grunt.registerTask('release', ['common', 'requirejs']);
};