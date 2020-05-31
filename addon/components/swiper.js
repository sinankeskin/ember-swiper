import { getOwner } from '@ember/application';
import { assign } from '@ember/polyfills';
import { action, computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class SwiperComponent extends Component {
  elementId = guidFor(this);

  @tracked
  swiper;

  @computed
  get _config() {
    const config = getOwner(this).resolveRegistration('config:environment') || {};

    return config['ember-swiper5'] || {};
  }

  @computed('_componentOptions', '_config')
  get _options() {
    const options = {};

    assign(options, this._config, this._componentOptions);

    return options;
  }

  @computed('args')
  get _componentOptions() {
    const options = {};

    Object.keys(this.args).forEach((option) => {
      const _option = this.args[option];

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
    import('swiper')
      .then((module) => {
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

        const modules = [];
        const importedModules = this._config['imports'];

        if (!importedModules || importedModules === '*' || importedModules === ['*']) {
          Object.keys(module).forEach((m) => {
            if (m !== 'Swiper') {
              modules.push(module[m]);
            }
          });
        } else {
          Object.keys(module).forEach((m) => {
            if (m !== 'Swiper') {
              importedModules.forEach((i) => {
                if (module[m].name === i) {
                  modules.push(module[m]);
                }
              });
            }
          });
        }

        const Swiper = module.Swiper;

        Swiper.use(modules);

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
      })
      .catch((error) => {
        console.error('Dynamic import failed. Reason:' + error);
      });
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
