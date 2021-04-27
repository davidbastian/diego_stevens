import './style.scss';

import {
    TweenMax
} from 'gsap';

import {
    isOdd
} from '../../../common/utils/utils';

class View {
    init(params, data) {
        console.log(params, 'LOAD SERVICES');
        this.data = data;
        this.setup();
    }

    setup() {
        this.setMarkup();
        this.addEvents();

        window.APP.controller.routeTransition('services_single');
        window.APP.controller.preloadMedia(document.querySelector('#services_single').querySelectorAll('.media-item'));
    }

    setMarkup(){
        const self = this;
        const markup = /*html*/ `
            <div id="services_single" class="page">
                <section>
                    <h2>${this.data[0].pure_taxonomies.categories[0].name}</h2>
                    <div class="services_single-projects">
                        ${this.setProjects()}
                    </div>
                </section>
                
            </div>
        `
        document.body.querySelector('main').insertAdjacentHTML('afterbegin', markup);
        self.normalizeProjects();

    }
    normalizeProjects(){
        let l = document.body.querySelectorAll('.gallery-item').length;
        var itm =  document.body.querySelectorAll('.gallery-item')[0];
        if (isOdd(l) && (l != 1)) {
            var cln = itm.cloneNode(true);
            document.body.querySelector(".services_single-projects").appendChild(cln);
        } else if (l === 1){
           // itm.parentNode.removeChild(itm);

        }
    }

    addEvents() {
        const self = this;
        document.querySelector('#services_single').addEventListener('scroll', self.scroll.bind(this));

        for (let i = 0; i < document.querySelector('#services_single').querySelectorAll('a').length; i++) {
            const element = document.querySelector('#services_single').querySelectorAll('a')[i];
            element.addEventListener("touchstart", self.addActive.bind(this,element,document.querySelector('#services_single').querySelectorAll('a')));
        }
       
    }

    addActive(element,elements,a){
       for (let i = 0; i < elements.length; i++) {
        const sib = elements[i];
            sib.classList.remove('active');
        }
        element.classList.add('active');


    }

    scroll(e) {
        const header = document.querySelector('header');
        let st = document.querySelector('#services_single').scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > this.lastScrollTop) {
            TweenMax.to(header, 0.5, {
                y: -100 + '%',
                ease: 'Power3.easeOut',
            });

        } else {
            TweenMax.to(header, 0.5, {
                y: 0 + '%',
                ease: 'Power3.easeOut',
            });
        }
        this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling


    }

    setProjects() {
        const self = this;
        let string = '';
        let count = 0;

        for (let i = 0; i < self.data.length; i++) {
            const project = self.data[i];

          //  console.log(project, 'hola');

            if (project.better_featured_image) {
                if (project.better_featured_image.media_type === 'image') {


                    let markup = /*html*/ `
                    <a href="#/services/${self.data[i].pure_taxonomies.categories[0].slug}/${self.data[i].slug}" class="gallery-item" data-id ="${self.data[i].id}">
                                    <div class="gallery-item_media">  
                                    <img class="media-item" src="${project.better_featured_image.source_url}" alt="">
                                    <div class="area"></div>
                                    </div>
                                    <p>${self.data[i].title.rendered}</p>
                    </a>      
                `;
                    count = count + 1;
                    string += markup + "";

                }

            }


        }

        return string;
    }
}

export default new View();