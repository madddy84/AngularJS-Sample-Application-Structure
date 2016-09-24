var tasks = [];
var gulpConfig = require('./gulp.config.js')();
var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var templateCache = require('gulp-angular-templatecache');
var plugin = require("gulp-load-plugins")();
var concatFilenames = require('gulp-concat-filenames');
var argv = require('yargs').argv;
var debug = require('gulp-debug');

var fileNameFormatter = function (fileName) {
    return "../app/" + fileName;

};

var concatFileNamesOptions = {
    prepend: '/// <reference path="',
    append: '" />',
    root: './app',
    template: fileNameFormatter
};

// Generate _refrences.ts file with refrence of all the typescript files in 1 single file
gulp.task("generate-typescript-refrences", function () {
    return gulp
            .src(["./app/**/*.ts",
                "!./app/**/*.d.ts",
                "typings/**/*.d.ts",
                "externalLibs/*.ts",
                "externalLibs/*.d.ts",
                "!./app/_references.ts"])
            .pipe(concatFilenames('_references.ts', concatFileNamesOptions))
            .pipe(gulp.dest("./app/"));
});



//// Copy fonts folder to cdn
//gulp.task("copy-fonts-to-cdn", function () {
//    return gulp
//            .src(["./app/content/fonts/*.*"])
//            .pipe(gulp.dest(gulpConfig.fontDirectory));
//});

//tasks.push('copy-fonts-to-cdn');

// Copy contents folder to cdn
gulp.task("copy-contents-to-cdn", function () {
    var themeName = "Theme1";

    return gulp
            .src([
                "./app/content/**/*",
                "./themes/" + themeName + "/**/*"
            ])
            .pipe(gulp.dest(gulpConfig.cdnDirectory));
});

tasks.push('copy-contents-to-cdn');


// Install libraries task
gulp.task('install-libraries', function () {
    return plugin.bower();
});

// Register install library task 
tasks.push('install-libraries');

// Install libraries task
gulp.task('install-library-main-files', ['install-libraries'], function () {
    gulp.src(mainBowerFiles())
        .pipe(gulp.dest(gulpConfig.vendorsDirectory));
});

// Register install library task 
tasks.push('install-library-main-files');

var templateCacheTask = function () {
    var templatesPath = gulpConfig.templatesDirectory;
    return gulp
        .src(templatesPath)
        .pipe(templateCache("templateCache.js", {
            standalone: true,
            root: "",
            transformUrl: function (url) {
                var indexofSlash, urlLength;

                if (url.lastIndexOf("uigrid.expandableRow.html") > 0)
                    return "ui-grid/expandableRow";
                else if (url.lastIndexOf("uigrid.expandableScrollFiller.html") > 0)
                    return "ui-grid/expandableScrollFiller";
                else {
                    indexofSlash = url.lastIndexOf('\\') + 1;
                    urlLength = url.length;
                    return url.substring(indexofSlash, urlLength)
                }
            }

        }))
        .pipe(gulp.dest(gulpConfig.buildDirectory));
};

gulp.task('template-cache-task', templateCacheTask);

tasks.push('template-cache-task');

var compileApplicationFiles = function (srcPath, destPath, task) {
    var compileTaskName = task.name + "-compile";
    var webifyTaskName = task.name + "-webify";
    var instrumentTaskName = task.name + "-inst";

    gulp.task(compileTaskName, ["generate-typescript-refrences"], function () {
        return gulp
            .src(
            ["./app/_references.ts",
                srcPath + '/**/*.ts',
                '!' + srcPath + '/**/*.d.ts',
                '!' + srcPath + '/**/*.test.ts'
            ])
            .pipe(plugin.typescript(
            {
                target: 'ES5'
            }))
            .pipe(gulp.dest(destPath));
    });
    gulp.task(webifyTaskName, [compileTaskName], function () {
        return gulp
            .src([destPath + "/**/*.module.js", destPath + "/**/*.js", "!" + destPath + "/**/*Resource*.js", "!" + destPath + "/**/*Resource*.module.js"])
            .pipe(plugin.concat(task.displayName + '.build.js'))
            .pipe(gulp.dest(gulpConfig.buildDirectory));
    });

    gulp.task(webifyTaskName + "-resources", [compileTaskName], function () {
        return gulp
            .src([destPath + "/**/*Resource*.module.js", destPath + "/**/*Resource*.js"])
            .pipe(debug({ title: 'Resource files:' }))
            .pipe(plugin.concat(task.displayName + '-resources.build.js'))
            .pipe(gulp.dest(gulpConfig.buildDirectory));
    });

    tasks.push(webifyTaskName);
    tasks.push(webifyTaskName + "-resources");
};

var compileAndWebifyExternalLibs = function () {

    gulp.task("compile-external-libs", ["generate-typescript-refrences"], function () {

        return gulp
                .src(
                [
                    gulpConfig.externalLibsDirectory + "*.ts",
                    '!' + gulpConfig.externalLibsDirectory + "*.d.ts"
                ])
        .pipe(plugin.typescript(
            {
                target: 'ES5'
            }))
        .pipe(gulp.dest(gulpConfig.externalLibsOutputDirectory));
    });
    gulp.task("webify-external-libs", ["compile-external-libs"], function () {

    });

    gulp.task("webify-external-libs", ["compile-external-libs"], function () {

        var files = [];

        if (argv.instrumentSource) {
            files.push("./Coverage/YUITest/yuitest.js");
            files.push("./Coverage/YUITest/yui-min.js");
        }

        files.push(gulpConfig.externalLibsOutputDirectory + "/*.js");
        files.push(gulpConfig.externalLibsDirectory + "/javascript/*.js");

        return gulp
            .src(files)
            .pipe(debug({ title: 'extLibs:' }))
            .pipe(plugin.concat("externalLibs.build.js"))
            .pipe(gulp.dest(gulpConfig.buildDirectory));
    });
    tasks.push("webify-external-libs");
}
compileAndWebifyExternalLibs();
// Register TypeScript jobs
gulpConfig.applications.forEach(function (task) {

    var srcPath = gulpConfig.applicationDirectory + task.name;
    var destPath = gulpConfig.outputDirectory + task.name;
    compileApplicationFiles(srcPath, destPath, task);
});


// Run the task
gulp.task('default', tasks);
