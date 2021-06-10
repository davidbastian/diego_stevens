import './style.scss';
import {
    checkDevice
} from '../../../common/utils/utils';
import Logo from '../../../common/svg/logo.svg'


import ScrollController from '../../controllers/controller.scroll';
import DragController from '../../controllers/controller.drag';


import AboutView from '../../views/about/view'
import InterestsView from '../../views/interests/view'
import TimelineView from '../../views/timeline/view'
import TodayView from '../../views/today/view'
import ChallengesView from '../../views/challenges/view'
import PressView from '../../views/press/view'
import ContactView from '../../views/contact/view'


import {
    gsap,ScrollToPlugin
} from "gsap/all";

import {
    Howl
} from 'howler';

const { detect } = require('detect-browser');
 




class View {

    init(params, data) {
        gsap.registerPlugin(ScrollToPlugin);
        // console.log(params, data, 'LOAD HOME');
        this.data = data;

        this.device = checkDevice();
        this.br =  detect();

      //  console.log(this.br.name,'br')
        document.body.querySelector('.test').innerHTML = this.br.name;

        document.querySelector('html').classList.add(this.device);
        document.querySelector('html').classList.add(this.br.name);

      //  console.log(this.device, ' device')
        this.setup();

        this.parallaxYPos = 0;
        this.parallaxXPos = 0;
        this.parallaxYTarget = 0;
        this.parallaxXTarget = 0;

        this.addEvents();
        this.animaParallax();



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

    addEvents() {
        const self = this;
        document.body.querySelector('#hamburger').addEventListener("click", self.toggleMenu.bind(this));
        document.body.querySelector('#movie').addEventListener("click", self.toggleMovie.bind(this));

        document.body.querySelector('.lng').addEventListener("click", self.setLanguage.bind(this));


        for (let i = 0; i < document.querySelector('.menu-list').querySelector('ul').querySelectorAll('div').length; i++) {
            const el = document.querySelector('.menu-list').querySelector('ul').querySelectorAll('div')[i];
            el.addEventListener("click", self.updateSection.bind(this));
        }

        window.addEventListener("mousemove", self.addParallax.bind(this));

    }

    setLanguage(e){
       window.location.reload();
       return false;

    }

    addParallax(e){
        const self = this;
        let percent = {
            x:(100-((window.outerWidth - e.screenX)*200/window.outerWidth)),
            y:(100-((window.outerHeight - e.screenY)*200/window.outerHeight)),
        }
        self.parallaxYTarget = percent.y/20;
        self.parallaxXTarget = percent.x/20;
    }

    animaParallax() {
        const self = this;
        requestAnimationFrame(self.animaParallax.bind(this));

        this.parallaxXPos += (this.parallaxXTarget - this.parallaxXPos) * 0.08;
        this.parallaxYPos += (this.parallaxYTarget - this.parallaxYPos) * 0.08;


        for (let i = 0; i < document.body.querySelectorAll('.parallax').length; i++) {
            const element = document.body.querySelectorAll('.parallax')[i];

            element.parentElement.style.perspective = '1200px';
            element.style.transform = 'rotateX('+self.parallaxYPos+'deg) rotateY('+-self.parallaxXPos+'deg)'; 
        }   
    }

    toggleMovie(e) {
        const self = this;
        const checkClass = e.currentTarget.classList.contains('active');

        if (checkClass) {
            self.censor.play();
            e.currentTarget.classList.remove('active');
            document.body.classList.remove('movie');
            e.currentTarget.innerHTML = "Movie Mode<span></span>";
            self.scroll.update(self.tl, self.tl.progress());
            self.sound.pause();

        } else {
            self.censor.play();
            e.currentTarget.classList.add('active');
            document.body.classList.add('movie');
            e.currentTarget.innerHTML = "Back to Normal<span></span>";
            self.scroll.pause();
            self.tl.play();
            self.sound.play();
        }

    }
    updateSection(e) {
        const self = this;
        const current = e.currentTarget;
        const link = current.getAttribute('href');
        const scroll = Number(current.getAttribute('data-scroll'));
        const scrollTo = current.getAttribute('data-scrollTo');

        document.body.querySelector('#hamburger').classList.remove('active');
        gsap.fromTo(
            document.querySelector(".menu"), {
                WebkitMaskPosition: "0% 100%",
                duration: 1
            }, {
                WebkitMaskPosition: "0% -100%",
                onComplete: function () {
                    document.querySelector(".menu").classList.add("hide");
                }
            }
        );

        self.setSection(scroll, link, scrollTo);

    }
    setSection(s, link, st) {
        const self = this;
        const el = document.body.querySelector(st);

        if (self.device === 'mobile') {
            gsap.to(document.body.querySelector('main'), {
                duration: 0,
                scrollTo: st
            });
        } else {
            self.scroll.update(self.tl, Number(s));
        }

    }
    toggleMenu(e) {
        const checkClass = e.currentTarget.classList.contains('active');
        gsap.to(
            e.currentTarget, {
                scale: .95,
                duration: .1,
                yoyo: true,
                repeat: 1
            }
        );

        if (checkClass) {
            e.currentTarget.classList.remove('active');

            gsap.fromTo(
                document.querySelector(".menu"), {
                    WebkitMaskPosition: "0% 100%",
                    duration: 1
                }, {
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
                document.querySelector(".menu"), {
                    WebkitMaskPosition: "0% -100%",
                    duration: 1
                }, {
                    WebkitMaskPosition: "0% 100%"
                }
            );
        }
        return false;
    }

    setNav() {
        let markup;
        if (this.device === "mobile") {
            markup = /*html*/ `
                        <div class="link" id="movie"><span></span></div>
                        <a  class="link" target="_blank" href="https://www.linkedin.com/in/diegostevensi/">LI</a>
                        <a  class="link" target="_blank" href="https://www.instagram.com/dstevensi/">INS</a>
                        <a  class="link" href="mailto:hola@diegostevens.com"><b>hola@diegostevens.com</b></a>
            `
        } else {
            markup = /*html*/ `
                        <div class="link" id="movie">Movie Mode<span></span></div>
                        <a  class="link" target="_blank" href="https://www.linkedin.com/in/diegostevensi/">LinkedIn</a>
                        <a  class="link" target="_blank" href="https://www.instagram.com/dstevensi/">Instagram</a>
                        <a  class="link" href="mailto:hola@diegostevens.com"><b>hola@diegostevens.com</b></a>
            `
        }
        return markup;
    }

    setMenu(list){
        const self = this;
        let string = '';
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            let markup = /*html*/ `
                     <li><div  data-scrollTo="${item.scrollTo}"  data-scroll="${item.scrollData}">${item.title}</div></li>         `
            string += markup + "";
        }
        return string;

    }


    setup() {
        const self = this;
        const markup = /*html*/ `
                <header>
                    <nav>
                        ${self.setNav()}

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
                                    <dd><a class="active lng eng" href="#/">English</a><span>|</span><a class="es lng" href="#/es">Spanish</a></dd>
                                </dl>
                                    
                            </div>
                            <div class="menu-list half  border">
                                <div class="list">
                                    <ul>
                                        ${self.setMenu(self.data.details.menu)}
                                   </ul>

                                </div>
                                <div class="credits-site">
                                    <h6>Design & Develop by <a target="_blank" href="https://davidbastian.red"><b>davidbastian.red</b></a></h6>
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
                            <dd><a class="active eng lng" href="#/">English</a><span>|</span><a class="es lng" href="#/es">Spanish</a></dd>
                        </dl>
                         
                    </div>
                    <div class="hero-image half pointer-none">
                            <img  class="cover" src="${self.data.details.image}" alt="${self.data.details.slogan}">
                    </div>  
                </section>

                ${AboutView.setup(self.data.about)}
                ${InterestsView.setup(self.data.interests)}
                ${TimelineView.setup(self.data.timeline)}
                ${TodayView.setup(self.data.today)}
                ${ChallengesView.setup(self.data.challenges)}
                ${PressView.setup(self.data.clients,self.data.press)}
                ${ContactView.setup(self.data.contact,self.data.cast)}          
        `
        const main = document.body.querySelector('main');
        main.insertAdjacentHTML('afterbegin', markup);



        if (self.device === "mobile") {

            self.toggleNav();


        } else {

            const tl = gsap.timeline({
                onUpdate: updateStats,
                ease: "linear"
            });
            main.querySelectorAll('.timeline-item')[0].style.border = "none";


            tl.fromTo(main.querySelector('#home'), {
                yPercent: 0
            }, {
                yPercent: -100,
                duration: 25
            });
            tl.fromTo(main.querySelector('#home').querySelector('img'), {
                scale: 1
            }, {
                scale: 1.5,
                duration: 25
            }, '<');

            tl.fromTo(main.querySelector('#about').querySelector('.bg'), {
                yPercent: 0
            }, {
                yPercent: -100,
                duration: 25
            }, '<');
            tl.fromTo(main.querySelector('#about').querySelector('.about-introduction'), {
                yPercent: 100
            }, {
                yPercent: -300,
                duration: 100
            }, '<-1');
            tl.addLabel("about", "-=74.5");
            tl.fromTo(main.querySelector('#about').querySelectorAll('.quote')[0], {
                yPercent: 100
            }, {
                yPercent: -1200,
                duration: 125
            }, '-=84');
            tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[0].querySelectorAll('figure')[0], {
                yPercent: 100
            }, {
                yPercent: -1200,
                duration: 90
            }, '-=115');
            tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[0].querySelectorAll('figure')[1], {
                yPercent: -300
            }, {
                yPercent: -1200,
                duration: 90
            }, '-=95');
            tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[0].querySelectorAll('figure')[2], {
                yPercent: -350
            }, {
                yPercent: -1200,
                duration: 90
            }, '-=90');
            tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[0].querySelectorAll('figure')[3], {
                yPercent: -1000
            }, {
                yPercent: -2630,
                duration: 70
            }, '-=93');
            tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[0].querySelectorAll('figure')[3].querySelector('img'), {
                scale: .9
            }, {
                scale: 2.1,
                duration: 40
            }, '<');
            tl.fromTo(main.querySelector('#about').querySelectorAll('.quote')[1], {
                yPercent: -800
            }, {
                yPercent: -1600,
                duration: 125
            }, '-=80');
            tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[1].querySelectorAll('figure')[0], {
                yPercent: -500
            }, {
                yPercent: -1200,
                duration: 90
            }, '-=120');
            tl.fromTo(main.querySelector('#about').querySelectorAll('.about-moments')[1].querySelectorAll('figure')[1], {
                yPercent: -600
            }, {
                yPercent: -1100,
                duration: 90
            }, '-=100');

            tl.fromTo(main.querySelector('#interests'), {
                yPercent: 100
            }, {
                yPercent: -100,
                duration: 50
            }, '-=85');
            tl.fromTo(main.querySelector('#interests').querySelector('img'), {
                scale: 1
            }, {
                scale: 1.5,
                duration: 25
            }, '-=68');
            tl.addLabel("interests", "-=70.35");

            tl.fromTo(main.querySelector('#timeline'), {
                yPercent: 100
            }, {
                yPercent: -200,
                duration: 600
            }, '-=145')
            tl.fromTo(main.querySelector('#timeline').querySelectorAll('.timeline-item')[0], {
                yPercent: 0
            }, {
                yPercent: 250,
                duration: 90
            }, '-=490');

            tl.fromTo(main.querySelector('#timeline').querySelectorAll('.timeline-item')[1], {
                yPercent: 0
            }, {
                yPercent: 350,
                duration: 90
            }, '-=475');

            tl.fromTo(main.querySelector('#timeline').querySelectorAll('.timeline-item')[2], {
                yPercent: 0
            }, {
                yPercent: 100,
                duration: 90
            }, '-=440');

            tl.fromTo(main.querySelector('#timeline').querySelectorAll('.timeline-item')[3], {
                yPercent: 0
            }, {
                yPercent: 100,
                duration: 90
            }, '-=400');

            tl.fromTo(main.querySelector('#timeline').querySelectorAll('.timeline-item')[4], {
                yPercent: 0
            }, {
                yPercent: 150,
                duration: 90
            }, '-=375');


            tl.addLabel("timeline", "-=490");

            tl.fromTo(main.querySelector('#today'), {
                yPercent: 0
            }, {
                yPercent: -350,
                duration: 350
            }, '-=380');
            tl.addLabel("today", "-=359.2");


            tl.fromTo(main.querySelector('#challenges'), {
                yPercent: 100
            }, {
                yPercent: -100,
                duration: 50
            }, '-=345');
            tl.fromTo(main.querySelector('#challenges').querySelector('img'), {
                scale: 1
            }, {
                scale: 1.5,
                duration: 25
            }, '-=328');
            tl.addLabel("challenges", "-=330.35");

            tl.fromTo(main.querySelector('#press'), {
                yPercent: 100
            }, {
                yPercent: -200,
                duration: 600
            }, '-=430');

            tl.fromTo(main.querySelector('#clients'), {
                yPercent: 0
            }, {
                yPercent: -200,
                duration: 270
            }, '-=492');

            tl.addLabel("press", "-=453");
            tl.fromTo(main.querySelector('#press').querySelector('.press-intro'), {
                yPercent: 100
            }, {
                yPercent: -350,
                duration: 120
            }, '-=490');
            tl.fromTo(main.querySelector('.press-articles').querySelectorAll('a')[0], {
                yPercent: 200
            }, {
                yPercent: -500,
                duration: 200
            }, '-=490');
            tl.fromTo(main.querySelector('.press-articles').querySelectorAll('a')[1], {
                yPercent: 200
            }, {
                yPercent: -600,
                duration: 200
            }, '-=480');
            tl.fromTo(main.querySelector('.press-articles').querySelectorAll('a')[2], {
                yPercent: 200
            }, {
                yPercent: -500,
                duration: 200
            }, '-=490');
            tl.fromTo(main.querySelector('.press-articles').querySelectorAll('a')[3], {
                yPercent: 200
            }, {
                yPercent: -700,
                duration: 200
            }, '-=473');


            tl.fromTo(main.querySelector('#contact'), {
                yPercent: 100
            }, {
                yPercent: 0,
                duration: 220
            }, '-=410');
            tl.addLabel("contact", "-=380");

            tl.fromTo(main.querySelector('.partners-container').querySelectorAll('a')[0].querySelector('img'), {
                yPercent: 100
            }, {
                yPercent: -1000,
                duration: 210
            }, '-=360');
            tl.fromTo(main.querySelector('.partners-container').querySelectorAll('a')[1].querySelector('img'), {
                yPercent: 100
            }, {
                yPercent: -1000,
                duration: 210
            }, '-=360');
            tl.fromTo(main.querySelector('.partners-container').querySelectorAll('a')[2].querySelector('img'), {
                yPercent: 100
            }, {
                yPercent: -1000,
                duration: 210
            }, '-=380');
            tl.fromTo(main.querySelector('.partners-container').querySelectorAll('a')[3].querySelector('img'), {
                yPercent: 100
            }, {
                yPercent: -1000,
                duration: 210
            }, '-=350');
            tl.fromTo(main.querySelector('.partners-container').querySelectorAll('a')[4].querySelector('img'), {
                yPercent: 100
            }, {
                yPercent: -1000,
                duration: 210
            }, '-=350');

            function updateStats() {
                //  console.log(tl.progress())
            }

            tl.timeScale(1);
            tl.pause();

            /* 
             tl.seek("contact");
             console.log(tl.progress());*/

            this.scroll = new ScrollController({
                container: main,
                pos: 0,
                ease: 0.05,
                delta: 40,
                timeline: tl
            });



            self.tl = tl;

            this.drag = new DragController({
                pos: 0,
                ease: 0.05,
                el: main.querySelector(".today-cards_content"),
                container: main.querySelector('.today-cards'),
                direction: "landscape",
                delta: 40,
                drag: 6
            });

            this.drag.init();

        }

        this.preload();


    }

    preload() {
        const imgArr = [];
        for (let index = 0; index < document.querySelectorAll('img').length; index++) {
            const element = document.querySelectorAll('img')[index];
            imgArr.push(element.src);
        }

        //   console.log(imgArr);

        this.getImages(imgArr);

    }

    getImages(imgs) {
        const self = this;

        function preloadImages(urls, allImagesLoadedCallback) {
            var loadedCounter = 0;
            var toBeLoadedNumber = urls.length;
            urls.forEach(function (url) {
                preloadImage(url, function () {
                    loadedCounter++;

                    //console.log('Number of loaded images: ' + loadedCounter +' of' +toBeLoadedNumber);
                    let percent = (loadedCounter * 100) / toBeLoadedNumber;
                    // let countdown = 10 - Math.round(percent);

                    document.querySelector('#preloader').querySelector('dd').innerHTML = 'Loading ' + Math.round(percent) + '%';

                    if (loadedCounter == toBeLoadedNumber) {
                        ''
                        allImagesLoadedCallback();
                    }
                });
            });

            function preloadImage(url, anImageLoadedCallback) {
                var img = new Image();
                img.onload = anImageLoadedCallback;
                img.src = url;
            }
        }

        // Let's call it:
        preloadImages(imgs, function () {
            // console.log('All images were loaded');

            if (self.device != 'mobile') {
                self.scroll.init();
            }


            gsap.to(document.querySelector('#preloader-wrap'), {
                height: 0 + '%',
                duration: .5,
                ease: 'easeOut.power3',
                onComplete: function () {
                    document.querySelector('#preloader-wrap').classList.add('hide');
                }
            });

            gsap.fromTo(document.querySelector('header').querySelector('nav'), {
                yPercent: 200,
                opacity: 0

            }, {
                ease: 'easeOut.power3',
                duration: .5,
                delay: .2,
                yPercent: 0,
                opacity: 1
            });

            gsap.fromTo(document.querySelector('#home').querySelector('img'), {
                scale: 1.5,
                opacity: 0,
            }, {
                ease: 'easeOut.power3',
                duration: .5,
                delay: .1,
                scale: 1,
                opacity: 1
            });


        });



    }

    toggleNav() {
        var lastScrollTop = 0;

        // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
        document.querySelector('main').addEventListener("scroll", function () { // or window.addEventListener("scroll"....
            var st = window.pageYOffset || document.querySelector('main').scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
            if (st > lastScrollTop) {

                gsap.to(document.querySelector('header').querySelector('nav'), {
                    yPercent: 200,
                    opacity: 0,
                    ease: 'easeOut.power3',
                    duration: .5,
                });

                // downscroll code

            } else {

                gsap.to(document.querySelector('header').querySelector('nav'), {
                    yPercent: 0,
                    opacity: 1,
                    ease: 'easeOut.power3',
                    duration: .5,
                });

                // upscroll code
            }
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        }, false);
    }



  




}

export default new View();