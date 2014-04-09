module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.initConfig({
		bigfish: {
			app: 'www',
			sass: '<%= bigfish.app %>/sass',
			css: '<%= bigfish.app %>/css',
			images: '<%= bigfish.app %>/images',
			js: '<%= bigfish.app %>/js',
			jsmin: '<%= bigfish.js %>/minime',
			docs: '<%= bigfish.app %>/docs'
		},
		autoprefixer: {
			options: {
				browsers: [
				'last 2 version',
				'ie >= 8'
				]
			},

			no_dest: {
				src: '<%= bigfish.css %>/style.min.css'
			}
		},

		jsdoc: {
			dist: {
				src: ['<%= bigfish.jsmin %>/**/*.js'],
				options: {
					destination: '<%= bigfish.docs %>/js'
				}
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
			'<%= bigfish.jsmin %>/**/*.js'
			]
		},

		sass: {
			dist: {
				options: {
					style: 'compressed',
					sourcemap: true
				},
				files: {
					'<%= bigfish.css %>/style.min.css': '<%= bigfish.sass %>/style.scss'
				}
			}
		},

		sprite: {
			all: {
				src: '<%= bigfish.images %>/sprites/*.png',
				destImg: '<%= bigfish.images %>/sprite.png',
				destCSS: '<%= bigfish.sass %>/_sprite.scss',
				algorithm: 'binary-tree',
				padding: 2
			}
		},

		uglify: {
			dist: {
				files: {
					'<%= bigfish.js %>/app.min.js': '<%= bigfish.jsmin %>/**/*.js'
				}
			}
		},

		kss: {
			options: {
				includeType: 'scss',
				includePath: '<%= bigfish.sass %>/**/*.scss',
				template: 'styleguide-template'
			},
			dist: {
				files: {
					'<%= bigfish.docs %>/css/': ['<%= bigfish.sass %>/']
				}
			}
		},

		watch: {
			work: {
				files: [
				'index.php',
				'<%= bigfish.jsmin %>/**/*.js',
				'<%= bigfish.sass %>/**/*.scss'
				],
				tasks: [
				'sass:dist',
				'autoprefixer',
				'jshint',
				'uglify:dist'
				]
			},
			jsdoc: {
				files: [
				'<%= bigfish.jsmin %>/**/*.js'
				],
				tasks: [
				'jshint',
				'jsdoc'
				],
				options: {
					livereload: false
				}
			},
			kss: {
				files: [
				'<%= bigfish.sass %>/**/*.scss'
				],
				tasks: [
				'sass',
				'autoprefixer',
				'kss'
				]
			}
		}
	});

grunt.registerTask('default', [
	'sprite',
	'sass',
	'autoprefixer',
	'kss',
	'jshint',
	'uglify',
	'jsdoc',
	'watch:work'
	]);

grunt.registerTask('buildjsdoc', [
	'jshint',
	'uglify',
	'jsdoc',
	'watch:jsdoc'
	]);

grunt.registerTask('buildcssdocs', [
	'sprite',
	'sass',
	'autoprefixer',
	'kss',
	'watch:kss'
	]);
};