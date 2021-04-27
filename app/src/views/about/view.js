import './style.scss';
import App from '../../../index';

import {
    TweenMax
} from 'gsap';



class View {

    init(params, data) {
        console.log(params, 'LOAD ABOUT');
        this.data = data[0];
        this.setup();

    }

    setup() {
        const self = this;
        const markup = /*html*/ `
            <div id="about" class="page">
                <section class="about_content">
                        ${this.data.acf.description}
                        <div class="about_social">
                           <a href="${this.data.acf.linkedin_url}" target="_blank">LinkedIn</a>
                           <a href="${this.data.acf.twitter_url}" target="_blank">Twitter</a>
                        </div>
                        <div class="about_profiles">
                            ${this.addProfiles()}
                        </div>
                        <div class="about_info">
                            <div class="about_info-desc">
                                ${this.addKeys()}
                                <div class="registered-about">
                                    <h3>Registered at</h3>
                                    <div>
                                        <img src="common/media/img/005.jpg" alt="">
                                    </div>
                                
                                </div>         
                            </div>
                        </div>                     
              </div>
            </section>
        `;
        document.body.querySelector('main').insertAdjacentHTML('afterbegin', markup);
        

        this.addEvents();
        window.APP.controller.routeTransition('about');

    }

    addEvents() {
        const self = this;
        document.querySelector('#about').addEventListener('scroll', self.scroll.bind(this));
    }

    scroll(e) {
        const header = document.querySelector('header');
        let st =  document.querySelector('#about').scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > this.lastScrollTop) {
            // downscroll code
        //    console.log('down');

            TweenMax.to(header, 0.5, {
                y: -100 + '%',
                ease: 'Power3.easeOut',
            });

        } else {
          //  console.log('up');
            TweenMax.to(header, 0.5, {
                y: 0 + '%',
                ease: 'Power3.easeOut',
            });
            // upscroll code
        }
        this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling


    }



    addKeys() {
        let string = '';
        for (let i = 0; i < this.data.acf.key_texts.length; i++) {
            const key_texts = this.data.acf.key_texts[i];
            let markup = /*html*/ `
            <h3>${key_texts.title}</h3>
            <p>${key_texts.description}</p>

            `;
            string += markup + "";

        }

        return string;

    }
    addProfiles() {
        const self = this;
        let string = '';
        for (let i = 0; i < this.data.acf.profiles.length; i++) {
            const profile = this.data.acf.profiles[i];
            let markup = /*html*/ `     
                <div>
                            <img src="${profile.image.url}" alt="">
                            <dl>
                                <dt>${profile.name}</dt>
                                <dd>${profile.role}</dd>
                            </dl>
                </div>

            `;
            string += markup + "";

        }

        return string;

    }


}

export default new View();