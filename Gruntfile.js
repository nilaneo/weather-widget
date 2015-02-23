module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      my_target: {
        files: {
          'dest/js/weather-widget.min.js': 'src/js/weather-widget.js'
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dest/css',
          ext: '.min.css'
        }]
      }
    },
    htmlmin: {                                     
      dest: {                                      
        options: {                                 
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   
          'dest/templates/weather-widget.tpl.min.html': ['src/templates/weather-widget.tpl.html']
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/fonts', src: '*', dest: 'dest/fonts/'}
        ]
      }
    },
    connect: {
      server: {
        options: {
          livereload: true
        }
      }
    },
    watch: {
      css: {
        files: '**/*.css',
        tasks: 'cssmin',
        options: {
          spawn: false,
          livereload: true
        }
      },
      js: {
        files: '**/*.js',
        tasks: 'uglify',
        options: {
          spawn: false,
          livereload: true
        }
      },
      html: {
        files: '**/*.html',
        tasks: 'htmlmin',
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('default', ['copy', 'htmlmin', 'cssmin', 'uglify', 'connect', 'watch']);

};
