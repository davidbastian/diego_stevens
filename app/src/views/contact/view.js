import './style.scss';

class View {

    setup(contact,cast) {
        const self = this;

        const markup = /*html*/ `  
        <section id="contact" class="content">
                    <div class="border contact-info">
                        <h2>${contact.title}</h2>
                        <h5>Let’s talk <br> <a href="">${contact.email}</a></h5>
                    </div>
                    <div id="cast" class="content">
                        <div class="partners">
                                <h6><b>Partners & Friends</b> </h6>
                                <div class="partners-container">
                                    ${self.setPartners(cast.partners)}
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
                                <a target="_blank" href="https://www.linkedin.com/company/colegio-de-ingenieros-de-chile/?originalSubdomain=cl"><h5>Colegio de Ingenieros de Chile</h5></a><h4>and</h4> <a target="_blank" href="https://alianzaciberseguridad.cl/"><h5>Alianza Chilena de Ciberseguridad</h5></a>
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



}

export default new View();