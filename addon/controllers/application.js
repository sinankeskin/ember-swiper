import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  log() {
    console.log('Initialized...');
  }

  slideTo(swiper) {
    swiper.slideTo(2, 4000);
  }
}
