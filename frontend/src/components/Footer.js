import React from 'react'



export default class Footer extends React.Component{

    componentWillMount() {
        
        const scriptArr = ["../assets/js/jquery-3.2.1.min.js",
            "../assets/js/jquery-migrate.min.js",
            "../assets/js/popper.min.js",
            "../assets/js/bootstrap.min.js",
            "../assets/js/plugins/gijgo.js",
            "../assets/js/plugins/vegas.min.js",
            "../assets/js/plugins/isotope.min.js",
            "../assets/js/plugins/owl.carousel.min.js",
            "../assets/js/plugins/waypoints.min.js",
            "../assets/js/plugins/counterup.min.js",
            "../assets/js/plugins/mb.YTPlayer.js",
            "../assets/js/plugins/magnific-popup.min.js",
            "../assets/js/plugins/slicknav.min.js",
            "../assets/js/main.js"]

        scriptArr.forEach((scr) => {
            const script = document.createElement("script");
            script.src = scr;
            script.async = false;
            document.body.appendChild(script);
        })

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
        return (
            <section id="footer-area">
    
            <div className="footer-widget-area">
                <div className="container">
                    <div className="row">
                        
                        <div className="col-lg-4 col-md-6">
                            <div className="single-footer-widget">
                                <h2>About Us</h2>
                                <div className="widget-body">
                                    <img src="assets/img/logo.png" alt="JSOFT"/>
                                    <p>Lorem ipsum dolored is a sit ameted consectetur adipisicing elit. Nobis magni assumenda distinctio debitis, eum fuga fugiat error reiciendis.</p>
        
                                    <div className="newsletter-area">
                                        
                                        
                                    </div>
        
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-4 col-md-6">
                        </div>
                        
                        <div className="col-lg-4 col-md-6">
                            <div className="single-footer-widget">
                                <h2>get touch</h2>
                                <div className="widget-body">
                                    <p>Lorem ipsum doloer sited amet, consectetur adipisicing elit. nibh auguea, scelerisque sed</p>
        
                                    <ul className="get-touch">
                                        <li><i className="fa fa-map-marker"></i> 800/8, Kazipara, Dhaka</li>
                                        <li><i className="fa fa-mobile"></i> +880 01 86 25 72 43</li>
                                        <li><i className="fa fa-envelope"></i> kazukamdu83@gmail.com</li>
                                    </ul>
                                    <a href="https://goo.gl/maps/b5mt45MCaPB2" className="map-show" target="_blank" rel="noopener noreferrer">Show Location</a>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            
            
            
        </section>
        
        
        )
    }

}