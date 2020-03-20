/* globals Swiper */
import { getOwner } from '@ember/application';
import { assign } from '@ember/polyfills';
import { action, computed, get } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

export default class SwiperComponent extends Component {
  elementId = guidFor(this);

  @computed
  get _config() {
    const config = getOwner(this).resolveRegistration('config:environment') || {};

    return config['ember-swiper'] || {};
  }

  @computed('_config')
  get _options() {
    const options = {};

    assign(options, this._config, this._componentOptions());

    return options;
  }

  _componentOptions() {
    const options = {};

    Object.keys(this.args).forEach(option => {
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
    this.swiper = new Swiper(`#${element.id}`, this._options);
  }

  @action
  _updateOptions() {
    this.swiper.update();
  }
}
