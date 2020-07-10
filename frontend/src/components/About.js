import React from 'react'
import home_2_about from '../assets/img/home-2-about.png'
import team_mem_thumb_1 from '../assets/img/team/team-mem-thumb-1.png'
import team_mem_thumb_2 from '../assets/img/team/team-mem-thumb-2.png'
import team_mem_thumb_3 from '../assets/img/team/team-mem-thumb-3.png'
import team_mem_thumb_4 from '../assets/img/team/team-mem-thumb-4.png'
import team_mem_1 from '../assets/img/team/team-mem-1.png'
import team_mem_2 from '../assets/img/team/team-mem-2.png'
import team_mem_3 from '../assets/img/team/team-mem-3.png'
import team_mem_4 from '../assets/img/team/team-mem-4.png'

export default class AboutPage extends React.Component{
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
                
            <section id="page-title-area" className="section-padding overlay">
                <div className="container">
                    <div className="row">
                    
                        <div className="col-lg-12">
                            <div className="section-title  text-center">
                                <h2>About US</h2>
                                <span className="title-line"><i className="fa fa-car"></i></span>
                                
                            </div>
                        </div>   
                    </div>
                </div>
            </section>

            <section id="about-area" className="section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="display-table">
                            <div className="display-table-cell">
                                <div className="about-content">
                                    <p>Lorem simply dummy is a texted of the printing costed and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                <div className="col-lg-6">
                    <div className="about-image">
                        <img src={home_2_about} alt="home_2_about" />
                    </div>
                </div>
                
            </div>

            </div>
        </section>
        
            <section id="funfact-area" class="overlay section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-11 col-md-12 m-auto">
                            <div class="funfact-content-wrap">
                                <div class="row">
                                    
                                    <div class="col-lg-4 col-md-6">
                                        <div class="single-funfact">
                                            <div class="funfact-icon">
                                                <i class="fa fa-smile-o"></i>
                                            </div>
                                            <div class="funfact-content">
                                                <p><span class="counter">550</span>+</p>
                                                <h4>HAPPY CLIENTS</h4>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-lg-4 col-md-6">
                                        <div class="single-funfact">
                                            <div class="funfact-icon">
                                                <i class="fa fa-car"></i>
                                            </div>
                                            <div class="funfact-content">
                                                <p><span class="counter">250</span>+</p>
                                                <h4>CARS IN STOCK</h4>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-lg-4 col-md-6">
                                        <div class="single-funfact">
                                            <div class="funfact-icon">
                                                <i class="fa fa-bank"></i>
                                            </div>
                                            <div class="funfact-content">
                                                <p><span class="counter">50</span>+</p>
                                                <h4>office in cities</h4>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="testimonial-area" class="section-padding">
        <div class="container">
            <div class="row">
                
                <div class="col-lg-12">
                    <div class="section-title  text-center">
                        <h2>Testimonials</h2>
                        <span class="title-line"><i class="fa fa-car"></i></span>
                        <p>Lorem ipsum dolor sit amet elit.</p>
                    </div>
                </div>
                
            </div>
    
            <div class="row">
                <div class="col-lg-8 col-md-12 m-auto">
                    <div class="testimonial-content">
                       
                        <div class="single-testimonial">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis totam obcaecati impedit, at autem repellat vel magni architecto veritatis sed.</p>
                            <h3>Vongchong Smith</h3>
                            <div class="client-logo">
                                <img src="assets/img/client/client-pic-1.jpg" alt="JSOFT"/>
                            </div>
                        </div>
                        
                        <div class="single-testimonial">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis totam obcaecati impedit, at autem repellat vel magni architecto veritatis sed.</p>
                            <h3>Amader Tuni</h3>
                            <div class="client-logo">
                                <img src="assets/img/client/client-pic-3.jpg" alt="JSOFT"/>
                            </div>
                        </div>
                        
                        <div class="single-testimonial">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis totam obcaecati impedit, at autem repellat vel magni architecto veritatis sed.</p>
                            <h3>Atex Tuntuni Smith</h3>
                            <div class="client-logo">
                                <img src="assets/img/client/client-pic-2.jpg" alt="JSOFT"/>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    
            <section id="team-area" className="section-padding">
        <div className="container">
            <div className="row">
               
                <div className="col-lg-12">
                    <div className="section-title  text-center">
                        <h2>Our Creative Persons</h2>
                        <span className="title-line"><i className="fa fa-car"></i></span>
                        <p>Lorem ipsum dolor sit amet elit.</p>
                    </div>
                </div>
               
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="team-content">
                        <div className="row">
                           
