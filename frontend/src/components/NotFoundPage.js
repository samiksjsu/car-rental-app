import React from 'react'
import { Link } from 'react-router-dom'



export default class NotFoundPage extends React.Component{
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
            <div>
            
            <section id="page-404-wrap" className="section-padding overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="page-404-content">
                                <div className="number">
                                    <div className="four">4</div>
                                    <div className="zero">
                                        <img src="../assets/img/404.png" alt="JSOFT"/>
                                    </div>
                                    <div className="four">4</div>
                                </div>
                                <h4>PAGE NOT FOUND !</h4>
                                <p>SORRY, WE COULDN'T FIND THE PAGE <br/> YOU'RE LOOKING.</p>
                                <Link to="/" className="btn-404-home"><i className="fa fa-home"></i>Go to Home</Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
            
        )
    }

}

