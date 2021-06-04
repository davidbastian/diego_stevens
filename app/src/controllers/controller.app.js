import HomeView from '../views/home/view';

class AppController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentRoute = '';
    }

    route(params) {
        const self = this;
        const request = new XMLHttpRequest();

        //history.pushState({}, null, '#/');

        console.log(params,'params')

        if (!params[0]) {
            HomeView.init(params, self.model.data);
        } else  {
           console.log(params[0],'params')
           if(!document.querySelector('#home')) {
            HomeView.init(params, self.model.data);
            const items = document.querySelector('.menu-list').querySelectorAll('a');

            if (params[0] === 'about') {
                HomeView.setSection(items[0].getAttribute('data-scroll'),params[0]);
            }
            else if (params[0] === 'interests') {
                HomeView.setSection(items[1].getAttribute('data-scroll'),params[0]);
            }
            else if (params[0] === 'timeline') {
                HomeView.setSection(items[2].getAttribute('data-scroll'),params[0]);
            }
            else if (params[0] === 'today') {
                HomeView.setSection(items[3].getAttribute('data-scroll'),params[0]);
            }
            else if (params[0] === 'challenges') {
                HomeView.setSection(items[4].getAttribute('data-scroll'),params[0]);
            }
            else if (params[0] === 'press') {
                HomeView.setSection(items[5].getAttribute('data-scroll'),params[0]);
            }
            else if (params[0] === 'contact') {
                HomeView.setSection(items[6].getAttribute('data-scroll'),params[0]);
            }
           }       
        
        }

        

        /*if (params.length === 1) {
            if (params[0] === 'services') {
                history.pushState({}, null, '#/services');
                request.open("GET", self.model.restURL + 'categories');
                request.onreadystatechange = (e) => {
                    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                        HomeView.init(params, JSON.parse(request.responseText));
                        self.requestCache(JSON.parse(request.responseText), 'services');
                    }
                }
            }
            if (params[0] === 'about') {
                history.pushState({}, null, '#/about');
                request.open("GET", self.model.restURL + 'about');
                request.onreadystatechange = (e) => {
                    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                        AboutView.init(params, JSON.parse(request.responseText));
                        self.requestCache(JSON.parse(request.responseText), 'categories');
                    }
                }
            }
        } else if ((params.length === 2) && (params[1] !== '')) {
            var filter = (self.model.restURL + params[0] + '?filter[category_name]=' + params[1] + '&per_page=100');
            request.open("GET", filter);
            request.onreadystatechange = (e) => {
                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    ServicesView.init(params, JSON.parse(request.responseText));
                    self.requestCache(JSON.parse(request.responseText), 'projects');
                    self.requestCache(JSON.parse(request.responseText), 'categories');
                }
            }
        } else if (params.length === 3) {
            var filter = (self.model.restURL + params[0] + '?slug=' + params[2]);
            request.open("GET", filter);
            request.onreadystatechange = (e) => {
                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    ProjectsView.init(params, JSON.parse(request.responseText));
                    self.requestCache(JSON.parse(request.responseText), 'services');


                }
            }
        } else {
            history.pushState({}, null, '#/services');
            request.open("GET", self.model.restURL + 'categories');
            request.onreadystatechange = (e) => {
                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    HomeView.init(params, JSON.parse(request.responseText));


                }
            }
        }*/
      //  request.send();

    }

    /*requestCache(json, type) {
        const self = this;

        for (let i = 0; i < json.length; i++) {
            const c = json[i].slug;
            var filter;
            if (type = "services") {
                filter = (self.model.restURL + 'services?filter[category_name]=' + c + '&per_page=100');
            } else if (type = "projects") {
                filter = (self.model.restURL + 'services?slug=' + c.slug);
            } else if (type = "categories") {
                filter = (self.model.restURL + 'categories');
            }
            let request = new XMLHttpRequest();
            request.open("GET", filter);
            request.onreadystatechange = (e) => {
                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
             
                    if (self.onCache.indexOf("about") === -1) {
                       // console.log('hola about',self.onCache);
                        let requestAbout = new XMLHttpRequest();
                        requestAbout.open("GET", self.model.restURL + 'about');
                        requestAbout.onreadystatechange = (e) => {
                            if (requestAbout.readyState === XMLHttpRequest.DONE && requestAbout.status === 200) {
                                self.onCache.push('about');
                            }
                          

                        }
                        requestAbout.send();
                    }
                }
              
            }
            request.send();
        }
    }*/


    /*routeTransition(pagename) {
        document.querySelector('body').classList.add('wait');

        if (pagename === 'services') {
            document.body.querySelector('#home-menu').classList.add('none');
        } else {
            document.body.querySelector('#home-menu').classList.remove('none');
        }
        if (pagename === 'services' || pagename === 'services_single' || pagename === 'about') {
            TweenMax.to(document.body.querySelectorAll('header'), 1.5, {
                opacity: 1,
                delay: 0.5,
                ease: "power3.out",

            });
        } else if (pagename === 'project') {
            TweenMax.to(document.body.querySelectorAll('header'), 0.5, {
                opacity: 0,
                ease: "power3.out"

            });
        }

        for (let i = 0; i < document.body.querySelectorAll('.page').length; i++) {
            const page = document.body.querySelectorAll('.page')[i];

            if (page.getAttribute('id') === pagename) {
                TweenMax.fromTo(page, 1.5, {
                    opacity: 0,
                }, {
                    opacity: 1,
                    delay: 0.5,
                    ease: "power3.out",
                    onComplete: function () {
                        document.querySelector('body').classList.remove('wait');
                    }
                });
            } else {
                TweenMax.fromTo(page, 0.5, {
                    opacity: 1,
                }, {
                    opacity: 0,
                    ease: "power3.out",
                    onComplete: function () {
                        window.APP.controller.currentRoute = pagename;
                        page.parentNode.removeChild(page);
                        TweenMax.set(document.querySelector('header'), {
                            y: 0 + '%'
                        });


                    }
                });

            }
        }
    }*/

    /* preloadMedia(media) {
         for (let i = 0; i < media.length; i++) {
             let img = media[i];
             img.onload = function (e) {
                 TweenMax.fromTo(img, 1.5, {
                     opacity: 0,
                 }, {
                     opacity: 1,
                     ease: 'Power4.easeInOut',

                 });
             }
         }
     }*/
    scrollMotion(pagename) {

    }
}


export default AppController;