                            <div className="col-lg-4">
                                <div className="team-tab-menu">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="tab_item_1" data-toggle="tab" href="#team_member_1" role="tab" aria-selected="true">
                                                <div className="team-mem-icon">
                                                    <img src={team_mem_thumb_1} alt="JSOFT"/>
                                                </div>
                                                <h5>Kaustubh Kulkarni</h5>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="tab_item_2" data-toggle="tab" href="#team_member_2" role="tab" aria-selected="true">
                                                <div className="team-mem-icon">
                                                    <img src={team_mem_thumb_3} alt="JSOFT"/>
                                                </div>
                                                <h5>Kartik Umalkar</h5>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="tab_item_3" data-toggle="tab" href="#team_member_3" role="tab" aria-selected="true">
                                                <div className="team-mem-icon">
                                                    <img src={team_mem_thumb_2} alt="JSOFT"/>
                                                </div>
                                                <h5>Samik Biswas</h5>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="tab_item_4" data-toggle="tab" href="#team_member_4" role="tab" aria-selected="true">
                                                <div className="team-mem-icon">
                                                    <img src={team_mem_thumb_4} alt="JSOFT"/>
                                                </div>
                                                <h5>Siddhant Shribhashyam</h5>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="col-lg-8">
                                <div className="tab-content" id="myTabContent">
                                    
                                    <div className="tab-pane fade show active" id="team_member_1" role="tabpanel" aria-labelledby="tab_item_1">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="team-member-pro-pic">
                                                    <img src={team_mem_1} alt="JSOFT"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="team-member-info text-center">
                                                    <h4>Kaustubh Kulkarni</h4>
                                                    <h5>Developer</h5>
                                                    <span className="quote-icon"><i className="fa fa-quote-left"></i></span>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sollicitudin fermentum dolor. Nunc nec augue urna. Cras varius orci vitae lacinia efficitur.</p>
                                                    <div className="team-social-icon">
                                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                                        <a href="#"><i className="fa fa-linkedin"></i></a>
                                                        <a href="#"><i className="fa fa-pinterest"></i></a>
                                                        <a href="#"><i className="fa fa-dribbble"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                    <div className="tab-pane fade" id="team_member_2" role="tabpanel" aria-labelledby="tab_item_2">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="team-member-pro-pic">
                                                    <img src={team_mem_3} alt="JSOFT"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="team-member-info text-center">
                                                    <h4>Kartik Umalkar</h4>
                                                    <h5>Designer</h5>
                                                    <span className="quote-icon"><i className="fa fa-quote-left"></i></span>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sollicitudin fermentum dolor. Nunc nec augue urna. Cras varius orci vitae lacinia efficitur.</p>
                                                    <div className="team-social-icon">
                                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                                        <a href="#"><i className="fa fa-linkedin"></i></a>
                                                        <a href="#"><i className="fa fa-pinterest"></i></a>
                                                        <a href="#"><i className="fa fa-dribbble"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="tab-pane fade" id="team_member_3" role="tabpanel" aria-labelledby="tab_item_3">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="team-member-pro-pic">
                                                    <img src={team_mem_2} alt="JSOFT"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="team-member-info text-center">
                                                    <h4>Samik Biswas</h4>
                                                    <h5>Marketer</h5>
                                                    <span className="quote-icon"><i className="fa fa-quote-left"></i></span>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sollicitudin fermentum dolor. Nunc nec augue urna. Cras varius orci vitae lacinia efficitur.</p>
                                                    <div className="team-social-icon">
                                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                                        <a href="#"><i className="fa fa-linkedin"></i></a>
                                                        <a href="#"><i className="fa fa-pinterest"></i></a>
                                                        <a href="#"><i className="fa fa-dribbble"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="tab-pane fade" id="team_member_4" role="tabpanel" aria-labelledby="tab_item_4">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="team-member-pro-pic">
                                                    <img src={team_mem_4} alt="JSOFT"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="team-member-info text-center">
                                                    <h4>Siddhant Shribhashyam</h4>
                                                    <h5>Manager</h5>
                                                    <span className="quote-icon"><i className="fa fa-quote-left"></i></span>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sollicitudin fermentum dolor. Nunc nec augue urna. </p>
                                                    <div className="team-social-icon">
                                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                                        <a href="#"><i className="fa fa-linkedin"></i></a>
                                                        <a href="#"><i className="fa fa-pinterest"></i></a>
                                                        <a href="#"><i className="fa fa-dribbble"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
   

        </div>
        )
    }
} 