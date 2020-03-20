'use strict';

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, arguments);

    // KioskBoard CSS + JS
    ['css', 'js'].forEach(ext => {
      app.import(`node_modules/swiper/${ext}/swiper.${ext}`);
    });
  }
};
