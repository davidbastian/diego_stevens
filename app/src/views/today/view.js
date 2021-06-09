import './style.scss';

class View {

    setup(data) {
        const self = this;

        const markup = /*html*/ `  
        <section id="today" class="border content">
                    <div class="bg"></div>
                    <div class="today-intro">
                            <h2>${data.title}</h2>
                            <p>${data.description}</p>     
                    </div>

                    <div class="today-cards">
                        <div class="today-cards_content grabbable">
                            ${self.setCards(data.cards)}
                        </div>  
                    </div>
        </section>`

        return markup;

    }
    setCards(cards) {
        const self = this;
        let string = '';
        for (let i = 0; i < cards.length; i++) {
            const item = cards[i];
            let markup = /*html*/ `
                    <div class="today-card">
                        <div class="today-card_info">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>

                        <video class="video" playsinline="" autoplay="" loop="" muted="" src="${item.media}">
                                <source src="${item.media}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>

                    </div>    
                `
            string += markup + "";
        }
        return string;

    }




}

export default new View();