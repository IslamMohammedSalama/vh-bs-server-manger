import gulp from "gulp";
import gulpConcat from "gulp-concat";
import pug from "gulp-pug";
import autoprefixer from "gulp-autoprefixer";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import terser from "gulp-terser";
import clean from "gulp-clean";
import zip from "gulp-zip";
import gulpNotify from "gulp-notify";
const sass = gulpSass(dartSass);
// import * as del from "del";
// File paths
const paths = {
	html: {
		src: "pug/index.pug",
		dest: "dist/",
		destPath: "dist/index.html",
	},
	css: {
		src: ["css/**/*.scss", "css/**/*.css", "!css/style.min.css"],
		dest: "dist/css",
		destPath: "dist/css/style.min.css",
	},
	js: {
		src: ["js/**/*.js", "!js/script.min.js"],
		dest: "dist/js",
		destPath: "dist/js/script.min.js",
	},
};

// HTML task
gulp.task(
	"html",
	() =>
		gulp
			.src(paths.html.src)
			.pipe(pug())
			// .pipe(gulp.dest(paths.html.dest))
			.pipe(gulp.dest(paths.html.dest))
	// .pipe(notify());
);

// New: Specific clean task for HTML output
gulp.task("clean:html", function () {
	return gulp
		.src(paths.html.destPath, { read: false, allowEmpty: true })
		.pipe(clean());
});

// CSS task
gulp.task(
	"css",
	() =>
		gulp
			.src(paths.css.src, { base: "css" })
			.pipe(sourcemaps.init({ largeFile: true, loadMaps: true })) // Boolean instead of string
			.pipe(
				sass({
					style: "compressed", // Updated property name
				}).on("error", sass.logError) // Error handling
			)
			.pipe(
				autoprefixer({
					overrideBrowserslist: ["last 2 versions"],
					cascade: false,
				})
			)
			.pipe(gulpConcat("style.min.css"))
			.pipe(sourcemaps.write("./maps"))
			// .pipe(gulp.dest(paths.styles.dest))
			.pipe(gulp.dest(paths.css.dest))
	// .pipe(notify());
);

// New: Specific clean task for HTML output
gulp.task("clean:css", function () {
	return gulp
		.src(paths.css.destPath, { read: false, allowEmpty: true })
		.pipe(clean());
});

// JavaScript task
gulp.task(
	"js",
	() =>
		gulp
			.src(paths.js.src, { base: "js" })
			.pipe(sourcemaps.init({ largeFile: true, loadMaps: true })) // Boolean instead of string
			.pipe(terser())
			.pipe(gulpConcat("script.min.js"))
			.pipe(sourcemaps.write("./maps"))
			.pipe(gulp.dest(paths.js.dest))
	// .pipe(gulp.dest(paths.scripts.dest))
	// .pipe(notify());
);
// New: Specific clean task for HTML output
gulp.task("clean:js", function () {
	return gulp
		.src(paths.js.destPath, { read: false, allowEmpty: true })
		.pipe(clean());
});
// Watch task
gulp.task("watch", () => {
	gulp.watch("pug/**/*.pug", gulp.series("clean:html", "html")); // Watch all pug files
	gulp.watch("css/**/*.scss", gulp.series("clean:css","css"));
	gulp.watch(paths.js.src, gulp.series("clean:js","js"));
	gulp.watch(["assets/**/*", "webfonts/**/*"], gulp.series("assets")); // Watch assets and webfonts
});
gulp.task("clean", function () {
	return gulp.src(["dist/*"], { read: false, allowEmpty: true }).pipe(clean());
});

// Assets and webfonts task
gulp.task("assets", () =>
	gulp
		.src(["assets/**/*", "webfonts/**/*"], {
			base: "./",
			buffer: true,
			dot: true, // Include dotfiles
			nodir: false,
			encoding: false,
		})
		.pipe(gulp.dest("dist"))
);
gulp.task(
	"compress",
	() => gulp.src("dist/**/*").pipe(zip("website.zip")).pipe(gulp.dest("."))
	// .pipe(notify());
);

function notifyBuildComplete(cb) {
	gulpNotify({
		title: "Gulp Build",
		message: "Build completed successfully!",
		onLast: true,
		// icon: 'path/to/your/icon.png' // Optional: if you have a specific icon
	}).write({}); // Trigger the notification
	cb(); // Signal Gulp that this task is done
}

// Build task (runs all tasks)
gulp.task(
	"build",
	gulp.series(
		"clean",
		gulp.parallel("html", "css", "js", "assets"),
		"compress",
		notifyBuildComplete
	)
);

// Default task
gulp.task("default", gulp.series("build", "watch"));
