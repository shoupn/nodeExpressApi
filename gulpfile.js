const gulp = require('gulp'),
      nodemon = require('nodemon'),
      gulpMocha = require('gulp-mocha'),
      env = require('gulp-env'),
      supertest = require('supertest');

gulp.task('default', function(){
    nodemon({
        script:'app.js',
        ext:'js',
        env:{
            PORT:8080
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('nodemon restarting');
    });
});

gulp.task('test', function(){
    env({vars:{ENV: 'Test' }});
    gulp.src('tests/*.js', {read: false})
    .pipe(gulpMocha({reporter:'nyan'}));
});