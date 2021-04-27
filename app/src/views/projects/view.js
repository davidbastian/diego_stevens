import './style.scss';
import {
    checkDevice,
    text_truncate,
    isOdd
} from '../../../common/utils/utils';


class View {
    init(params, data) {
        console.log(params, 'LOAD PROJECT');
        this.data = data[0];
        this.setup();
    }

    setup() {
        this.setMarkup();
        window.APP.controller.routeTransition('project');
        window.APP.controller.preloadMedia(document.querySelector('#project').querySelectorAll('.media-item'));
    }
    setMarkup() {
        const self = this;
        const markup = /*html*/ `
            <div id="project" class="page">
                <nav>
                <section>
                    <div class="project_title">${this.setTitle(this.data.title.rendered)}</div> 
                    <a  class="project_close" href="#/services/${this.data.pure_taxonomies.categories[0].slug}">Close Project<span>x</span></a>
                </section>
              
                </nav>
                <section>
                    <div class="project_featured-image" style="background-image:url(${this.data.better_featured_image.source_url})"></div>
                    <div class="project_info">
                        <div class="project_description">
                            <p>${this.data.acf.description}</p>
                        </div>
                        <div class="project_details">
                            <dl>
                                <dt>Client</dt>
                                <dd>${this.data.acf.details.client}</dd>
                            </dl>
                            <dl>
                                <dt>Location</dt>
                                <dd>${this.data.acf.details.location}</dd>
                            </dl>
                            <dl>
                                <dt>Services Provided</dt>
                                <dd>${this.data.acf.details.services_provided}</dd>
                            </dl>
                        </div>
                    </div>

                    <div class="project_gallery">  
                            ${self.setGallery(self.data.acf.gallery)}
                    </div>

                </section>
          
            </div>
            `;
        document.body.querySelector('main').insertAdjacentHTML('afterbegin', markup);

        self.normalizeProjects();
    }

    normalizeProjects() {
        let l = document.body.querySelectorAll('.project_gallery-item').length;
        var itm =  document.body.querySelectorAll('.project_gallery-item')[0];
        if (isOdd(l) && (l != 1)) {
            var cln = itm.cloneNode(true);
            document.body.querySelector(".project_gallery").appendChild(cln);
        } else if (l === 1){
            itm.parentNode.removeChild(itm);

        }
    }

    setTitle(title) {
        if (checkDevice() === 'mobile') {
            title = text_truncate(title, 34);
            return title;

        } else {
            return title;
        }
    }


    setGallery(gallery) {
        const self = this;
        let string = '';
        for (let i = 0; i < gallery.length; i++) {
            const image = gallery[i];

            if (image.type === 'image') {
                let markup = /*html*/ `
                <div class="project_gallery-item">
                        <div class="project_gallery-item-image">
                            <img class="media-item"  src="${image.url}" alt="">
                        </div>  
                </div>                 
        `;
                string += markup + "";

            }

        }

        return string;
    }
}

export default new View();