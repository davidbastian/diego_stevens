import Data from "../../common/data/data.json"
import DataES from "../../common/data/data-es.json"
class AppModel {
    constructor() {
        this.data = Data;
        this.dataES = DataES;
        this.events = [];
    }

    addEvents(e){
        this.events.push(e);
    }

    removeEvents(){
        const self = this;
        if (self.events.length > 0) {
            for (let i = 0; i < self.events.length; i++) {
                const event = self.events[i];
                if (event) {
                    event.removeEvents();
                } 
            }

        }  
    }

}


export default AppModel;