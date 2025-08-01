# vh-bs-server-manger

Note : I Wrote AnyText (Like ServerName : AnyThing) Because The Back-End Developer Will Edit The Code And Add His Api Because Iam Not Back-End Developer , Iam Only Front-End Developer

## To Development This Website You Need A Require Packages

To Install It Type In Terminal:

```sh
npm install
```

Then Don't Edit on `dist/index.html` , `dist/css/style.min.css` And `dist/js/script.min.js` Because There Is A Compiled Files Edit on `pug/index.pug` `index.html` , `css/style.scss` (And AnyFile On css/sass) And `js/script.js`

For Start Development This Is The Command You Will Use

```sh
NODE_ENV=development gulp
```

For Build The ProJect U Will Type

```sh
NODE_ENV=production gulp build
```

**Note** : After Push On This ProJect (Or Make Anything) run `npm run deploy` to Refresh changes On gh-pages branch
