var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var minhtml = require("gulp-htmlmin");

// caminho SCSS/HTML
var scssArquivos = "./source/scss/*.scss";
var htmlArquivos = "./source/*.html";

// destino CSS/HTML
var cssDestino = "./dist/css";
var htmlDestino = "./dist";

/*Tarefa -> mincss (carrega com o comando 'gulp mincss') */
gulp.task('mincss', function(){
	return gulp.src(scssArquivos)
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(rename(function (path) {
    	path.basename += ".min";
    	path.extname = ".css"
  	}))
	.pipe(gulp.dest(cssDestino));

});


/*Tarefa -> minhtml (carrega com o comando 'gulp minhtml')*/
gulp.task('minhtml', function(){
	return gulp.src(htmlArquivos)
	.pipe(minhtml({collapseWhitespace: true}))
	.pipe(gulp.dest(htmlDestino))
});

/*Tarefa -> background (carrega com o comando 'gulp background')*/
gulp.task('background', function(){
	gulp.watch(scssArquivos, ['mincss']);
	gulp.watch(htmlArquivos, ['minhtml']);
});



/*Tarefa default - Carrega com o comando 'gulp'*/
gulp.task('default', ['mincss','minhtml','background']);

