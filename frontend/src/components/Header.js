import React from 'react'
import Logo from './logo.png'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


class Header extends React.Component {
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
    render() {
        return (
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
                                    <a href="https://www.facebook.com/search/top/?q=react%20developers&epa=SEARCH_BOX"
                                        target="_blank"><i className="fa fa-facebook"></i></a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div id="header-bottom">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-4">
                                <NavLink to="/"><img src={Logo} alt="JSOFT" /></NavLink>
                            </div>

                            <div className="col-lg-8 d-none d-xl-block">
                                <nav className="mainmenu alignright">
                                    <ul>
                                        <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
                                        <li><NavLink to="/about" >About</NavLink></li>
                                        <li><NavLink to="/adminLogin" activeClassName="active">Admin</NavLink></li>
                                        <li><NavLink to="/login" activeClassName="active">Login / Sign-Up</NavLink></li>
                                        <li><NavLink to="/contact" activeClassName="active">Support</NavLink></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

            </header>
        )
    }
}


const mapStateToProps = (state, props) => ({
    users: state.users
})

export default connect(mapStateToProps)(Header)
