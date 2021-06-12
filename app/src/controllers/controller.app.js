import HomeView from '../views/home/view';

class AppController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentRoute = '';
    }

    route(params) {
        const self = this;
       console.log(params[0],'params')
       window.APP.controller.model.removeEvents();
     
            if (params[0] === 'es') {
                document.body.classList.add('es');
                document.querySelector('main').innerHTML = '';
                HomeView.init(params, self.model.dataES);
            } else {
                if (  document.body.classList.contains('es')) {
                    document.body.classList.remove('es');
                }
                document.body.classList.remove('es');
                document.querySelector('main').innerHTML = '';
                HomeView.init(params, self.model.data);
            }      
        
    }

}


export default AppController;