import './style.scss';
import {
    TweenMax
} from 'gsap';
import {
    checkDevice
} from '../../../common/utils/utils';
import Logo from '../../../common/svg/logo.svg'


class View {

    init(params, data) {
        console.log(params, data, 'LOAD HOME');
        this.data = data;
        this.setup();
    }

    setup() {
        const self = this;
        const markup = /*html*/ `
                <section  id="home">
                    <div class="hero-introduction border half">
                        <div class="hero-logo">
                            ${Logo}
                        </div>

                        <dl>
                            <dt>${self.data.details.slogan}</dt>
                            <dd><a class="active" href="">English</a><span>|</span><a href="">Spanish</a></dd>
                        </dl>
                         
                    </div>
                    <div class="hero-image half">
                            <img class="cover" src="${self.data.details.image}" alt="${self.data.details.slogan}">
                    </div>
                    <div></div>       
                </section>

                <section id="about" class="border">
                    <div class="about-introduction content">
                        <p>${self.data.about.introduction}</p>
                    </div>

                    <figure class="quote">
                        <blockquote>
                        ${self.data.about.quotes[0].quote}
                        </blockquote>
                        <figcaption> ${self.data.about.quotes[0].caption}, <cite>${self.data.about.quotes[0].year}</cite> </figcaption>
                    </figure>

                    <div class="content about-moments">
                        
                    <figure class="vertical" style="margin-left: 6vw;">
                        <img style="width:27vw" src="common/media/img/001.png" alt="">
                        <dl>
                            <dt>Diego & Lorem ipsum</dt>
                            <dd>Photo by Peter Stackpole <br> Photograph by Ronald Dick</dd>
                        </dl>
                    </figure>

                    <figure class="vertical" style="margin-top: -25vh;  margin-left: 46vw;">
                        <img  style="width: 27vw;" src="common/media/img/002.png" alt="">
                        <dl>
                            <dt>Diego & Lorem ipsum</dt>
                            <dd>Photo by Peter Stackpole <br> Photograph by Ronald Dick</dd>
                        </dl>
                    </figure>

                    <figure class="vertical" style="margin-top: -21vh;">
                        <img style="width: 27vw;"  src="common/media/img/003.png" alt="">
                        <dl>
                            <dt>Diego & Lorem ipsum</dt>
                            <dd>Photo by Peter Stackpole <br> Photograph by Ronald Dick</dd>
                        </dl>
                    </figure>

                    <figure class="horizontal"  style="margin-left: 40vw;margin-top: -8vh;">
                        <img style="width:20vw;" src="common/media/img/004.png" alt="">
                        <dl>
                            <dt>Diego & Lorem ipsum</dt>
                            <dd>Photo by Peter Stackpole <br> Photograph by Ronald Dick</dd>
                        </dl>
                    </figure>
                    </div>

                    <figure class="quote">
                        <blockquote>
                        ${self.data.about.quotes[1].quote}
                        </blockquote>
                        <figcaption> ${self.data.about.quotes[1].caption}, <cite>${self.data.about.quotes[1].year}</cite> </figcaption>
                    </figure>

                    <div class="content about-moments">
                        
                    <figure class="vertical" style="margin-left: 6vw;">
                        <img style="width:27vw" src="common/media/img/005.png" alt="">
                        <dl>
                            <dt>Diego & Lorem ipsum</dt>
                            <dd>Photo by Peter Stackpole <br> Photograph by Ronald Dick</dd>
                        </dl>
                    </figure>

                    <figure class="vertical" style="margin-top: -25vh;  margin-left: 46vw;">
                        <img  style="width: 27vw;" src="common/media/img/006.png" alt="">
                        <dl>
                            <dt>Diego & Lorem ipsum</dt>
                            <dd>Photo by Peter Stackpole <br> Photograph by Ronald Dick</dd>
                        </dl>
                    </figure>

                    
                    </div>
                </section>

                <section id="interests">
                    <div class="interests-image half">
                        <img class="cover" src="${self.data.interests.image.url}" alt="">  
                    </div>

                    <div class="interests-list half border">
                    <p>${self.data.interests.title}</p>
                    <ul>
                        ${self.setInterests(self.data.interests.list)}
                    </ul>
                    </div>
                    
                </section>

                <section id="timeline" class="border content">

                    ${self.setTimeline(self.data.timeline)}

                </section>

                <section id="today" class="border content">
                    
                </section>
        `
        document.body.querySelector('main').insertAdjacentHTML('afterbegin', markup);
        // this.preloadMedia(document.body.querySelector('#services').querySelectorAll('.media'));
    }

    setInterests(interests){
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

    setTimeline(timeline){
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
                        
                    </div>
                </div>
                `
                string += markup + "";
        }
        return string;
    }

    setAchivements(achivements){
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