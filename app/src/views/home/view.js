import './style.scss';
import {
    TweenMax
} from 'gsap';
import {
    checkDevice
} from '../../../common/utils/utils';
import Logo from '../../../common/svg/logo.svg'


class View {

    init(params, data) {
        console.log(params,data, 'LOAD HOME');
        this.data = data;
        this.setup();
    }

    setup() {
        const self = this;
        const markup = /*html*/ `
                <section  id="home">
                    <div class="hero-introduction border">
                        <div class="hero-logo">
                            ${Logo}
                        </div>

                        <dl>
                            <dt>${self.data.slogan}</dt>
                            <dd><a href="">English</a>|<a href="">Spanish</a></dd>
                        </dl>
                         
  

                    </div>
                    <div class="hero-image">

                    </div>

                    <div></div>       
                </section>
        `
        document.body.querySelector('main').insertAdjacentHTML('afterbegin', markup);
       // this.preloadMedia(document.body.querySelector('#services').querySelectorAll('.media'));
    }

}

export default new View();