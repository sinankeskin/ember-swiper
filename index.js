'use strict';

module.exports = {
  name: require('./package').name,
  options: {
    autoImport: {
      alias: {
        swiper: 'swiper/js/swiper.esm',
      },
    },
    babel: {
      plugins: [require.resolve('ember-auto-import/babel-plugin')],
    },
  },
  included(app) {
    this._super.included.apply(this, arguments);

    let hasSass =
      !!app.registry.availablePlugins['ember-cli-sass'] ||
      !!app.registry.availablePlugins['@csstools/postcss-sass'];
    let hasLess = !!app.registry.availablePlugins['ember-cli-less'];

    if (!hasSass && !hasLess) {
      app.import('node_modules/swiper/css/swiper.css');
    }
  },
};
