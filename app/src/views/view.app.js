import './app.scss';
import {
    checkDevice
} from '../../common/utils/utils';
import {
    TweenMax
} from 'gsap';

class AppView {
    constructor() {
        document.body.classList.add(checkDevice());

    }

    init() {
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
            a.addEventListener('click',self.addWait.bind(this));
            
        }
    }

    addWait(){
        document.querySelector('body').classList.add('wait');
    }

    setMarkup() {
        const markup = /*html*/ `
        <header>
            <section>
                <nav>
                    
                </nav>
                
            </section>
            
        </header>

        <main>
        
        </main>
        
        <div>
            <div id="preloader">
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