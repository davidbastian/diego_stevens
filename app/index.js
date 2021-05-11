import './common/fonts/stylesheet.css';
import "./common/styles/_base.scss";
import AppView from "./src/views/view.app.js";
import AppController from "./src/controllers/controller.app.js";
import AppModel from "./src/models/model.app.js";

class App {
  constructor() {
    this.body = document.querySelector('body');
    this.controller = new AppController(new AppModel(), new AppView());

  }
}

window.APP = new App();
window.APP.controller.view.init();

export default window.App;
