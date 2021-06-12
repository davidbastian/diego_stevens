import {
  constrain
} from '../../common/utils/utils'
import VirtualScroll from 'virtual-scroll';

class ScrollController {
  constructor(opt) {

    //  console.log('start scroll')
    this.pos = opt.pos;
    this.ease = opt.ease;
    this.delta = opt.delta;
    this.target = opt.pos;
    this.container = opt.container;
    this.timeline = opt.timeline;
  }

  init() {
    const self = this;
    this.scroller = new VirtualScroll({
      el:self.container
    });
    this.addEvents();
    this.anima();

  }

  addEvents() {
    const self = this;
    self.scroller.on(self.scroll.bind(this));
  }

  removeEvents() {
    const self = this;
    self.scroller.off();
  }


  scroll(e){
    let delta;
    const self = this;

      delta = (e.deltaY/120) * self.delta;

    self.target += delta;
    self.target = constrain(self.target, -10000, 0);
  }


  anima() {
    const self = this;
    self.animation = requestAnimationFrame(self.anima.bind(this));
    this.pos += (this.target - this.pos) * this.ease;
    let np = -this.pos * 0.0001;
    let s = constrain(np, 0, 1);
    self.timeline.progress(s);

  }

  update(tl, n) {
    const self = this;
    cancelAnimationFrame(self.animation);
    tl.progress(n)
    this.pos = -n / 0.0001;
    this.target = -n / 0.0001;
    this.anima();
  }

  pause() {
    const self = this;
    cancelAnimationFrame(self.animation);
  }

}

export default ScrollController;