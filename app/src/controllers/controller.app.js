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

        //console.log(params,'params')

        if (!params[0]) {
            HomeView.init(params, self.model.data);
        } else  {
       //    console.log(params[0],'params')
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
    }

}


export default AppController;