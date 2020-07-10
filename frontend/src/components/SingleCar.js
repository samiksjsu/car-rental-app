import React from 'react'
import url from '../GlobalVariables'
import axios from 'axios'
import ModalDisplay from './ModalDisplay'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import moment from 'moment'
toast.configure();

export default class SingleCar extends React.Component {

    state = {
        image: '',
        rates: '',
        ratePerHour: '',
        totalAmount: '',

        // Booking confirmation variable
        openModal: false
    }

    componentDidMount = async () => {
        const carPhoto = await axios.post(url.module + '/getCarPhoto', this.props)

        const rates = this.props.types.filter((type) => type.vt_name === this.props.c_type)[0]
        let [totalHours, totalMinutes, totalSeconds] = this.props.bookingDetails.totalTime.split(':')
        if (parseInt(totalMinutes) > 0) totalHours++
        let totalAmount = 0
        let ratePerHour = 0

        if (totalHours <= 5) {
            ratePerHour = parseInt(rates.vt_1_5)
            totalAmount = ratePerHour * totalHours
        } else if (totalHours <= 10) {
            ratePerHour = parseInt(rates.vt_6_10)
            totalAmount = ratePerHour * totalHours
        } else if (totalHours <= 24) {
            ratePerHour = parseInt(rates.vt_11_24)
            totalAmount = ratePerHour * totalHours
        } else if (totalHours <= 48) {
            ratePerHour = parseInt(rates.vt_25_48)
            totalAmount = ratePerHour * totalHours
        } else {
            ratePerHour = parseInt(rates.vt_49_72)
            totalAmount = ratePerHour * totalHours
        }

        this.setState(() => ({
            image: carPhoto.data,
            rates,
            ratePerHour,
            totalAmount
        }))
    }

    handleClearSelectedOption = (e) => {

        e.preventDefault()
        e.persist()
        this.setState(() => ({ openModal: false }))
    }

    handleConfirmPaymentAndBook = async (e) => {
        //e.preventDefault()
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const bookingObject = {
                b_date_from: this.props.bookingDetails.pickUpDate,
                b_date_to: this.props.bookingDetails.returnDate,
                b_time_from: this.props.bookingDetails.pickUpTime,
                b_time_to: this.props.bookingDetails.returnTime,
                b_garage_from: this.props.bookingDetails.garageId,
                b_garage_to: this.props.bookingDetails.garageId,
                b_car_registration_number: this.props.c_registration_number,
                b_user_driver_license: user.driverLicense,
                b_status: 'Booked',
                b_payment: this.state.totalAmount
            }

            this.setState(() => ({ bookingObject }))
            const booking = await axios.post(url.module + '/bookCar', bookingObject)
            toast('Booking Successful!', { type: 'success' })
            this.setState(() => ({ openModal: false }))
            this.props.handleBookingSuccessful()
        } catch (e) {
            toast('Booking error!', { type: 'error' })
        }
    }

    handleBookIt = async (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('user'))
        const membershipDetails = (await axios.get(url.module + `/membershipDetails/${user.driverLicense}`)).data
        if (user.status === 'Requested') return toast('Cannot Book Car! EmailId not verified yet', { type: 'error' })
        if (moment(membershipDetails.valid_till).isBefore(moment())) return toast('Membership Expired. Please renew first', { type: 'error' })
        this.setState(() => ({ openModal: true }))
    }

    render() {
        return (
            <div className="col-lg-6 col-md-6">
                <div className="single-car-wrap">
                    <div className="car-list-thumb">{this.state.image && <img src={`data:image/png;base64,${this.state.image}`} />}</div>
                    <div className="car-list-info without-bar">
                        <h2><a href="#">{`${this.props.c_model} - ${this.props.c_registration_number}`}</a></h2>
                        <h5>${this.state.ratePerHour} / hr</h5>

                        <ul className="car-info-list">
                            <li>{this.props.c_type}</li>
                            <li>{this.props.c_number_of_seats} seater</li>
                            <li>{this.props.c_mileage}</li>
                        </ul>
                        <ul className="car-info-list">
                            <li>{this.props.feature1}</li>
                            <li>{this.props.feature2}</li>
                            <li>{this.props.feature3}</li>
                        </ul>
                        <a href="#" className="rent-btn" onClick={this.handleBookIt}>Book It</a>
                    </div>
                </div>

                {
                    <ModalDisplay
                        openModal={this.state.openModal}
                        {...this.props}
                        {...this.state}
                        handleClearSelectedOption={this.handleClearSelectedOption}
                        handleConfirmPaymentAndBook={this.handleConfirmPaymentAndBook}
                    ></ModalDisplay>
                }
            </div>
        )
    }
}