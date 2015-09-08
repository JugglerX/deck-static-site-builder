var gulp = require('gulp');
var livingstyleguide = require('gulp-livingstyleguide');

gulp.task('default', function () {
    gulp.src('css/scss/styleguide.lsg')
        .pipe(livingstyleguide())
        .pipe(gulp.dest('public'));
});