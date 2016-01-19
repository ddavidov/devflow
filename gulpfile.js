var exts = require('./extensions.json');
var gulp = require('gulp');
var git  = require('gulp-git');
var util = require('gulp-util');
var sym  = require('gulp-sym');
var each = require('lodash/each');
var runSeq = require('run-sequence');

// init extension object
var ext = false;

if (util.env.e && exts[util.env.e] !== undefined) {
    ext = {
        name: util.env.e,
        git: exts[util.env.e]
    };
}


// TASKS

gulp.task('add', ['preAdd'], function(cb) {
    runSeq('clone', 'symlink', cb);
});

gulp.task('symlink', ['preSymlink'], function (cb) {
    var srcs = [], dsts = [];

    each(ext.symlinks, function (dst, src) {
        srcs.push('./Projects/extensions/' + ext.name + '/' + src);
        dsts.push('./Projects/site/' + dst);
    });

    return gulp.src(srcs).pipe(sym(dsts, {force: true, relative: true}));
});

// clone extension repository
gulp.task('clone', function (cb) {
    git.clone(ext.git, {
        args: './Projects/extensions/' + ext.name
    }, function(err) {
        return err ? cb(err) : cb();
    });
});

// pre tasks

gulp.task('preAdd', function(cb) {
    return ext ? cb() : cb('--e argument missing or extension not recognized.');
});

gulp.task('preSymlink', function(cb) {
    var symlinks = require('./Projects/extensions/' + ext.name + '/package.json');;

    if (symlinks.devflow && symlinks.devflow.symlinks) {
        ext.symlinks = symlinks.devflow.symlinks;
        cb();
    } else {
        cb('Symlinks not detected on Extension package definition.');
    }
});
