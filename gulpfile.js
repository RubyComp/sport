import gulp from 'gulp';
import clean from 'gulp-clean';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import pug from 'gulp-pug';

import connect from 'gulp-connect';
import livereload from 'gulp-livereload';

// import imagemin from 'gulp-imagemin';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

const cleanDist = () => {
	return gulp.src('dist', {read: false, allowEmpty: true})
		.pipe(clean({force: true}));
};

const clear = gulp.parallel(cleanDist);

const compileSass = () => {
	return gulp.src('src/sass/app.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'))
		.pipe(livereload());
};

const minifyJs = () => {
	return gulp.src('src/js/*.js')
		.pipe(concat('app.js'))
		.pipe(terser())
		.pipe(gulp.dest('dist/js'))
		.pipe(livereload());
};

const copyFiles = () => {
	return gulp.src(['src/resources/**/*'], { base: 'src' })
		.pipe(gulp.dest('dist/'))
		.pipe(livereload());
};

const compilePug = () => {
	return gulp.src('src/pug/pages/*.pug')
		.pipe(pug())
		.pipe(gulp.dest('dist'))
		.pipe(livereload());
}
const libs = () => {
	return gulp.src('src/lib/**/*')
		.pipe(gulp.dest('dist/lib/'))
		.pipe(livereload());
}

/* */
const buildAssets = gulp.parallel(minifyJs, compilePug, compileSass, copyFiles, libs);
const build = gulp.series(clear, buildAssets);

const watchFiles = () => {
	connect.server({
		root: 'dist',
		livereload: true
	});
	livereload.listen();
	gulp.watch('src/pug/**/*.pug', compilePug);
	gulp.watch('src/sass/**/*.scss', compileSass);
	gulp.watch('src/js/**/*.js', minifyJs);
	gulp.watch(['src/fonts/**/*', 'src/images/**/*'], copyFiles);
};

export default gulp.series(build, watchFiles);