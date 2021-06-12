class ParallaxController {
  constructor(opt) {
    //  console.log('start scroll')
    this.el = opt.el;
    this.ease = opt.ease;
    this.container = opt.container;
    this.percent = opt.percent;
    this.parallaxYPos = 0;
    this.parallaxXPos = 0;
    this.parallaxYTarget = 0;
    this.parallaxXTarget = 0;
  }

  init() {
    this.addEvents();
    this.animaParallax();
  }

  addEvents() {
    const self = this;
    self.container.addEventListener("mousemove", self.addParallax.bind(this));
  }

  removeEvents() {
    const self = this;
    self.container.removeEventListener("mousemove", self.addParallax);
  }

  addParallax(e) {

    const self = this;
    let percent = {
      x: (100 - ((window.outerWidth - e.screenX) * 200 / window.outerWidth)),
      y: (100 - ((window.outerHeight - e.screenY) * 200 / window.outerHeight)),
    }
    self.parallaxYTarget = percent.y / self.percent;
    self.parallaxXTarget = percent.x / self.percent;


  }

  animaParallax() {
    const self = this;
    requestAnimationFrame(self.animaParallax.bind(this));

    this.parallaxXPos += (this.parallaxXTarget - this.parallaxXPos) * self.ease;
    this.parallaxYPos += (this.parallaxYTarget - this.parallaxYPos) * self.ease;


    for (let i = 0; i < self.el.length; i++) {
      const element = self.el[i];

      element.parentElement.style.perspective = '1200px';
      element.style.transform = 'rotateX(' + self.parallaxYPos + 'deg) rotateY(' + -self.parallaxXPos + 'deg)';
    }
  }



}

export default ParallaxController;