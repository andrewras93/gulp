const gulp = require("gulp");
const sass = require("gulp-sass");

function styles(){

    // Tager en sass (scss) fil og compiler den til css

    return(
        gulp.src("css/*.scss")
        // Kigger efter alle filer i min css mappe, som har endelsen scss
            .pipe(sass())
            // Skal bruge sass på de filer den har fundet oppe i src
            .pipe(gulp.dest("css"))
            // Hvor den skal smide de compiled filer hen
    );
}

exports.styles = styles;