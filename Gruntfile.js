module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['framework/deck/scss/**/*.scss'],
        tasks: ['sass']
      },
      livingstyleguide: {
        files: ['framework/deck/scss/**/*.md'],
        tasks: ['livingstyleguide']
      },
    },
    sass: {
      options: {
          sourceMap: false,
          livereload: true
      },
      dist: {
          files: {
              'framework/deck/scss/style.css': 'framework/deck/scss/style.scss'
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