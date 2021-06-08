import {
  onWheel,
  constrain
} from '../../common/utils/utils'
import {gsap
} from "gsap";

class DragController {
  constructor(opt) {

    //console.log('start scroll')
    this.pos = opt.pos;
    this.ease = opt.ease;
    this.delta = opt.delta;
    this.drag = opt.drag;
    this.target = opt.pos;
    this.container = opt.container;
    this.el = opt.el;
    this.point = 0;
  }

  init() {
    this.area = this.el.offsetWidth - this.container.offsetWidth;
    this.addEvents();
    this.anima();
  }

  addEvents() {
    const self = this;
    self.container.addEventListener("mousemove", self.move.bind(this));
    self.container.addEventListener("mousedown", self.down.bind(this));
    window.addEventListener("mouseup", self.up.bind(this));



    window.addEventListener("resize", self.resize.bind(this));
  }

  resize() {
   // console.log('resize');
    this.area = this.el.offsetWidth - this.container.offsetWidth;
    this.pos = 0;
    this.target = 0;
    this.point = 0;
    this.percent = 0;
    this.drag = 0;
    this.el.style.transform =
      "translateX(" + -this.percent + "%) translateY(" + 0 + "%)";
  }

  down(e) {
    const self = this;
    this.point = -this.point + e.clientX;
    this.moving = true;
    this.mX = 0;
 //   console.log("start moving");
    this.el.classList.add('active');

    gsap.to(self.container,{scale:.95,duration:.8,ease: "power3.out"});
  }

  move(e) {
    const self = this;
    if (this.moving) {

      self.drag = self.point - e.clientX;
      self.drag = constrain(self.drag, 0, self.area);


    }
  }

  up(e) {
    const self = this;
    this.moving = false;
    this.point = -this.drag;
   // console.log("stop moving", this.point);
    this.el.classList.remove('active');
    gsap.to(self.container,{scale:1,duration:.8,ease: "power3.out"});
  }

  anima() {
    const self = this;
    requestAnimationFrame(self.anima.bind(this));
    this.area = this.el.offsetWidth - this.container.offsetWidth;
    this.pos += (this.drag - this.pos) * this.ease;
    this.percent = (this.pos * 100) / this.el.offsetWidth;
    this.el.style.transform =
      "translateX(" + -this.percent + "%) translateY(" + 0 + "%)";
  }
}

export default DragController;