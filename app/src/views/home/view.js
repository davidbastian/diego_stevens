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
        console.log(params, data, 'LOAD HOME');
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
                            <dt>${self.data.details.slogan}</dt>
                            <dd><a class="active" href="">English</a><span>|</span><a href="">Spanish</a></dd>
                        </dl>
                         
                    </div>
                    <div class="hero-image">

                    </div>
                    <div></div>       
                </section>

                <section id="about" class="border">
                    <div class="introduction">
                        <p>${self.data.about.introduction}</p>
                    </div>

                    <figure class="quote">
                        <blockquote>
                        The art of making <br>
                        technology <br>
                        more natural.
                        </blockquote>
                        <figcaption> Keynote Conference, <cite>2020</cite> </figcaption>
                    </figure>

                
                </section>
        `
        document.body.querySelector('main').insertAdjacentHTML('afterbegin', markup);
        // this.preloadMedia(document.body.querySelector('#services').querySelectorAll('.media'));
    }

}

export default new View();