const path = require("path");
const gulp = require("gulp");
const inky = require("inky");
const inlineCss = require("gulp-inline-css");
const wrapper = require("gulp-wrapper");
const htmlmin = require("gulp-htmlmin");
const handlebars = require("gulp-compile-handlebars");
const { header, footer } = require("./src/wrappers");

const input = path.resolve(__dirname, "./src/templates/");
const partials = path.resolve(__dirname, "./src/partials");
const assets = path.resolve(__dirname, "./src/assets");

gulp.task("default", function () {
  return (
    gulp
      .src(`${input}/**/*.email.html`)
      /** Apply the reset style sheet */
      .pipe(
        wrapper({
          header,
          footer,
        })
      )
      /** Build handlebars partials */
      .pipe(
        handlebars(
          {},
          {
            batch: [partials],
            compile: { allowCallsToHelperMissing: true },
            helpers: {
              /**
               * This will keep all the tokens ( expressions ) in the files
               * so they can be replaced later
               */
              helperMissing: function (token) {
                return `{{${token.name}}}`;
              },
            },
          }
        )
      )
      /** Convert html inky templates */
      .pipe(inky())
      /** Inline all CSS */
      .pipe(
        inlineCss({
          url: `file://${assets}/`,
        })
      )
      /** Minify the html to reduce file size */
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest("build"))
  );
});
