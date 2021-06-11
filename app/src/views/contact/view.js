import './style.scss';

class View {

    setup(contact, cast) {
        const self = this;

        const markup = /*html*/ `  
        <section id="contact" class="content">
                    <div class="border contact-info">
                        <h2>${contact.title}</h2>
                        <h5>${contact.copy}<br> <a href="">${contact.email}</a></h5>
                    </div>
                    <div id="cast" class="content">
                        <div class="partners">
                                <h6><b>${cast.partnersTitle}</b> </h6>
                                <div class="partners-container">
                                    ${self.setPartners(cast.partners)}
                                </div>
                        </div>

                        <div class="partnerships">
                                <h6><b>${cast.partnershipsTitle}</b></h6>
                                <div class="partnerships-container">  
                                    ${self.setPartnership(cast.partnerships)}
                                </div>
                        </div>
                        
                        <div class="my-companies">
                            <h6><b>${cast.companiesTitle}</b></h6>
                            <div class="container">                            
                                    <img src="${cast.companiesImg}" alt="">    
                            </div>   
                        </div>

                        <div class="collaborations">
                            <h6><b>${cast.collaborationsTitle}</b></h6>
                            <div class="container">                            
                                <a target="_blank" href="${cast.collaborations[0].link}"><h5>${cast.collaborations[0].name}</h5></a><h4>${cast.collaborationsHR}</h4> <a target="_blank" href="${cast.collaborations[1].link}"><h5>${cast.collaborations[1].name}</h5></a>
                            </div>   
                        </div>

                        <div class="investors">
                            <h6><b>${cast.investorsTitle}</b></h6>
                            <div class="container">  
                                ${self.setInvestors(cast.investors)}                     
                                
                                
                            </div>   
                        </div>

                        <div class="my-companies alma-matter">
                            <h6><b>Alma Matter</b></h6>
                            <div class="container">                            
                                    <img src="${cast.almamatter}" alt="">    
                            </div>   
                        </div>

                        <h6 class="copyright">
                            ${cast.copyright}
                        </h6>
                    </div>
        </section>`

        return markup;

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
    setPartnership(partnership) {
        const self = this;
        let string = '';
        for (let i = 0; i < partnership.length; i++) {
            const partner = partnership[i];
            let markup = /*html*/ `
                 <a target="_blank" href="${partner.link}"><p>${partner.name}</p></a>
                `
            string += markup + "";
        }
        return string;
    }

    setInvestors(investors) {
        const self = this;
        let string = '';
        for (let i = 0; i < investors.length; i++) {
            const investor = investors[i];
            let markup = /*html*/ `
                 <a target="_blank" href="${investor.link}"><h5>${investor.name}</h5></a>
                `
            string += markup + "";
        }
        return string;
    }



}

export default new View();