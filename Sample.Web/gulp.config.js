module.exports = function () {

    var config = {
        bowerComponentDirectory: "./bower_components/",
        applicationDirectory: "./app/",
        cdnDirectory: "./cdn/",
        outputDirectory: "./cdn/output/",
        vendorsDirectory: "./cdn/vendors/",
        buildDirectory: "./cdn/build/",
        fontDirectory: "./cdn/fonts/",
        externalLibsDirectory: "externalLibs/",
        externalLibsOutputDirectory: "./cdn/output/externalLibs/",
        applications: [
            { name: "application1", displayName: "application1" },
            { name: "common", displayName: "common" }
        ],
        templatesDirectory: "./app/**/*.html"
    };

    return config;
};