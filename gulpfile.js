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
import zip from "gulp-zip";
const sass = gulpSass(dartSass);

gulp.task("html", () => {
	return gulp
		.src("project/pug/index.pug")
		.pipe(pug())
		.pipe(gulp.dest("dist"))
		.pipe(notify());
});
gulp.task("js", () => {
	return gulp
		.src("project/js/**/*.js")
		.pipe(srcmap.init())
		.pipe(terser())
		.pipe(gulpConcat("script.min.js"))
		.pipe(srcmap.write("./maps"))
		.pipe(gulp.dest("dist/js"))
		.pipe(notify());
});

gulp.task("css", () => {
	return gulp
		.src("project/css/**/*.scss")
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
		.pipe(gulp.dest("dist/css"))
		.pipe(notify());
});

gulp.task("compress", () => {
	return gulp.src("dist/**/*.*").pipe(zip("website.zip")).pipe(gulp.dest("."));
});

gulp.task("watch", () => {
	gulp.watch("project/*.pug", gulp.series("html"));
	gulp.watch("project/css/**/*.scss", gulp.series("css"));
	gulp.watch("project/js/**/*.js", gulp.series("js"));
});
gulp.task("moveAssets", () => {
	return gulp.src(["project/webfonts","project/assets"]).pipe(gulp.dest("dist"))
});

gulp.task("default", gulp.series("watch"));
