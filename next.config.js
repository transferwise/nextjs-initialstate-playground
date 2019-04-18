const withCSS = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');

module.exports = withSass(
  withTypescript(
    withCSS({
      cssLoaderOptions: {
        url: false
      }
    })
  )
);
