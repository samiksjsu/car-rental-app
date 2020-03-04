import React from 'react'
import Logo from './logo.png'
import { NavLink } from 'react-router-dom'

const Header = (props) => (
    <header id="header-area" className="fixed-top">
        <div id="header-top" className="d-none d-xl-block">
            <div className="container">
                <div className="row">

                    <div className="col-lg-3 text-left">
                        <i className="fa fa-map-marker"></i> 101 E San Fernando, San Jose
        </div>

                    <div className="col-lg-3 text-center">
                        <i className="fa fa-mobile"></i> +1 669 281 9438
        </div>

                    <div className="col-lg-3 text-center">
                        <i className="fa fa-clock-o"></i> Mon-Fri 09.00 - 17.00
        </div>

                    <div className="col-lg-3 text-right">
                        <div className="header-social-icons">
                            <a href="#"><i className="fa fa-facebook"></i></a>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div id="header-bottom">
            <div className="container">
                <div className="row">

                    <div className="col-lg-4">
                        <a href="index2.html" className="logo">
                            <img src={Logo} alt="JSOFT" />
                        </a>
                    </div>

                    <div className="col-lg-8 d-none d-xl-block">
                        <nav className="mainmenu alignright">
                            <ul>
                                <li className="active"><NavLink to="/" onClick={props.handleOnReload} >Home</NavLink>
                                </li>
                                <li><a href="about.html">About</a></li>
                                <li><a href="services.html">services</a></li>
                                <li><a href="#">Cars</a>
                                    <ul>
                                        <li><a href="car-left-sidebar.html">Car Left Sidebar</a></li>
                                        <li><a href="car-right-sidebar.html">Car Right Sidebar</a></li>
                                        <li><a href="car-without-sidebar.html">Car Without Sidebar</a></li>
                                        <li><a href="car-details.html">Car Details</a></li>
                                    </ul>
                                </li>
                                <li><a href="index.html">Pages</a>
                                    <ul>
                                        <li><a href="package.html">Pricing</a></li>
                                        <li><a href="driver.html">Driver</a></li>
                                        <li><a href="faq.html">FAQ</a></li>
                                        <li><a href="gallery.html">Gallery</a></li>
                                        <li><a href="help-desk.html">Help Desk</a></li>
                                        <li><NavLink to="/login" >Login</NavLink></li>
                                        <li><a href="register.html">Register</a></li>
                                        <li><a href="404.html">404</a></li>
                                    </ul>
                                </li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

    </header>
)

export default Header