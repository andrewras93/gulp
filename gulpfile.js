const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

function styles(){

    // Tager en sass (scss) fil og compiler den til css

    return(
        gulp.src("css/*.scss")
        // Kigger efter alle filer i min css mappe, som har endelsen scss
            .pipe(sourcemaps.init())
            // Initiere et sourcemap
            // Et sourcemap forbinder vores sass (scss) fil med vores compiled css fil, så vi i browseren præcist kan se hvor vores styling regel er skrevet
            .pipe(sass())
            // Skal bruge sass på de filer den har fundet oppe i src
            .pipe(postcss([autoprefixer({grid:true}), cssnano()]))
            // Sætter automatisk prefixes (-ms- -moz- -webkit-) på css regler, hvor det er nødvendigt
            // cssnano giver os en minified version af vores css fil, så alt nærmest står på en linje og på den måde får filen til at fylde mindre
            .pipe(sourcemaps.write("."))
            // Skriver sourcemap til følgende destination
            .pipe(gulp.dest("css"))
            // Hvor den skal smide de compiled filer hen
    );
}

function watch(){

    gulp.watch("css/*.scss", styles);
    // Modtager to parameter, første er hvad den skal holde øje med (hvilke filer), og så hvilken funktion den skal køre når der sker ændringer i de filer

}

exports.styles = styles;
exports.watch = watch;