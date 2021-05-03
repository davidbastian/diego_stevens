import {onWheel} from '../../common/utils/utils'

class ScrollController {
    constructor(opt) {
        
        console.log('start scroll')
        this.pos = opt.pos;
        this.ease = opt.ease;
        this.delta= opt.delta;
        this.target = opt.pos;
        this.container = opt.container;


    }

    init() {
        this.addEvents();
        this.anima();
    }

    addEvents(){
        const self = this;
        onWheel(self.scroll.bind(this));
    }

    scroll(e) {
    
        let delta;
        const self = this;
        console.log(e,self);
        if (e.spinX != 0) {
          delta = e.spinX * -self.delta;
        }
        if (e.spinY != 0) {
          delta = e.spinY * -self.delta;
        }
    
        self.target += delta;
        //self.target = self.constrain(self.target, -self.area, 0);
        
      }

    anima() {
        const self = this;
        requestAnimationFrame(self.anima.bind(this));

        this.pos += (this.target - this.pos) * this.ease;

       // console.log(this.pos,this.container);

        self.scrollHome(self.container.querySelector("#home"))
        self.scrollAbout(self.container.querySelector("#about"))

    }

    scrollHome(home){
        console.log(home,this.pos);
        home.style.transform = "translateX(" + 0 + "px) translateY(" + this.pos/10 + "%)";
        
        //blur image
        const blur = -this.pos/20;
        console.log(blur);
        home.querySelector('img').style.filter = "blur("+blur+"px)";
    }

    scrollAbout(about){
        console.log(about,this.pos);
        about.style.transform = "translateX(" + 0 + "px) translateY(" + this.pos/40 + "%)";
    }
}

export default ScrollController;