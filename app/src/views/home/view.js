import './style.scss';
import {
    checkDevice
} from '../../../common/utils/utils';
import Logo from '../../../common/svg/logo.svg'
import Star from '../../../common/svg/star.svg'
import ScrollController from '../../controllers/controller.scroll';
import ScrollTest from '../../controllers/controller.scrollTest';
import {gsap,
} from 'gsap';



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
                            <dd><a class="active" href="">English</a><span>|</span><a href="">Spanish</a><span>|</span>Scroll to Explore</dd>
                        </dl>
                         
                    </div>
                    <div class="hero-image half pointer-none">
                            <img  class="cover" src="${self.data.details.image}" alt="${self.data.details.slogan}">
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

                    <figure class="horizontal"  style="margin-left: 40vw;margin-top: -8vh; ">
                        <img style="width:20vw; transform-origin:right top;" src="common/media/img/004.png" alt="">
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

                    <div class="interests-list list half border">
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

                    <div class="today-intro">
                            <h2>${self.data.today.title}</h2>
                            <p>${self.data.today.description}</p>
                            
                    </div>

                    <div class="today-cards">
                        <div class="today-cards_content">
                            ${self.setCards(self.data.today.cards)}
                        </div>  
                    </div>

                </section>

                <section id="challenges">

                    <div class="challenges-list list half border">
                        <p><span>${Star}</span> ${self.data.challenges.title}</p>
                        <ul>
                            ${self.setChallenges(self.data.challenges.list)}
                        </ul>
                    </div>

                    <div class="challenges-image half">
                        <img class="cover" src="${self.data.challenges.image.url}" alt="">  
                    </div>
  
                </section>

                <section id="clients">
                        <p>${self.data.clients.description}</p>
                        <img class="pointer-none" src="${self.data.clients.img}" alt="">  
                </section>

                <section id="press" class="content">

                    <div class="press-intro">
                            <h2>${self.data.press.title}</h2>
                            <p>${self.data.press.description}</p>
                            
                    </div>

                    <div class="press-articles content"> 
                        <div class="border">
                            ${self.setArticles(self.data.press.articles)}
                        </div>  
                    </div>

                </section>

                <section id="contact" class="content">
                    <div class="border">
                        <h2>${self.data.contact.title}</h2>
                        <h5>Let’s talk <br> <a href="">${self.data.contact.email}</a></h5>
                    </div>
                </section>

                <section id="cast" class="content">
                    <div class="partners">
                            <h6> <b>Partners</b> </h6>
                            <div class="partners-container">
                                ${self.setPartners(self.data.cast.partners)}
                            </div>
                    </div>

                    <div class="partnerships">
                            <h6> <b>Partnerships</b> </h6>
                            <div class="partnerships-container">  
                                <a target="_blank" href="https://www.prochile.gob.cl/"><p>Pro Chile</p></a>
                                <a target="_blank" href="https://www.meetlatam.com/"><p>MeetLatam</p></a>
                                <a target="_blank" href="https://www.microsoft.com"><p>Microsoft</p></a>
                                <a target="_blank" href="https://www.dtschile.com/"><p>DTS Chile</p></a>
                            </div>
                    </div>
                    <div class="my-companies">
                        <h6><b>My Companies</b></h6>
                        <div class="container">                            
                                <img src="common/media/img/019.png" alt="">    
                        </div>   
                    </div>

                    <div class="collaborations">
                        <h6><b>Collaborations and Consultant</b></h6>
                        <div class="container">                            
                            <a target="_blank" href="https://www.linkedin.com/company/tempus-asset-management/"><h5>Colegio de Ingenieros de Chile</h5></a><h4>and</h4> <a target="_blank" href="https://www.linkedin.com/company/corfo/"><h5>Alianza Chilena de Ciberseguridad</h5></a>
                        </div>   
                    </div>

                    <div class="investors">
                        <h6><b>Investors</b></h6>
                        <div class="container">                            
                            <a target="_blank" href="https://www.linkedin.com/company/tempus-asset-management/"><h5>Tempus Asset Management</h5></a><h4>and</h4> <a target="_blank" href="https://www.linkedin.com/company/corfo/"><h5>Corfo</h5></a>
                        </div>   
                    </div>

                    <div class="my-companies">
                        <h6><b>Alma Matter</b></h6>
                        <div class="container">                            
                                <img src="common/media/img/020.png" alt="">    
                        </div>   
                    </div>

                    <h6 class="copyright">The entire diegostevens.com Web site is Copyright ©2021 by Diego Stevens. All Rights Reserved. The diegostevens.com site may not be copied or duplicated in whole or part by any means without express prior agreement in writing or unless specifically noted on the site.
                        Some photographs or documents contained on the site may be the copyrighted property of others; acknowledgement of those copyrights is hereby given. All such material is used with the permission of the owner.
                    </h6>

                </section>



        `
        const main = document.body.querySelector('main');
        main.insertAdjacentHTML('afterbegin', markup);

        //self.setScroll(main);
        /*var tl = new TimelineMax({
            onUpdate: updateStats,
        });*/

        const tl = gsap.timeline({onUpdate: updateStats,ease:"linear"});
        tl.from('#about',{yPercent:100, duration:30});
        //about parallax
        tl.fromTo('.about-introduction',{yPercent:60}, {yPercent:-100,duration:100},"-=20");
        tl.fromTo(main.querySelector('#about').querySelectorAll('.quote')[0],{yPercent:-20}, {yPercent:-420,duration:100},"-=50");
        tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[0].querySelectorAll('figure')[0],{yPercent:-100}, {yPercent:-420,duration:60},"-=90");
        tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[0].querySelectorAll('figure')[1],{yPercent:-100}, {yPercent:-520,duration:60},"-=80");
        tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[0].querySelectorAll('figure')[2],{yPercent:-100}, {yPercent:-580,duration:60},"-=70");
        tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[0].querySelectorAll('figure')[3],{yPercent:-100}, {yPercent:-1300,duration:60},"-=65");
        tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[0].querySelectorAll('figure')[3].querySelector('img'),{scale:.5}, {scale:2,duration:50},"-=55");
        tl.fromTo(main.querySelector('#about').querySelectorAll('.quote')[1],{yPercent:-400}, {yPercent:-1050,duration:100},"-=50");
        tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[1].querySelectorAll('figure')[0],{yPercent:-500}, {yPercent:-1000,duration:80},"-=55");
        tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[1].querySelectorAll('figure')[1],{yPercent:-500}, {yPercent:-1000,duration:60},"-=75");
     //   tl.fromTo(main.querySelector('#about').querySelector('.about-moments').querySelectorAll('figure')[5],{yPercent:-100}, {yPercent:-1300,duration:60},"-=65");
        



        tl.from('#interests',{yPercent:100, duration:30},"-=45");
        tl.from('#timeline',{yPercent:100, duration:30});
        tl.from('#today',{yPercent:100, duration:30});
        tl.from('#challenges',{yPercent:100, duration:30});

        //tl.from('#about',{yPercent:100, duration:16});


        /*tl.fromTo(main.querySelector('#about'), 16, {
            yPercent: 100,
        },{
            yPercent: 0,
            ease: 'Linear.easeNone'
        });

        tl.fromTo(main.querySelector('.about-introduction '), 16, {
            yPercent: 0,
        },{
            yPercent: -50,
            ease: 'Linear.easeNone'
        },'16');


        tl.fromTo(main.querySelector('#interests'), 16, {
            yPercent: 100,
         
        },{
            yPercent: 0,
            ease: 'Linear.easeNone'
        });


        tl.fromTo(main.querySelector('#timeline'), 16, {
            yPercent: 100,
         
        },{
            yPercent: 0,
            ease: 'Linear.easeNone'
        });


        tl.fromTo(main.querySelector('#today'), 16, {
            yPercent: 100,
         
        },{
            yPercent: 0,
            ease: 'Linear.easeNone'
        });

        tl.fromTo(main.querySelector('#challenges'), 16, {
            yPercent: 100,
         
        },{
            yPercent: 0,
            ease: 'Linear.easeNone'
        });*/





        /*tl.to(main.querySelector('#about'), 4, {
            yPercent: -33,
            ease: 'Linear.easeNone'
        });
        tl.to(main.querySelector('#home'), 2, {
            yPercent: -40,
            ease: 'Linear.easeNone',

        }, '-=4');

        tl.to(main.querySelector('#home').querySelector('img'), 1, {
            ease: 'Linear.easeNone',
            scale: 1.2,

        }, '-=4');

        var blurElement = {
            a: 0
        }; //start the blur at 0 pixels

        var blurElementB = {
            a: 0
        }; //start the blur at 0 pixels

        function applyBlur() {
            TweenMax.set(main.querySelector('#home').querySelector('img'), {
                webkitFilter: "blur(" + blurElement.a+ "px)"
            });
        };

        function applyBlurB() {
            TweenMax.set(main.querySelector('#about').querySelectorAll('.quote')[0], {
                webkitFilter: "blur(" + blurElementB.a+ "px)"
            });
        };



        tl.to(blurElement, 1, {
            a: 80,
            onUpdate: applyBlur,
            ease: 'Linear.easeNone',
        },'-=4');

        tl.to(main.querySelector('#about').querySelector('.about-introduction'), 2, {
            yPercent: -30,
            ease: 'Linear.easeNone'
        });

        tl.to(main.querySelector('#about').querySelectorAll('.quote')[0], 5, {
          //  opacity:0,
            yPercent:0,
            ease: 'Linear.easeNone'
        },'-=2');


        tl.to(main.querySelector('#about'), 8, {
            yPercent: -70,
            ease: 'Linear.easeNone'
        });

        tl.to(main.querySelector('#about').querySelectorAll('.quote')[0], 5, {
            //  opacity:0,
              yPercent:-100,
              ease: 'Linear.easeNone'
        });

        tl.fromTo(main.querySelector('#about').querySelector('.about-moments').querySelectorAll('figure')[0], 6, {
            yPercent: 50,
        },{
            yPercent: -200,
            ease: 'Linear.easeNone'
        },'5');

        tl.fromTo(main.querySelector('#about').querySelector('.about-moments').querySelectorAll('figure')[1], 6, {
            yPercent: 50,
        },{
            yPercent: -200,
            ease: 'Linear.easeNone'
        },'6');

        tl.fromTo(main.querySelector('#about').querySelector('.about-moments').querySelectorAll('figure')[2], 6, {
            yPercent: 100,
        },{
            yPercent: -200,
            ease: 'Linear.easeNone'
        },'6');

        tl.fromTo(main.querySelector('#about').querySelector('.about-moments').querySelectorAll('figure')[3], 6, {
            yPercent: -150,
        },{
            yPercent: -300,
            ease: 'Linear.easeNone'
        },'6');

        tl.fromTo(main.querySelector('#about').querySelector('.about-moments').querySelectorAll('figure')[3].querySelector('img'), 4, {
            scale: 1,
        },{
            scale: 2,
            ease: 'Linear.easeNone'
        },);

     */

        


        function updateStats() {
            console.log(tl.progress())
        }

        tl.pause();

        this.scroll = new ScrollTest({
            container: main,
            pos: 0,
            ease: 0.05,
            delta:40,
            timeline: tl
        });

        this.scroll.init();

    }

    setScroll(main) {

        /* this.scroll = new ScrollController({
             container:main,
             pos: 0,
             ease: 0.05,
             delta: 40,
         });

         this.scroll.init(main);*/

    }

    setPartners(partners) {
        const self = this;
        let string = '';
        for (let i = 0; i < partners.length; i++) {
            const partner = partners[i];
            let markup = /*html*/ `
                <a target="_blank" href="${partner.link}" class="partner-item">
                    <p class="partner-role">${partner.role}</p>  
                    <p class="partner-name">${partner.name}</p>
                    
                </a>
                `
            string += markup + "";
        }
        return string;

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
                        
                    </div>
                </div>
                `
            string += markup + "";
        }
        return string;
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
                        
                        <img src="${item.media}" alt="">
                    </div>    
                `
            string += markup + "";
        }
        return string;

    }



}

export default new View();