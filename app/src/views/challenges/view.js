import './style.scss';
import Star from '../../../common/media/svg/star.svg'

class View {

    setup(data) {
        const self = this;

        const markup = /*html*/ `  
        <section id="challenges">
                    <div class="bg"></div>

                    <div class="challenges-list list half border">
                        <p><span>${Star}</span> ${data.title}</p>
                        <ul>
                            ${self.setChallenges(data.list)}
                        </ul>
                    </div>

                    <div class="challenges-image half">
                        <img class="cover" src="${data.image.url}" alt="">  
                    </div>
        </section>`

                return markup;

    }

    setChallenges(challenges) {
        const self = this;
        let string = '';
        for (let i = 0; i < challenges.length; i++) {
            const challenge = challenges[i];
            let markup = /*html*/ `
                <li class="done-${challenge.done}">${challenge.title}</li>
                `
            string += markup + "";
        }
        return string;
    }



}

export default new View();