import React from 'react'
import PastSingleRide from './PastOrUpcomingSingleRide';
import axios from 'axios'
import moment from 'moment'
import url from '../GlobalVariables'
import '../assets/css/plugins/upcomingrides.css'
export default class UpcomingRides extends React.Component {

    state = {
        cars: [],

        rideDetails: '',
        setLoading: true
    }

    componentDidMount = async () => {

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

        const user = JSON.parse(localStorage.getItem('user'))
        const rideDetails = (await axios.get(url.module + `/getUpcomingRides/${user.driverLicense}&datefrom=${moment().format('YYYY-MM-DD')}&timeFrom=${moment().format('HH:mm:ss')}&pastOrUpcoming=past`)).data
        this.setState(() => ({ rideDetails, setLoading: false }))

    }

    render() {
        return (
            <div>
                <section id="page-title-area" className="section-padding overlay">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-12">
                                <div className="section-title  text-center">
                                    <h2>Past Bookings</h2>
                                    <span className="title-line"><i className="fa fa-car"></i></span>
                                    <p>Track all your past rides here</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                
                <div className="upcoming-rides-wrapping">{this.state.setLoading && <img src="../assets/loading.gif" alt="Loading..."></img>}</div>
                <div>
                    {
                        this.state.rideDetails && this.state.rideDetails.cars.map((_, index) => (
                            <PastSingleRide key={index}{...this.state.rideDetails.cars[index]} {...this.state.rideDetails.upcomingRides[index]} dataFrom="past"/>
                        ))
                    }
                </div>


            </div>
        )
    }

}