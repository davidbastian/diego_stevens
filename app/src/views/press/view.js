import './style.scss';
import {
    checkDevice
} from '../../../common/utils/utils';

class View {

    setup(clients, press) {
        const self = this;
        this.device = checkDevice();

        const markup = /*html*/ `  
        <section id="press" class="content">
                    <div class="bg"></div>	

                    <div id="clients">
                        <div class="clients-container">
                            <p>${clients.description}</p>
                            ${self.setClientsBrands(clients)}
                            
                        </div>    
                    </div>


                    <div class="press-intro">
                            <h2>${press.title}</h2>
                            <p>${press.description}</p>
                            
                    </div>

                    <div class="press-articles content"> 
                        <div class="border">
                            ${self.setArticles(press.articles)}
                        </div>  
                    </div>

        </section>`

        return markup;

    }

    setArticles(articles) {
        const self = this;
        let string = '';
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            let markup = /*html*/ `
                <a target="_blank" href="${article.url}">
                    <img src="${article.img}" alt="${article.title}">
                    <h6><b>${article.type}, </b>${article.date}</h6>
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                </a>
                `
            string += markup + "";
        }
        return string;


    }


    setClientsBrands(clients) {
        const self = this;
        let markup;
        if (self.device === 'mobile') {

            markup = /*html*/ `
            <img class="pointer-none" src="${clients.imgMobile}" alt="">`

        } else {
            markup = /*html*/ `
            <img class="pointer-none" src="${clients.img}" alt="">`

        }

        return markup;

    }





}

export default new View();