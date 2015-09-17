module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    library_dest: '',
    library_source: '',

    watch: {
      sass_deck: {
        files: ['framework/deck/scss/**/*.scss', 'framework/deck/scss/*.scss'],
        tasks: ['sass:deck'],
        options: {
          livereload: true,
        }
      },
      sass_app: {
        files: ['css/*.scss'],
        tasks: ['sass:app'],
        options: {
          livereload: true,
        }
      },
      sass_library: {
        files: ['library/*.scss', 'library/**/*.scss'],
        tasks: ['sass:library'],
        options: {
          livereload: true,
          nospawn: true
        }
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
      },
      library: {
        files: [{
          expand: true,
          src: '',
          ext: ''
        }]
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

  grunt.event.on('watch', function(action, filepath) {

    grunt.log.writeln("Dynamic filepath: " + filepath)

    grunt.config(['sass', 'library', 'files'], [{
        expand: true,
        src: filepath,
        ext: '.css',
    }]);

  });

};