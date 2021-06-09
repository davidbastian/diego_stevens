import './style.scss';

class View {

    setup(data) {
        const self = this;
        data = data;

        const markup = /*html*/ `  
        <section id="about" class="border">
                <div class="bg"></div>
                    <div class="about-introduction content">
                        <p>${data.introduction}</p>
                    </div>

                    <figure class="quote">
                        <blockquote>
                        ${data.quotes[0].quote}
                        </blockquote>
                        <figcaption> ${data.quotes[0].caption}, <cite>${data.quotes[0].year}</cite></figcaption>
                    </figure>

                    <div class="content about-moments">
                        ${self.setMoments(data.quotes[0].moments)}
                    </div>

                    <figure class="quote">
                        <blockquote>
                        ${data.quotes[1].quote}
                        </blockquote>
                        <figcaption> ${data.quotes[1].caption}, <cite>${data.quotes[1].year}</cite> </figcaption>
                    </figure>

                    <div class="content about-moments">
                        
                    ${self.setMoments(data.quotes[1].moments)}

                    
                    </div>
                </section>`

                return markup;

    }

    setMoments(moments){
        let string = '';
        for (let i = 0; i < moments.length; i++) {
            const item = moments[i];
            let markup = /*html*/ `
                    <figure class="${item.orientation}" style="margin: ${item.position}">
                        <img class="parallax"  style="width: ${item.width};  transform-origin:${item.origin};" src="${item.url}" alt="${item.title}">
                        <dl>
                            <dt>${item.title}</dt>
                            <dd>${item.description}</dd>
                        </dl>
                    </figure>
                
                `
            string += markup + "";
        }
        return string;

    }



}

export default new View();