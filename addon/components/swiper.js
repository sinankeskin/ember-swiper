/* globals Swiper */
import { getOwner } from '@ember/application';
import { assign } from '@ember/polyfills';
import { action, computed, get } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class SwiperComponent extends Component {
  elementId = guidFor(this);

  @tracked
  swiper;

  constructor() {
    super(...arguments);

    this.swiper = null;
  }

  @computed
  get _config() {
    const config = getOwner(this).resolveRegistration('config:environment') || {};

    return config['ember-swiper5'] || {};
  }

  @computed('_config')
  get _options() {
    const options = {};

    assign(options, this._config, this._componentOptions());

    return options;
  }

  _componentOptions() {
    const options = {};

    Object.keys(this.args).forEach((option) => {
      const _option = get(this.args, option);

      if (typeof _option === 'object') {
        options[option] = Object.assign({}, _option);
      } else {
        options[option] = _option;
      }
    });

    return options;
  }

  @action
  _initializeOptions(element) {
    const slideEvents = [
      'slideChange',
      'slideChangeTransitionStart',
      'slideChangeTransitionEnd',
      'slideNextTransitionStart',
      'slideNextTransitionEnd',
      'slidePrevTransitionStart',
      'slidePrevTransitionEnd',
    ];

    if (this._options.on) {
      slideEvents.forEach((eventName) => {
        if (this._options.on[eventName] && typeof this._options.on[eventName] === 'function') {
          delete this._options.on[eventName];
        }
      });
    }

    this.swiper = new Swiper(element, this._options);

    if (this.args.on) {
      slideEvents.forEach((eventName) => {
        if (this.args.on[eventName] && typeof this.args.on[eventName] === 'function') {
          this.swiper.on(eventName, () => {
            this.args.on[eventName](this.swiper);
          });
        }
      });
    }
  }

  @action
  _updateOptions() {
    this.swiper.update();
  }

  @action
  _destroyOptions() {
    this.swiper.destroy();
  }
}
