import './style.scss';

class View {

    setup(data) {
        const self = this;

        const markup = /*html*/ `  
        <section id="timeline" class="border content">
            ${self.setTimeline(data)}
        </section>`

        return markup;

    }

    setTimeline(timeline) {
        const self = this;
        let string = '';
        for (let i = 0; i < timeline.length; i++) {
            const item = timeline[i];
            let markup = /*html*/ `
                <div class="timeline-item">
                    <div class="timeline-item_content">
                        <h2>${item.year}</h2>
                        <div class="timeline-item_achivements">
                            ${self.setAchivements(item.achivements)}
                        </div>
                        ${self.setImageTimeline(item)}
                        
                    </div>
                </div>
                `
            string += markup + "";
        }
        return string;
    }

    setImageTimeline(item) {
        let markup;
        if (item.img) {
            markup = /*html*/ `<div class="img-timeline-wrap ${item.img.align}"><img src="${item.img.url}" alt=""></div>`
        } else {
            markup = "";

        }
        return markup
    }

    setAchivements(achivements) {
        const self = this;
        let string = '';
        for (let i = 0; i < achivements.length; i++) {
            const item = achivements[i];
            let markup = /*html*/ `
                <p>${item}</p>
                `
            string += markup + "";
        }
        return string;

    }



}

export default new View();