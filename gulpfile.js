// let gulp = require("gulp"),
import gulp from "gulp";
import gulpConcat from "gulp-concat";
import pug from "gulp-pug";
import autoprefixer from "gulp-autoprefixer";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import srcmap from "gulp-sourcemaps";
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
		.src("js/script.js")
		.pipe(srcmap.init())
		.pipe(terser())
		.pipe(gulpConcat("script.min.js"))
		.pipe(srcmap.write("./maps"))
		.pipe(gulp.dest("js"))
		.pipe(notify());
});

gulp.task("css", () => {
	return gulp
		.src(["css/style.scss"])
		.pipe(srcmap.init())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 2 versions"], // optional
				cascade: false,
			})
		)
		.pipe(sass({ style: "compressed" }))
		.pipe(gulpConcat("style.min.css"))
		.pipe(srcmap.write("./maps"))
		.pipe(gulp.dest("css"))
		.pipe(notify());
});

gulp.task("watch", () => {
	gulp.watch("*.pug", gulp.series("html"));
	gulp.watch("css/**/*.scss", gulp.series("css"));
	gulp.watch("js/**/*.js", gulp.series("js"));
});

gulp.task("default", gulp.series("watch"));
