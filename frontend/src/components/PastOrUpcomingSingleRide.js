import React from 'react'
import moment from 'moment'
import url from '../GlobalVariables'
import axios from 'axios'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
toast.configure();

export default class PastOrUpcomingSingleRide extends React.Component {

    state = {
        c_car_photo: '',
        totalRentedTime: '',
        rentPerHour: '',
        status: ''
    }

    componentDidMount = () => {
        //console.log(this.props)

        // Convert the binary array of the car image to base64 string
        let c_car_photo = '';
        const bytes = new Uint8Array(this.props.c_car_photo.data);
        for (var i = 0; i < bytes.byteLength; i++) {
            c_car_photo += String.fromCharCode(bytes[i]);
        }

        // let c_car_photo = btoa(String.fromCharCode(...new Uint8Array(this.props.c_car_photo)));
        const pickUpDate = moment(this.props.b_date_from).format('YYYY-MM-DD')
        const pickUpTime = moment(pickUpDate + 'T' + this.props.b_time_from)
        const returnDate = moment(this.props.b_date_to).format('YYYY-MM-DD')
        const returnTime = moment(returnDate + 'T' + this.props.b_time_to)
        

        // Check if ride has already begun and setting the status accordingly
        let status = this.props.b_status
        const currentDateTime = moment()
        if (currentDateTime.isBetween(pickUpTime, returnTime)) {
            if (status !== 'Cancelled') status = 'In-Progress'
        }


        // Total time and rate per hour calculation for the ride
        const ms = moment(returnTime, "DD/MM/YYYY HH:mm:ss").diff(moment(pickUpTime, "DD/MM/YYYY HH:mm:ss"));
        const d = moment.duration(ms);
        const totalRentedTime = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        const rentPerHour = (this.props.b_payment / totalRentedTime.split(':')[0]).toFixed(2)

        this.setState(() => ({ c_car_photo, totalRentedTime, rentPerHour, status }))
    }

    handleCancelRide = async (e) => {
        e.preventDefault()
        await axios.post(url.module + '/cancelbooking', { b_id: this.props.b_id })
        this.setState(() => ({status: 'Cancelled'}))
        toast('Ride Cancelled Successfully!', { type: 'success' })
    }

    handleEndTrip = async (e) => {
        e.preventDefault()

        const pickUpDate = moment(this.props.b_date_from).format('YYYY-MM-DD')
        const pickUpTime = moment(pickUpDate + 'T' + this.props.b_time_from)
        const returnDate = moment(this.props.b_date_to).format('YYYY-MM-DD')
        const returnTime = moment(returnDate + 'T' + this.props.b_time_to)


        const currentDateTime = moment()
        console.log(returnTime)
        const ms = currentDateTime.diff(returnTime);
        const d = moment.duration(ms);
        const totalRentedTime = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        
        let totalLateFee = 0
        console.log(d.asHours())
        // if return time is late
        if (Math.ceil(d.asHours()) > 0) {

            // Code for late fee calculation
            let totalHours = d.asHours()
            if(totalRentedTime.split(':')[1] > 0) totalHours++

            const rates = (await axios.get(url.module + `/getCarType/${this.props.c_type}`)).data
            console.log(rates)
            if (totalHours <= 5) {
                totalLateFee = parseInt(rates.vt_1_5) * totalHours *  ((parseInt(rates.vt_late_percent) + 100) / 100)
            } else if (totalHours <= 10) {
                totalLateFee = parseInt(rates.vt_6_10) * totalHours * ((parseInt(rates.vt_late_percent) + 100) / 100)
            } else if (totalHours <= 24) {
                totalLateFee = parseInt(rates.vt_11_24) * totalHours * ((parseInt(rates.vt_late_percent) + 100) / 100)
            } else if (totalHours <= 48) {
                totalLateFee = parseInt(rates.vt_25_48) * totalHours * ((parseInt(rates.vt_late_percent) + 100) / 100)
            } else {
                totalLateFee = parseInt(rates.vt_49_73) * totalHours * ((parseInt(rates.vt_late_percent) + 100) / 100)
            }
            
        } 

        await axios.post(url.module + '/endTrip', {
            b_id: this.props.b_id,
            b_late_fee: totalLateFee
        })

        this.setState(() =>({status: 'Completed'}))
        toast('Ride Ended Successfully!', { type: 'success' })
    }

    render() {
        return (
            <div>

                <div id="blog-page-content" className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <article className="single-article">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <div className="article-thumb hover-img">
                                                <img src={`data:image/png;base64,${this.state.c_car_photo}`} alt="JSOFT" />
                                            </div>
                                        </div>

                                        <div className="col-lg-7">
                                            <div className="display-table">
                                                <div className="display-table-cell">
                                                    <div className="article-body">
                                                        <h5>{this.props.c_model}</h5>(Last Services on {this.props.c_last_serviced})

                                                        <ul className="booking-details">
                                                            <li>
                                                                Total Rented Time : {this.state.totalRentedTime}
                                                            </li>
                                                            <li>
                                                                Amount Paid : ${this.props.b_payment + this.props.b_late_fee} @ {this.state.rentPerHour} / hr
                                                            </li>
                                                        </ul>

                                                        <ul className="booking-details">
                                                            <li>
                                                                PickUp Date : {this.props.b_date_from}
                                                            </li>
                                                            <li>
                                                                Return Date : {this.props.b_date_to}
                                                            </li>
                                                        </ul>
                                                        <ul className="booking-details">
                                                            <li>
                                                                PickUp Time : {this.props.b_time_from}
                                                            </li>
                                                            <li>
                                                                Return Time : {this.props.b_time_to}
                                                            </li>
                                                        </ul>

                                                        <ul className="car-info-list">
                                                            <li>{this.props.feature1}</li>
                                                            <li>{this.props.feature2}</li>
                                                            <li>{this.props.feature3}</li>
                                                        </ul>
                                                        <h6>Status: <span className={`booking-status-${this.state.status}`}>{this.state.status}</span></h6><br />
                                                        {
                                                            this.props.dataFrom !== 'upcoming' ||  this.state.status === 'Cancelled'? undefined : (this.state.status === 'In-Progress' ? 
                                                            <button className="cancel-btn" onClick={this.handleEndTrip}>End Trip <i className="fa fa-long-arrow-right"></i></button> : <button className="cancel-btn" onClick={this.handleCancelRide}>Cancel <i className="fa fa-long-arrow-right"></i></button>)
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}