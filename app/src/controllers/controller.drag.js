import {
  onWheel,
  constrain
} from '../../common/utils/utils'

class DragController {
  constructor(opt) {

    console.log('start scroll')
    this.pos = opt.pos;
    this.ease = opt.ease;
    this.delta = opt.delta;
    this.target = opt.pos;
    this.container = opt.container;
    this.el = opt.el;



  }

  init() {
    this.addEvents();
    this.anima();
  }

  addEvents() {
    const self = this;
    self.container.addEventListener("mousemove", self.move.bind(this));
    self.container.addEventListener("mousedown", self.down.bind(this));
    self.container.addEventListener("mouseup", self.up.bind(this));
  }

  down(e) {
    if (this.direction === "landscape") {
      this.point = e.clientX;
    } else {
      this.point = e.clientY;
    }
    this.moving = true;
    this.mX = 0;
    console.log("start moving");
  }

  move(e) {
    const self = this;
    if (this.moving) {
      let delta;

      if (self.timeout !== undefined) {
        window.clearTimeout(self.timeout);
      }
      self.timeout = window.setTimeout(function () {
        this.valR = 0;
        this.valL = 0;
        console.log("stop moving");
      }, 50);

      let n;
      if (this.direction === "landscape") {
        delta = this.point - e.clientX;
        n = (delta * this.el.offsetWidth) / this.wrap.offsetWidth;

        if (e.pageX < this.mX) {
          this.valR = 0;
          this.valL = this.valL - this.drag;
          this.target = this.target + this.valL;
        } else {
          this.valL = 0;
          this.valR = this.valR + this.drag;

          this.target = this.target + this.valR;
        }

        this.mX = e.pageX;
      } else {
        delta = this.point - e.clientY;
        n = (delta * this.el.offsetHeight) / this.wrap.offsetHeight;

        if (e.pageY < this.mX) {
          this.valR = 0;
          this.valL = this.valL - this.drag;
          this.target = this.target + this.valL;
        } else {
          this.valL = 0;
          this.valR = this.valR + this.drag;

          this.target = this.target + this.valR;
        }

        this.mX = e.pageY;
      }

      this.target = self.constrain(this.target, -self.area, 0);
    }
  }

  up(e) {
    this.moving = false;
    console.log("stop moving");
  }


  anima() {
    const self = this;
    // requestAnimationFrame(self.anima.bind(this));


  }
}

export default DragController;