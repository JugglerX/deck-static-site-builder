module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    livingstyleguide: {
      generate: {
        options: {
          src: 'css/scss/styleguide.lsg',
          dest: 'styleguide.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-livingstyleguide');
  
  grunt.registerTask('default', ['livingstyleguide']);


};