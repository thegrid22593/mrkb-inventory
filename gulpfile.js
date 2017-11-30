/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';

var gulp     = require('gulp');
var wrench   = require('wrench');
var plugins  = require('gulp-load-plugins')();

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file);
});

var paths = {
    iconDest:       'src/assets/fonts/',
    iconSrc:        'src/assets/images/svg/icons/*.svg',
    iconTemplateDir: 'src/app/sass/templates/'
};

// Task that converts svg assets into icon fonts
var fontName = 'mkrb-ui';

gulp.task('iconfonts', function(){
    gulp.src([paths.iconSrc])
        .pipe(plugins.iconfontCss({
            fontName: fontName,
            targetPath: '../../app/sass/templates/_icons.scss',
            fontPath: '/assets/fonts/'
        }))
        .pipe(plugins.iconfont({
            fontName: fontName
        }))
        .pipe(gulp.dest(paths.iconDest));
});

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
