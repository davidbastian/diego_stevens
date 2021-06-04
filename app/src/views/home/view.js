import './style.scss';
import {
    checkDevice
} from '../../../common/utils/utils';
import Logo from '../../../common/svg/logo.svg'
import Star from '../../../common/svg/star.svg'
import Close from '../../../common/svg/close.svg'
import Open from '../../../common/svg/open.svg'
import ScrollController from '../../controllers/controller.scroll';
import DragController from '../../controllers/controller.drag.js';
import {gsap
} from "gsap";
import {Howl} from 'howler';



class View {

    init(params, data) {
        console.log(params, data, 'LOAD HOME');
        this.data = data;
        this.setup();
        this.addEvents();
        const sound = new Howl({
            src: ['common/media/audio/danger-full.mp3'],
           // autoplay: true,
            loop: true,
            volume: 0.3,
          });
        
          this.sound = sound;

          const censor = new Howl({
            src: ['common/media/audio/censor.mp3'],
           // autoplay: true,
            volume: 0.3,
          });
          this.censor = censor;
          this.sound = sound;


          this.censor.pause();
          this.sound.pause();
           

    }

    addEvents(){
       const self = this;
        document.body.querySelector('#hamburger').addEventListener("click", self.toggleMenu.bind(this));

        document.body.querySelector('#movie').addEventListener("click", self.toggleMovie.bind(this));

        for (let i = 0; i < document.querySelector('.menu-list').querySelector('ul').querySelectorAll('div').length; i++) {
            const el = document.querySelector('.menu-list').querySelector('ul').querySelectorAll('div')[i];
            el.addEventListener("click", self.updateSection.bind(this));     
        }
        
    }

    toggleMovie(e){
        const self = this;
        const checkClass= e.currentTarget.classList.contains('active');

        
        if (checkClass) {
            self.censor.play();
            e.currentTarget.classList.remove('active');
            document.body.classList.remove('movie');
            e.currentTarget.innerHTML ="Movie Mode<span></span>";
            self.scroll.update(self.tl,self.tl.progress());
            self.sound.pause();


        } else {
            self.censor.play();
            e.currentTarget.classList.add('active');  
            document.body.classList.add('movie');  
            e.currentTarget.innerHTML= "Back to Normal<span></span>"; 
         //   self.scroll.pause(self.tl,Number(s));
            self.scroll.pause();
            self.tl.play();
            self.sound.play();
        }

    }


    updateSection(e){
        const self = this;
        const current = e.currentTarget;
        const link = current.getAttribute('href');
        const scroll = Number(current.getAttribute('data-scroll'));

        document.body.querySelector('#hamburger').classList.remove('active');
        gsap.fromTo(
            document.querySelector(".menu"),
            { WebkitMaskPosition: "0% 100%",duration:1 },
            {
              WebkitMaskPosition: "0% -100%",
              onComplete: function () {
                document.querySelector(".menu").classList.add("hide");
              }
            }
        );

        self.setSection(scroll,link);

    }

    setSection(s,link){
        const self = this;
       // console.log(s,'scroll');
        console.log(link)
        self.scroll.update(self.tl,Number(s));
    }


    toggleMenu(e){
        const checkClass= e.currentTarget.classList.contains('active');

        gsap.to(
            e.currentTarget,
            { scale:.95,duration:.1,yoyo:true,repeat:1 }
        );
        
        if (checkClass) {
            e.currentTarget.classList.remove('active');

            gsap.fromTo(
                document.querySelector(".menu"),
                { WebkitMaskPosition: "0% 100%",duration:1 },
                {
                  WebkitMaskPosition: "0% -100%",
                  onComplete: function () {
                    document.querySelector(".menu").classList.add("hide");
                  }
                }
            );

            

        } else {
            document.body.querySelector('.menu').classList.remove('hide');
            e.currentTarget.classList.add('active');

            gsap.fromTo(
                document.querySelector(".menu"),
                { WebkitMaskPosition: "0% -100%",duration:1 },
                { WebkitMaskPosition: "0% 100%" }
            );
            

           
        }

  

        return false;


      //  if (e.currentTar)
    }


