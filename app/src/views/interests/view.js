import './style.scss';

class View {

    setup(data) {
        const self = this;

        const markup = /*html*/ `  
        <section id="interests">
                    <div class="interests-image half">
                        <img class="cover" src="${data.image.url}" alt="">  
                    </div>

                    <div class="interests-list list half border">
                    <p>${data.title}</p>
                    <ul>
                        ${self.setInterests(data.list)}
                    </ul>
                    </div>
                    
        </section>`

                return markup;

    }

    setInterests(interests) {
        const self = this;
        let string = '';
        for (let i = 0; i < interests.length; i++) {
            const interest = interests[i];
            let markup = /*html*/ `
                <li>${interest}</li>
                `
            string += markup + "";
        }
        return string;
    }



}

export default new View();