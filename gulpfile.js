const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const rename = require("gulp-rename");

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

function js(){

    return(
        gulp.src(["js/*.js", "!js/*.min.js"])
            // Kigger efter alle filer i min js mappe, som har endelsen js, men ikke min.js
            .pipe(terser())
            // Minifier vores js fil
            .pipe(rename({
                suffix: ".min"
            }))
            // Bruges til at give vores minified js fil et nyt navn, så den ikke overskriver den nuværende js fil
            // suffix er det modsatte af prefix, og vil i det her tilfælde tilføje .min til sidst i navnet af js filen
            .pipe(gulp.dest("js"))
    );
}

function watch(){

    gulp.watch("css/*.scss", styles);
    // Modtager to parameter, første er hvad den skal holde øje med (hvilke filer), og så hvilken funktion den skal køre når der sker ændringer i de filer
    gulp.watch(["js/*.js", "!js/*.min.js"], js);

}

const build = gulp.parallel(styles, js);
// Brug gulp.series hvis det er vigtigt hvilken rækkefølge funktionerne køres i
// build sørger for at bygge filen op så alt kører som det skal

exports.styles = styles;
exports.js = js;
exports.watch = watch;
exports.build = build;