    setup() {
        const self = this;
        const markup = /*html*/ `
                <header>
                    <nav>
                        <div class="link" id="movie">Movie Mode<span></span></div>
                        <a class="link" target="_blank" href="https://www.linkedin.com/in/diegostevensi/">LinkedIn</a>
                        <a  class="link" target="_blank" href="https://www.instagram.com/dstevensi/">Instagram</a>
                        <a  class="link" href="mailto:hola@diegostevens.com"><b>hola@diegostevens.com</b></a>
                        <div  class="link"  id="hamburger">
                            <div>
                                <img src="common/media/img/open.png" alt="" class="open-menu">
                                <img src="common/media/img/close.png" alt="" class="close-menu">
                            </div> 
                        </div>
                    </nav>

                    <div class="menu hide">  
                        <div class="hero-introduction border half">
                                <div class="hero-logo">
                                    ${Logo}
                                </div>

                                <dl>
                                    <dt>${self.data.details.slogan}</dt>
                                    <dd><a class="active" href="">English</a><span>|</span><a href="">Spanish</a></dd>
                                </dl>
                                    
                            </div>
                            <div class="menu-list half  border">
                                <div class="list">
                                    <ul>
                                       <li><div data-scroll="0.031442663378545004">About</div></li>
                                       <li><div  data-scroll="0.14260172626387177">Interests</div></li>
                                       <li><div  data-scroll="0.18618988902589395">Timeline</div></li>
                                       <li><div  data-scroll="0.34747225647348956">Today</div></li>
                                       <li><div  data-scroll="0.38304562268803943">Challenges</div></li>
                                       <li><div data-scroll="0.44143033292231815">Press</div></li>
                                       <li><div  data-scroll="0.531442663378545">Contact</div></li>
                                   </ul>

                                </div>

                                <div class="credits-site">
                                    <h6>Creative, Design & Develop by <a target="_blank" href="https://davidbastian.red"><b>davidbastian.red</b></a></h6>
                                    <h6>Photographs by <a target="_blank" href="http://cristobalmarambio.com/"><b>Cristobal Marambio</b></a></h6>
                                </div>

                                   
                            </div>  
                    </div>
                
                </header>


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
                    <div class="hero-image half pointer-none">
                            <img  class="cover" src="${self.data.details.image}" alt="${self.data.details.slogan}">
                    </div>
                      
                </section>

                <section id="about" class="border">
                    <div class="bg"></div>
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
                        <img style="width:27vw" src="common/media/img/001.jpg" alt="">
                        <dl>
                            <dt>Diego & Lorem ipsum</dt>
                            <dd>Photo by Peter Stackpole <br> Photograph by Ronald Dick</dd>
                        </dl>
                    </figure>

                    <figure class="vertical" style="margin-top: -25vh;  margin-left: 46vw;">
                        <img  style="width: 27vw;" src="common/media/img/002.jpg" alt="">
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
                        <img style="width:20vw; transform-origin:right top;" src="common/media/img/004.jpg" alt="">
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
                        <img style="width:27vw" src="common/media/img/005.jpg" alt="">
                        <dl>
                            <dt>Diego & Lorem ipsum</dt>
                            <dd>Photo by Peter Stackpole <br> Photograph by Ronald Dick</dd>
                        </dl>
                    </figure>

                    <figure class="vertical" style="margin-top: -25vh;  margin-left: 46vw;">
                        <img  style="width: 27vw;" src="common/media/img/006.jpg" alt="">
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
                    <div class="bg"></div>
                    <div class="today-intro">
                            <h2>${self.data.today.title}</h2>
                            <p>${self.data.today.description}</p>
                            
                    </div>

                    <div class="today-cards">
                        <div class="today-cards_content grabbable">
                            ${self.setCards(self.data.today.cards)}
                        </div>  
                    </div>

                </section>

                <section id="challenges">
                    <div class="bg"></div>

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

                
                <section id="press" class="content">
                    <div class="bg"></div>	

                    <div id="clients">
                        <div class="clients-container">
                            <p>${self.data.clients.description}</p>
                            <img class="pointer-none" src="${self.data.clients.img}" alt="">     
                        </div>    
                    </div>


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
                    <div class="border contact-info">
                        <h2>${self.data.contact.title}</h2>
                        <h5>Let’s talk <br> <a href="">${self.data.contact.email}</a></h5>
                    </div>
                    <div id="cast" class="content">
                        <div class="partners">
                                <h6> <b>Partners & Friends</b> </h6>
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
                            <h6><b>My bridge to the binary world</b></h6>
                            <div class="container">                            
                                    <img src="common/media/img/019.png" alt="">    
                            </div>   
                        </div>

                        <div class="collaborations">
                            <h6><b>Collaborations & Alliances</b></h6>
                            <div class="container">                            
                                <a target="_blank" href="https://www.linkedin.com/company/tempus-asset-management/"><h5>Colegio de Ingenieros de Chile</h5></a><h4>and</h4> <a target="_blank" href="https://www.linkedin.com/company/corfo/"><h5>Alianza Chilena de Ciberseguridad</h5></a>
                            </div>   
                        </div>

                        <div class="investors">
                            <h6><b>Private and Public Inverstors</b></h6>
                            <div class="container">                            
                                <a target="_blank" href="https://www.linkedin.com/company/tempus-asset-management/"><h5>Tempus Asset Management</h5></a>
                                <a target="_blank" href="https://www.linkedin.com/company/corfo/"><h5>Corfo</h5></a>
                                <a target="_blank" href="https://www.conicyt.cl/"><h5>Conicyt</h5></a>
                                
                                
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
                    </div>
                </section>

              
        `
        const main = document.body.querySelector('main');
        main.insertAdjacentHTML('afterbegin', markup);

        const tl = gsap.timeline({onUpdate: updateStats,ease:"linear"});

        main.querySelectorAll('.timeline-item')[0].style.border = "none";

        tl.fromTo(main.querySelector('#home'),{yPercent:0},{yPercent:-100,duration:25});
        tl.fromTo(main.querySelector('#home').querySelector('img'),{scale:1},{scale:1.5,duration:25},'<');

        tl.fromTo(main.querySelector('#about').querySelector('.bg'),{yPercent:0},{yPercent:-100,duration:25},'<');
        tl.fromTo(main.querySelector('#about').querySelector('.about-introduction'),{yPercent:100},{yPercent:-300,duration:100},'<-1');
        tl.addLabel("about","-=74.5");
        tl.fromTo(main.querySelector('#about').querySelectorAll('.quote')[0],{yPercent:100},{yPercent:-1200,duration:125},'-=84');
        tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[0].querySelectorAll('figure')[0],{yPercent:100},{yPercent:-1200,duration:90},'-=115');
        tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[0].querySelectorAll('figure')[1],{yPercent:-300},{yPercent:-1200,duration:90},'-=95');
        tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[0].querySelectorAll('figure')[2],{yPercent:-350},{yPercent:-1200,duration:90},'-=90');
        tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[0].querySelectorAll('figure')[3],{yPercent:-1000},{yPercent:-2630,duration:70},'-=93');
        tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[0].querySelectorAll('figure')[3].querySelector('img'),{scale:.9},{scale:2.1,duration:40},'<');
        tl.fromTo(main.querySelector('#about').querySelectorAll('.quote')[1],{yPercent:-800},{yPercent:-1600,duration:125},'-=80');
        tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[1].querySelectorAll('figure')[0],{yPercent:-500},{yPercent:-1200,duration:90},'-=120');
        tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[1].querySelectorAll('figure')[1],{yPercent:-600},{yPercent:-1100,duration:90},'-=100');

        tl.fromTo(main.querySelector('#interests'),{yPercent:100},{yPercent:-100,duration:50},'-=85');
        tl.fromTo(main.querySelector('#interests').querySelector('img'),{scale:1},{scale:1.5,duration:25},'-=68');
        tl.addLabel("interests","-=70.35");


        tl.fromTo(main.querySelector('#timeline'),{yPercent:100},{yPercent:-200,duration:600},'-=145')
        tl.fromTo(main.querySelector('#timeline').querySelectorAll('.timeline-item')[0],{yPercent:0},{yPercent:300,duration:90},'-=490');
        tl.fromTo(main.querySelector('#timeline').querySelectorAll('.timeline-item')[1],{yPercent:0},{yPercent:100,duration:90},'-=450');
        tl.fromTo(main.querySelector('#timeline').querySelectorAll('.timeline-item')[2],{yPercent:0},{yPercent:300,duration:90},'-=440');
        tl.fromTo(main.querySelector('#timeline').querySelectorAll('.timeline-item')[3],{yPercent:0},{yPercent:100,duration:90},'-=395');
        tl.fromTo(main.querySelector('#timeline').querySelectorAll('.timeline-item')[4],{yPercent:0},{yPercent:200,duration:90},'-=374');

        tl.addLabel("timeline","-=490");

        tl.fromTo(main.querySelector('#today'),{yPercent:0},{yPercent:-350,duration:350},'-=380');
        tl.addLabel("today","-=359.2");


        tl.fromTo(main.querySelector('#challenges'),{yPercent:100},{yPercent:-100,duration:50},'-=345');
        tl.fromTo(main.querySelector('#challenges').querySelector('img'),{scale:1},{scale:1.5,duration:25},'-=328');
        tl.addLabel("challenges","-=330.35");

        tl.fromTo(main.querySelector('#press'),{yPercent:100},{yPercent:-200,duration:600},'-=430');

        tl.fromTo(main.querySelector('#clients'),{yPercent:0},{yPercent:-200,duration:270},'-=492');
      
       tl.addLabel("press","-=453");
       tl.fromTo(main.querySelector('#press').querySelector('.press-intro'),{yPercent:100},{yPercent:-350,duration:120},'-=490');
       tl.fromTo(main.querySelector('.press-articles').querySelectorAll('a')[0],{yPercent:200},{yPercent:-500,duration:200},'-=490');
       tl.fromTo(main.querySelector('.press-articles').querySelectorAll('a')[1],{yPercent:200},{yPercent:-600,duration:200},'-=480');
       tl.fromTo(main.querySelector('.press-articles').querySelectorAll('a')[2],{yPercent:200},{yPercent:-500,duration:200},'-=490');
       tl.fromTo(main.querySelector('.press-articles').querySelectorAll('a')[3],{yPercent:200},{yPercent:-700,duration:200},'-=473');


      tl.fromTo(main.querySelector('#contact'),{yPercent:100},{yPercent:0,duration:220},'-=410');
      tl.addLabel("contact","-=380");

      tl.fromTo(main.querySelector('.partners-container').querySelectorAll('a')[0].querySelector('img'),{yPercent:100},{yPercent:-1000,duration:210},'-=360');
      tl.fromTo(main.querySelector('.partners-container').querySelectorAll('a')[1].querySelector('img'),{yPercent:100},{yPercent:-1000,duration:210},'-=360');
      tl.fromTo(main.querySelector('.partners-container').querySelectorAll('a')[2].querySelector('img'),{yPercent:100},{yPercent:-1000,duration:210},'-=380');
      tl.fromTo(main.querySelector('.partners-container').querySelectorAll('a')[3].querySelector('img'),{yPercent:100},{yPercent:-1000,duration:210},'-=350');
      tl.fromTo(main.querySelector('.partners-container').querySelectorAll('a')[4].querySelector('img'),{yPercent:100},{yPercent:-1000,duration:210},'-=350');


        function updateStats() {
          //  console.log(tl.progress())

           /* if ((tl.progress() >= 0.031442663378545004) && (tl.progress() < 0.14260172626387177)) {
               history.pushState({}, null, '#/about');
            }
            else if  ((tl.progress() >= 0.14260172626387177) && (tl.progress() < 0.18618988902589395)){
                history.pushState({}, null, '#/interests');
            }
            else if  ((tl.progress() >= 0.18618988902589395) && (tl.progress() < 0.34747225647348956)){
                history.pushState({}, null, '#/timeline');
            }
            else if  ((tl.progress() >= 0.34747225647348956) && (tl.progress() <0.38304562268803943)){
                history.pushState({}, null, '#/today');
            }
            else if  ((tl.progress() >=  0.38304562268803943) && (tl.progress() <0.44143033292231815)){
                history.pushState({}, null, '#/challenges');
            }else if  ((tl.progress() >=  0.44143033292231815) && (tl.progress() <0.531442663378545)){
                history.pushState({}, null, '#/press');
            }else if  (tl.progress() >=0.531442663378545){
                history.pushState({}, null, '#/contact');
            } else {
                history.pushState({}, null, '#/');
            }*/

        }

        tl.timeScale(1);
        tl.pause();

       /* tl.pause();

        tl.seek("contact");
        console.log(tl.progress());*/

      this.scroll = new ScrollController({
            container: main,
            pos: 0,
            ease: 0.05,
            delta:40,
            timeline: tl
        });

        this.scroll.init();

        self.tl = tl;

        


        this.drag = new DragController({
            pos: 0,
            ease: 0.05,
            el: main.querySelector(".today-cards_content"),
            container:main.querySelector('.today-cards'),
            direction: "landscape",
            delta: 40,
            drag: 6
        });

        this.drag.init();


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
                    <div style="left:${partner.pos}" class="img-container">
                        <img  src="${partner.img}" alt="">
                    </div>
                
                    
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
                        ${self.setImageTimeline(item)}
                        
                    </div>
                </div>
                `
            string += markup + "";
        }
        return string;
    }

    setImageTimeline(item){

        let markup;
        if (item.img) {
            markup =/*html*/ `<div class="img-timeline-wrap ${item.img.align}"><img src="${item.img.url}" alt=""></div>`
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