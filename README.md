# gulp-webapp

构建一个网站或app的前端自动化工具，为自己而定，也适合团伙作案，极大的提高开发速度，以及避免各种坑~~

The description for every task in gulpfile.js：
01) styles
    compile sass,include autoprfixer andsourcemaps
02) scripts
    compile es6 to es5;
03) lint
    jslint and unify coding style
04) lint:test
    just for javascript test framework
05) html
    compress and combine js/css/html
06) images
    compress images
07) fonts
    for fonts
08) extras
    transfer files in app to dist except "*html";
09) clean
    del .tmp and dist;
10) serve !importantgit
    watch files change and refresh in brower (contain ie ff chrome ...)
10) serve:dist
    preview dist
11) serve:test
    for javascript test framework
12) wiredep
    Wire Bower dependencies to source code.
13) build
    build project file
    