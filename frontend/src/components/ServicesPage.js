import React from 'react'

export default class ServicesPage extends React.Component{

    async componentWillMount() {


        const linkArr = ["../assets/css/bootstrap.min.css",
            "../assets/css/plugins/vegas.min.css",
            "../assets/css/plugins/slicknav.min.css",
            "../assets/css/plugins/magnific-popup.css",
            "../assets/css/plugins/owl.carousel.min.css",
            "../assets/css/plugins/gijgo.css",
            "../assets/css/font-awesome.css",
            "../assets/css/reset.css",
            "../style.css",
            "../assets/css/responsive.css"]

        linkArr.forEach((scr) => {
            const link = document.createElement("link");
            link.href = scr;
            link.rel = "stylesheet"
            document.head.appendChild(link);
        })
    }

    render(){
        return(
            <div>
            <section id="page-title-area" className="section-padding overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title  text-center">
                                <h2>Our Services</h2>
                                <span className="title-line"><i className="fa fa-car"></i></span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="service-page-wrapper" className="section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            
                            <div className="single-service-item">
                                <div className="service-item-thumb ser-thumb-bg-1"></div>
                                <div className="service-item-content">
                                    <h3>RENTAL CAR</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicingedsedsis elited. Necessitatibus aliquid, architecto ullam esdefugiat quasi! Doloribus eaque quam soluta quae porro reprehenderit edsconsequuntur hic ducimus consequatur, dicta officia excepturi quos, quis voluptatum optio deserunt sit. Totam ab dolorum at, labore quisquamn earum, magni reiciendis officiis dolores nemo nostrum perspiciatis!</p>
                                </div>
                            </div>
                            
                            <div className="single-service-item">
                                <div className="service-item-thumb ser-thumb-bg-2 d-lg-none d-md-block"></div>
                                <div className="service-item-content">
                                    <h3>LIFE INSURANCE</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicingedsedsis elited. Necessitatibus aliquid, architecto ullam esdefugiat quasi! Doloribus eaque quam soluta quae porro reprehenderit edsconsequuntur hic ducimus consequatur, dicta officia excepturi quos, quis voluptatum optio deserunt sit. Totam ab dolorum at, labore quisquamn earum, magni reiciendis officiis dolores nemo nostrum perspiciatis!</p>
                                </div>
                                <div className="service-item-thumb ser-thumb-bg-2 d-none d-lg-block d-md-none"></div>
                            </div>
                            
                            
                            
                        </div>
                    </div>
                </div>
            </section>
            </div>

        )
    }

}