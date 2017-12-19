const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const runSequence = require('run-sequence');
const { stream: wiredep } = require('wiredep');

const $ = gulpLoadPlugins();

function lint(files, options) {
	return () => gulp.src(files)
		.pipe($.eslint(options))
		.pipe($.eslint.format());
}

gulp.task('lint', lint('app/scripts.babel/**/*.js', {
	env: {
		es6: true,
	},
}));

// unused
gulp.task('images', () => gulp.src('app/images/**/*')
	.pipe($.if($.if.isFile, $.cache($.imagemin({
		progressive: true,
		interlaced: true,
		// don't remove IDs from SVGs, they are often used
		// as hooks for embedding and styling
		svgoPlugins: [{ cleanupIDs: false }],
	}))
		.on('error', function(err) {
			console.log(err);
			this.end();
		})))
	.pipe(gulp.dest('dist/images')));

gulp.task('clean', del.bind(null, ['.tmp']));

/*eslint-disable import/no-unresolved*/
gulp.task('package', function() {
	const manifest = require('./app/manifest.json');

	return gulp.src([
		'app/*.*',
		'app/_locales/**',
		'app/fonts/**',
		'app/images/**',
		'app/js/**',
		'app/styles/**',
		'app/vendor/**',
	], {
		dot: true,
		base: 'app',
	})
		.pipe($.zip('nau-tab-' + manifest.version + '.zip'))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean'], cb => {
	runSequence('package', cb);
});
