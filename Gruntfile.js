module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass_deck: {
        files: ['framework/deck/scss/**/*.scss'],
        tasks: ['sass:deck']
      },
      sass_app: {
        files: ['css/scss/**/*.scss'],
        tasks: ['sass:app']
      },
      livingstyleguide: {
        files: ['framework/deck/**/*.md'],
        tasks: ['livingstyleguide']
      },
    },
    sass: {
      options: {
          sourceMap: false,
          livereload: true
      },
      deck: {
        files: {
            'framework/deck/scss/style.css': 'framework/deck/scss/style.scss'
        }
      },
      app: {
        files: {
            'css/style.css': 'css/style.scss'
        }
      }
    },
    livingstyleguide: {
      generate: {
        options: {
          src: 'framework/deck/scss/styleguide.lsg',
          dest: 'styleguide.html'
        }
      }
    },

  });

  grunt.loadNpmTasks('grunt-livingstyleguide');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['sass','livingstyleguide']);

};