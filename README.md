# vh-bs-server-manger

Note : I Writed AnyText (Like ServerName : AnyThing) Because The Back-End Devloper Will Edit The Code And Add His Api Because Iam Not Back-End Devloper , Iam Only Front-End Devloper

## To Devolpment This Website You Need A Requird Packages
To Install It Type In Terminal: 
```sh
npm install pug pug-cli sass terser nodemon
```

Then Don't Edit on `index.html` , `css/style.css` And `js/script.min.js` Because There Is A Compiled Files Edit on `pug/index.pug` `index.html` , `css/style.scss` (And AnyFile On css/sass) And `js/script.js`

To Compile The Code Should  On Root of The Project Then run Any Command  On your need
For Pug.js
```sh
pug ./index.pug -wo ../
```
sass:
```sh
sass -w --style=compressed css/style.scss css/style.css
```
For JavaScript : 
```sh
nodemon --watch script.js --exec "terser script.js --output script.min.js --compress --mangle --source-map"
```