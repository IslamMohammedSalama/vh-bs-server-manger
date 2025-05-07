import gulp from "gulp";
import gulpConcat from "gulp-concat";
import pug from "gulp-pug";
import autoprefixer from "gulp-autoprefixer";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import srcmaps from "gulp-sourcemaps";
import terser from "gulp-terser";
import notify from "gulp-notify";
// import zip from "gulp-zip";
const sass = gulpSass(dartSass);

gulp.task("html", () => {
	return gulp
		.src("pug/index.pug")
		.pipe(pug())
		.pipe(gulp.dest("."))
		.pipe(notify());
});
gulp.task("js", () => {
	return gulp
		.src(["js/**/*.js","!js/script.min.js"],{base:"js"})
		.pipe(srcmaps.init({largeFile: true,loadMaps:"true"}))
		.pipe(terser())
		.pipe(gulpConcat("script.min.js"))
		.pipe(srcmaps.write("./maps"))
		.pipe(gulp.dest("js"))
		.pipe(notify());
});

gulp.task("css", () => {
	return gulp
		.src(["css/**/*.scss", "css/**/*.css","!css/style.min.css"] , { base: 'css' })
		.pipe(srcmaps.init({largeFile: true,loadMaps:"true"}))
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 2 versions"], // optional
				cascade: false,
			})
		)
		.pipe(sass({style:"compressed"}))
		.pipe(gulpConcat("style.min.css"))
		.pipe(srcmaps.write("./maps"))
		.pipe(gulp.dest("css"))
		.pipe(notify());
});

gulp.task("watch", () => {
	gulp.watch("pug/index.pug", gulp.series("html"));
	gulp.watch("css/**/*.scss", gulp.series("css"));
	gulp.watch("js/**/*.js", gulp.series("js"));
});

gulp.task("default", gulp.series("watch"));
