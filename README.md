# ember-swiper5

Ember addon for [Swiper](https://swiperjs.com/) slider library.

## Compatibility

- Ember.js v3.12 or above
- Ember CLI v2.13 or above
- Node.js v10 or above

## Installation

```
ember install ember-swiper5
```

## Usage

You can change all global configuration settings via `config/environment.js` file.

Please check [Swiper](https://swiperjs.com/api/) site for more configuration details.

```javascript
ENV['ember-swiper5'] = {
  speed: 450,
  loop: true, // etc
};
```
#### As of >= v1.2.0 dynamic imports added to addon.

You can import only modules you want.

Avaiable module names:
- a11y
- autoplay
- controller
- effect-coverflow
- effect-cube
- effect-fade
- effect-flip
- hash-navigation
- history
- keyboard
- lazy
- mousewheel
- navigation
- pagination
- parallax
- scrollbar
- thumbs
- virtual
- zoom

```javascript
ENV['ember-swiper5'] = {
  imports: "*" // or ["*"] for every modules
};
```

```javascript
ENV['ember-swiper5'] = {
  imports: ["a11y", "pagination", "navigation"] // only these modules
};
```

Default configuration

```handlebars
<Swiper as |swiper|>
  <swiper.slide> // or not contextual Swiper::Slide
    Slide 1
  </swiper.slide>
  <swiper.slide>
    Slide 2
  </swiper.slide>
  <swiper.slide>
    Slide 3
  </swiper.slide>
</Swiper>
```

Full configuration

```handlebars
<Swiper
  @loop={{false}}
  @speed={{400}}
  @spaceBetween={{100}}
  @scrollbar={{hash el='.swiper-scrollbar' hide=true}}
  @on={{hash init=(fn this.log)}} as |swiper|
>
  <!-- Block component for slides -->
  <swiper.slide>
    Slide 1
  </swiper.slide>
  <swiper.slide>
    Slide 2
  </swiper.slide>
  <swiper.slide>
    Slide 3
  </swiper.slide>
  <!-- If you use @pagination parameter you must use swiper.pagination component. Otherwise it won't show. -->
  <swiper.pagination />
  <!-- If you want to change the defaults use swiper.pagination component with block. -->
  <swiper.pagination>
    <div class="my-swiper-pagination"></div>
  </swiper.pagination>
  <!-- Same as @pagination -->
  <swiper.navigation />
  <!-- Same as @pagination -->
  <swiper.scrollbar />
  <!-- If you want to reach the instance you should use swiper.header or swiper.footer component. This yields the instance. -->
  <!-- swiper.content component is deprecated now. -->
  <!-- swiper.header will place before the slider no matter where you put. -->
  <!-- swiper.footer will place after the slider no matter where you put. -->
  <!-- That way you can reach all parameters and invoke methods like slideTo etc... -->
  <swiper.header as |self|>
    <button type="button" {{on 'click' (fn this.slideTo self)}}>
      Move
    </button>
  </swiper.header>
  <swiper.footer as |self|>
    <button type="button" {{on 'click' (fn this.slideTo self)}}>
      Move
    </button>
  </swiper.footer>  
</Swiper>
```

All slideXXX events returns swiper instance. That way you can reach all properties like realIndex etc...

> Note: If you use sass or less; ember-swiper5 will be imported automatically.

> In ember-swiper5 file; after the //IMPORT_COMPONENTS line you should import the component(s) you need.

> Ex: For scrollbar: @import './components/scrollbar/scrollbar'; etc...

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
