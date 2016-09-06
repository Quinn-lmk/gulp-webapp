# gulp-webapp

构建一个网站或app的前端自动化工具，为自己而定，也适合团伙作案，极大的提高开发速度，以及避免各种坑~~

The description for every task in gulpfile.js：

* "styles" : compile sass,include autoprfixer andsourcemaps.

* "scripts" : compile es6 to es5;.

* "lint" : jslint and unify coding style.

* "lint:test" : just for javascript test framework.

* "html" : compress and combine js/css/html.

* "images" : compress images.

* "fonts" : for fonts.

* "extras" : transfer files in app to dist except "*html".

* "clean" : del .tmp and dist.

* "serve" : watch files change and refresh in brower (contain ie ff chrome ...).

* "serve:dist" : preview dist.

* "serve:test" : for javascript test framework.

* "wiredep" : Wire Bower dependencies to source code..

* "build" : build project file.
