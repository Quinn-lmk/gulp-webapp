# gulp-webapp

构建一个网站或app的前端自动化工具，为自己而定，也适合团伙作案，极大的提高开发速度，以及避免各种坑~~

The description for every task in gulpfile.js：

1:styles
  compile sass,include autoprfixer andsourcemaps

2:scripts
  compile es6 to es5

3:lint
  jslint and unify coding style

4:lint:test
  just for javascript test framework

5:html
  compress and combine js/css/html

6:images
  compress images

7:fonts
  for fonts

8:extras
  transfer files in app to dist except "*html"

9:clean
  del .tmp and dist

10:serve !important
  watch files change and refresh in brower (contain ie ff chrome ...)

11:serve:dist
  preview dist
  
12:serve:test
  for javascript test framework

13:wiredep
  Wire Bower dependencies to source code.

14:build
  build project file
  
