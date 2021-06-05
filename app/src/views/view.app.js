import './app.scss';
import {
    checkDevice
} from '../../common/utils/utils';
import Logo from '../../common/svg/logo.svg'
import Data from '../../common/data/data.json'

class AppView {
    constructor() {
        document.body.classList.add(checkDevice());

    }

    init() {
        this.data = Data;
        this.addEvents();
        this.setMarkup();
        this.getURL();
    }



    getURL() {
        const self = this;
        const params = location.hash.slice(1) || "/";
        let parms = params.split('/');
        parms.shift();
        parms = parms.filter(v => v != ''); //https://stackoverflow.com/questions/19888689/remove-empty-strings-from-array-while-keeping-record-without-loop
        window.APP.controller.route(parms);

    }

    addEvents() {
        const self = this;
        window.addEventListener("hashchange", this.getURL.bind(this));
        for (let i = 0; i < document.querySelectorAll('a').length; i++) {
            const a = document.querySelectorAll('a')[i];
            a.addEventListener('click', self.addWait.bind(this));

        }
    }

    addWait() {
        document.querySelector('body').classList.add('wait');
    }

    setMarkup() {
        const self = this;
        const markup = /*html*/ `
        

        <main>
        
        </main>
        


        <div id="grain">
            <video class="video" playsinline="" autoplay="" loop="" muted="" src="common/media/img/f5.mp4">
                                <source src="common/media/img/f5.mp4" type="video/mp4">
                        </video>
        </div>

        <div id="preloader-wrap">
            <div id="preloader">

                    <div class="hero-introduction border half">
                            <div class="hero-logo">
                                ${Logo}
                            </div>

                            <dl>
                                <dt>${self.data.details.slogan}</dt>
                                <dd>Loading 0%</dd>
                            </dl>
                            
                        </div>
                        <div class="hero-image half pointer-none">
                        </div>
            

            </div>

        </div>
        

        <div class="rotate">
          
        </div>
        
        `;


        document.body.innerHTML = markup;

    }


    preload() {


    }

}


export default AppView;