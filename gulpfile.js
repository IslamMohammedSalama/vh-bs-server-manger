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
import connect from "gulp-connect";
import noop from "gulp-noop";
import newer from "gulp-newer";

// import babel from "gulp-babel";
const sass = gulpSass(dartSass);
const isProduction = process.env.NODE_ENV === "production";

// File paths
const paths = {
	html: {
		src: "pug/index.pug",
		dest: "dist/",
		destPath: "dist/index.html",
	},
	css: {
		src: ["css/**/*.scss", "css/**/*.css"],
		dest: "dist/css",
		destPath: "dist/css/style.min.css",
	},
	js: {
		src: ["js/**/*.js"],
		dest: "dist/js",
		destPath: "dist/js/script.min.js",
	},
};

// HTML task
gulp.task("html", () =>
	gulp
		.src(paths.html.src,)
		.pipe(pug())
		.pipe(gulp.dest(paths.html.dest))
		// .pipe(
		// 	gulpNotify({
		// 		title: "Html Compile",
		// 		message: "Html Compile completed successfully!",
		// 		onLast: true,
		// 		// icon: "./assets/imgs/favicon.ico", // Optional: if you have a specific icon
		// 	})
		// )
		.pipe(connect.reload())
);

// New: Specific clean task for HTML output
gulp.task("clean:html", function () {
	return gulp
		.src(paths.html.destPath, { read: false, allowEmpty: true })
		.pipe(clean());
});

// CSS task
gulp.task("css", () =>
	gulp
		.src(paths.css.src, { base: "css",
			})
		.pipe(
			isProduction
				? noop()
				: sourcemaps.init({ largeFile: true, loadMaps: true })
		) // Boolean instead of string
		.pipe(sass({ style: "compressed" }))
		.on("error", sass.logError) // Error handling

		.pipe(autoprefixer())
		.pipe(gulpConcat("style.min.css"))
		.pipe(isProduction ? noop() : sourcemaps.write("maps"))
		// .pipe(gulp.dest(paths.styles.dest))
		.pipe(gulp.dest(paths.css.dest))
		.pipe(connect.reload())
		// .pipe(
		// 	gulpNotify({
		// 		title: "Css Compile",
		// 		message: "Css Compile completed successfully!",
		// 		onLast: true,
		// 		// icon: "./assets/imgs/favicon.ico", // Optional: if you have a specific icon
		// 	})
		// )
);

// New: Specific clean task for Css output
gulp.task("clean:css", function () {
	return gulp
		.src(paths.css.destPath, { read: false, allowEmpty: true })
		.pipe(clean());
});

// JavaScript task
gulp.task("js", () =>
	gulp
		.src(["js/*.js", "!js/dark_mode.js"], {
			base: "js",
		})
		.pipe(
			isProduction
				? noop()
				: sourcemaps.init({ largeFile: true, loadMaps: true })
		)
		.pipe(terser())
		.pipe(gulpConcat("script.min.js"))
		.pipe(isProduction ? noop() : sourcemaps.write("maps"))
		.pipe(connect.reload())
		.pipe(gulp.dest(paths.js.dest))
		// .pipe(
		// 	gulpNotify({
		// 		title: "Js Compile",
		// 		message: "JavaScript Compile completed successfully!",
		// 		onLast: true,
		// 		// icon: "./assets/imgs/favicon.ico", // Optional: if you have a specific icon
		// 	})
		// )
);

gulp.task("js:dark", () =>
	gulp.src("js/dark_mode.js").pipe(gulp.dest(paths.js.dest))
);

gulp.task("js-libs", () =>
	gulp
		.src("js/lib/**/*.js")
		.pipe(
			isProduction
				? noop()
				: sourcemaps.init({ largeFile: true, loadMaps: true })
		)
		.pipe(terser())
		.pipe(isProduction ? noop() : sourcemaps.write("maps"))
		.pipe(gulp.dest("dist/js/lib"))
		.pipe(connect.reload())
);
// JavaScript task
gulp.task("sw-js", () =>
	gulp
		.src("js/sw.js", { base: "js" })
		.pipe(gulp.dest(paths.html.dest))
		.pipe(connect.reload())
);

// New: Specific clean task for Js output
gulp.task("clean:js", function () {
	return gulp
		.src(paths.js.destPath, { read: false, allowEmpty: true })
		.pipe(clean());
});

// New: Specific clean task for Assets output
gulp.task("clean:assets", function () {
	return gulp
		.src("dist/assets/", { read: false, allowEmpty: true })
		.pipe(clean());
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
		.pipe(newer("dist")) // Skip unchanged files

		.pipe(gulp.dest("dist"))
		// .pipe(
		// 	gulpNotify({
		// 		title: "Assets Move",
		// 		message: "Build completed successfully!",
		// 		onLast: true,
		// 		// icon: "./assets/imgs/favicon.ico", // Optional: if you have a specific icon
		// 	})
		// )
);
gulp.task(
	"compress",
	() => gulp.src("dist/**/*").pipe(zip("website.zip")).pipe(gulp.dest("."))
	// .pipe(notify());
);

gulp.task("build-msg", function () {
	return gulp.src("dist/", { allowEmpty: true }).pipe(
		gulpNotify({
			title: "Gulp Build",
			message: "Build completed successfully!",
			onLast: true,
			// icon: "./assets/imgs/favicon.ico", // Optional: if you have a specific icon
		})
	); // Trigger the notification
});

gulp.task("connect", function (done) {
	connect.server({
		root: "./dist/",
		livereload: true,
		port: 8080,
		name: "VH Website",
	});
	done();
});
// Watch task
gulp.task("watch", () => {
	gulp.watch("pug/**/*.pug", gulp.series("html")); // Watch all pug files
	gulp.watch("css/**/*.scss", gulp.series("css"));
	// gulp.watch("js/dark_mode.js", gulp.series("js:dark"));
	gulp.watch("js/lib/**.js", gulp.series("js-libs"));
	gulp.watch("js/**.js", gulp.series("js"));
	gulp.watch(["assets/**/*", "webfonts/**/*"], gulp.series("assets")); // Watch assets and webfonts
});
gulp.task("clean", function () {
	return gulp.src(["dist/*"], { read: false, allowEmpty: true ,}).pipe(clean());
});

// Build task (runs all tasks)
gulp.task(
	"build",
	gulp.series(
		"clean",
		gulp.parallel(
			"html",
			"css",
			"js",
			// "js:dark",
			"js-libs",
			// "sw-js",
			"assets"
		),
		"compress",
		"build-msg"
	)
);

// Default task
gulp.task(
	"default",
	gulp.series(
		"build", // Step 1: Clean + compile everything
		gulp.parallel("connect", "watch") // Step 2 & 3: Serve & Watch simultaneously
	)
);
