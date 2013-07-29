// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> v<%= pkg.version %>

module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      public: 'public/**/*'
    },
    jade: {
      src: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: '**/*.jade',
          dest: 'public/',
          ext: '.html'
        }],
        options: {
          pretty: true
        }
      }
    },
    stylus: {
      src: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: '**/*.styl',
          dest: 'public/',
          ext: '.css'
        }],
        options: {
          compress: false
        }
      }
    },
    coffee: {
      src: {
        files: [{
          expand: true,
          cwd: 'src/scripts/',
          src: '**/*.coffee',
          dest: 'public/scripts/',
          ext: '.js'
        }]
      }
    },
    copy: {
      src: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: [
            '**/*',
            '!<%%= jade.src.files[0].src %>',
            '!<%%= stylus.src.files[0].src %>',
            '!<%%= coffee.src.files[0].src %>'
          ],
          dest: 'public/'
        }]
      }
    },
    watch: {
      jade: {
        files: '<%%= jade.src.files[0].cwd + jade.src.files[0].src %>',
        tasks: 'jade'
      },
      stylus: {
        files: '<%%= stylus.src.files[0].cwd + stylus.src.files[0].src %>',
        tasks: 'stylus'
      },
      coffee: {
        files: '<%%= coffee.src.files[0].cwd + coffee.src.files[0].src %>',
        tasks: 'coffee'
      },
      copy: {
        files: [
          '<%%= copy.src.files[0].cwd + copy.src.files[0].src %>',
          '!<%%= jade.src.files[0].cwd + jade.src.files[0].src %>',
          '!<%%= stylus.src.files[0].cwd + stylus.src.files[0].src %>',
          '!<%%= coffee.src.files[0].cwd + coffee.src.files[0].src %>'
        ],
        tasks: 'copy:src'
      },
      public: {
        files: [
          'public/**/*',
          '!public/bower_components/**/*'
        ],
        options: {
          livereload: true
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'public',
          keepalive: true,
          middleware: function(connect, options) {
            return [
              require('connect-livereload')(),
              connect.static(options.base)
            ];
          }
        }
      }
    },
    concurrent: {
      compile: {
        tasks: [
          'jade',
          'stylus',
          'coffee',
          'copy'
        ],
        options: {
            logConcurrentOutput: false
        }
      },
      server: {
        tasks: [
          'connect',
          'watch:jade',
          'watch:stylus',
          'watch:coffee',
          'watch:copy',
          'watch:public'
        ],
        options: {
            logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['clean', 'concurrent:compile']);
  grunt.registerTask('server', ['default', 'concurrent:server']);

};
