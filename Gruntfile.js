module.exports = function(grunt) {
  var JS_SRC_PATH = 'src/js/weather-widget.js',
      JS_DEST_PATH = 'dest/js/weather-widget.min.js',
      CSS_SRC_PATH = 'src/css/weather-widget.css',
      CSS_DEST_PATH = 'dest/css/weather-widget.min.css',
      HTML_SRC_PATH = 'src/templates/weather-widget.tpl.html',
      HTML_DEST_PATH = 'dest/templates/weather-widget.tpl.min.html';

  grunt.initConfig({
    uglify: {
      dest: {
        src: JS_SRC_PATH,
        dest: JS_DEST_PATH
      }
    },
    cssmin: {
      dest: {
        src: CSS_SRC_PATH,
        dest: CSS_DEST_PATH
      }
    },
    htmlmin: {                                     
      dest: {                                      
        options: {                                 
          removeComments: true,
          collapseWhitespace: true
        },                               
        src: HTML_SRC_PATH,
        dest: HTML_DEST_PATH
      }
    },
    copy: {
      dest: {
        expand: true,
        cwd: 'src/fonts',
        src: '*',
        dest: 'dest/fonts/'
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
      options: {
        spawn: false,
        livereload: true
      },
      css: {
        files: CSS_SRC_PATH,
        tasks: 'cssmin'
      },
      js: {
        files: JS_SRC_PATH,
        tasks: 'uglify'
      },
      html: {
        files: HTML_SRC_PATH,
        tasks: 'htmlmin'
      }
    },
    clean: {
      dest: 'dest/**/*'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', ['clean', 'copy', 'htmlmin', 'cssmin', 'uglify']);
  grunt.registerTask('server', ['build', 'connect', 'watch']);

  grunt.registerTask('default', ['build']);

};
