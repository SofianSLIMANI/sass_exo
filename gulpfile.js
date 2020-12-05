const{ src, dest, symlink, parallel, watch} = require('gulp');
const del= require('del');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//browser
function browser(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    watch('*.html').on('change', browserSync.reload);

}

// Sass to css

function sass(){
    return src('./sass/style.scss')
        .pipe(gulpSass())
        .pipe(dest('./css/'))
        .pipe(browserSync.stream());
}

//watch Scss
function watcher(done){
    watch('./sass/', sass)
    done();
}


//delete
function clean(){
    return del('dossier1')
}


//src + dest
function srcExemple(){
    return src('./*html')
        .pipe(dest('dossier1/'))
}

//function movePng(){
//return src('./img/*.png')
//   .pipe(dest('newImg'))
//}

//symlink
function linkExemple(){
    return src('./index.html')
        .pipe(symlink('link'))
}

//parallel 1
//function css(log){
// console.log("tache 1, exemple de css")
//  log();
//}

//parallel 2
//function sass(log){
//console.log("tache 2, exemple de compilation")
// log();
//}

//exports
module.exports = {
    srcExemple,
    linkExemple,
    sass,
    watcher,
    clean,
    //browser,
    browser: parallel(browser, watcher)
    //build: parallel(css, sass)

}