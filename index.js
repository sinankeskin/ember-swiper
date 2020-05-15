'use strict';

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, arguments);

    // Swiper CSS + JS
    app.import('node_modules/swiper/js/swiper.js');

    let hasSass =
      !!app.registry.availablePlugins['ember-cli-sass'] || !!app.registry.availablePlugins['@csstools/postcss-sass'];
    let hasLess = !!app.registry.availablePlugins['ember-cli-less'];

    if (!hasSass && !hasLess) {
      app.import('node_modules/swiper/css/swiper.css');
    }
  },
};
