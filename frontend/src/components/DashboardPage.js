import React from 'react';
import SingleCar from './SingleCar';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios'
import url from '../GlobalVariables'
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
toast.configure();

class DashboardPage extends React.Component {

    state = {
        open: false,
        createdAt: moment(),
        loading: false,
        currentPage: 0,
        itemsPerPage: 4,
        cars: [],
        currentCars: [],
        types: [],


        //Form variables
        pickUpDate: '',
        pickUpTime: '',
        returnDate: '',
        returnTime: '',
        totalTime: '',
        states: [],
        selectedState: '',
        cities: [],
        selectedCity: '',
        garages: [],
        selectedGarageId: '',
        selectedGarageAddress: '',

        suggestedGarages: [],
        index: undefined
    }

    componentWillMount = () => {
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

    componentDidMount = async () => {

        if (this.props.history.location.message) {

            toast('Login Successfull!', { type: 'success' })
        }

        //Get the list of all states
        const states = await axios.get(url.module + '/getGarageStateForUser')
        const types = await axios.get(url.module + '/getCarTypes')
        this.setState(() => ({ states: states.data.data, types: types.data }))

    }

    onPageChange = (e) => {
        this.setState(() => ({ currentPage: e.selected + 1 }))
        const indexOfLastPost = (e.selected + 1) * this.state.itemsPerPage
        const indexOfFirstPost = indexOfLastPost - this.state.itemsPerPage
        const currentCars = this.state.cars.slice(indexOfFirstPost, indexOfLastPost)

        this.setState(() => ({ currentCars }))

    }

    onItemsPerPageChange = (e) => {
        e.preventDefault()
        let t = e.target.value
        t = (t > 0) ? t : 2
        this.setState(() => ({ itemsPerPage: t }))
        this.setState(() => ({ currentPage: 1 }))
        const indexOfLastPost = 1 * t
        const indexOfFirstPost = indexOfLastPost - t
        const currentCars = this.state.cars.slice(indexOfFirstPost, indexOfLastPost)

        this.setState(() => ({ currentCars }))
    }

    //Functions related to search and booking
    onPickUpDateChange = (e) => {
        e.preventDefault()
        e.persist()
        this.setState(() => ({ pickUpDate: moment(e.target.value).format('YYYY-MM-DD') }))
    }

    onPickUpTimeChange = (e) => {
        e.preventDefault()
        e.persist()
        const pickUpDate = moment(this.state.pickUpDate).format('YYYY-MM-DD')
        const pickUpTime = moment(pickUpDate + 'T' + e.target.value).format('HH:mm:ss')
        this.setState(() => ({ pickUpTime }))
    }

    onReturnDateChange = (e) => {
        e.preventDefault()
        e.persist()
        this.setState(() => ({ returnDate: moment(e.target.value).format('YYYY-MM-DD') }))
    }

    onReturnTimeChange = (e) => {
        e.preventDefault()
        e.persist()
        const returnDate = moment(this.state.returnDate).format('YYYY-MM-DD')
        const returnTime = moment(returnDate + 'T' + e.target.value).format('HH:mm:ss')
        this.setState(() => ({ returnTime }))
    }

    onStateChange = async (e) => {
        e.preventDefault()
        e.persist()
        const cities = await axios.post(url.module + '/getCityFromState', { g_state: e.target.value })
        this.setState(() => ({ selectedState: e.target.value, cities: cities.data.data }))
    }

    onCityChange = async (e) => {
        e.preventDefault()
        e.persist()
        const garages = await axios.post(url.module + '/getGarageFromCity', { g_state: this.state.selectedState, g_city: e.target.value })
        this.setState(() => ({ garages: garages.data.data }))
    }

    onGarageChange = (e) => {
        e.preventDefault()
        e.persist()
        const [selectedGarageId, selectedGarageAddress] = e.target.value.split(';')
        this.setState(() => ({ selectedGarageId, selectedGarageAddress, suggestedGarages: [] }))
    }

    onSuggestedGarageChange = (e) => {
        e.preventDefault()
        e.persist()
        const [selectedGarageId, selectedGarageAddress, index] = e.target.value.split(';')
        this.setState(() => ({ selectedGarageId, selectedGarageAddress, index }))
    }

    handleOnSubmit = async (e) => {
        e.preventDefault()

        if (this.state.pickUpDate && this.state.pickUpTime && this.state.returnDate && this.state.returnTime && this.state.selectedGarageId) {

            const returnDate = moment(this.state.returnDate).format('YYYY-MM-DD')
            const returnTime = moment(returnDate + 'T' + this.state.returnTime)

            const pickUpDate = moment(this.state.pickUpDate).format('YYYY-MM-DD')
            const pickUpTime = moment(pickUpDate + 'T' + this.state.pickUpTime)

            if (!moment(returnTime).isAfter(pickUpTime)) return toast('Return Date and Time should be after PickUp Date and Time', { type: 'error' })


            var ms = moment(returnTime, "DD/MM/YYYY HH:mm:ss").diff(moment(pickUpTime, "DD/MM/YYYY HH:mm:ss"));
            var d = moment.duration(ms);
            var totalTime = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

            if (totalTime.split(':')[0] > 72 || totalTime.split(':')[0] < 1) return toast('Cars can only be booked for 1 to 72 hrs', { type: 'error' })

            const searchFields = {
                b_date_from: this.state.pickUpDate,
                b_time_from: this.state.pickUpTime,
                b_date_to: this.state.returnDate,
                b_time_to: this.state.returnTime,
                g_id: this.state.selectedGarageId
            }

            const response = await axios.post(url.module + '/searchCar', searchFields)

            if (response.data.length === 0) {
                toast('No cars in the selected garage for the given date and time', { type: 'warning' })
                const nearByGarages = await axios.post(url.module + '/getminimumdistancegarage', { g_id: this.state.selectedGarageId })
                this.setState(() => ({ suggestedGarages: nearByGarages.data.data }))
            } else {
                toast('Please scroll down to see the results', { type: 'success' })
                this.setState(() => ({ cars: response.data, totalTime }))

                const indexOfLastPost = 1 * this.state.itemsPerPage
                const indexOfFirstPost = indexOfLastPost - this.state.itemsPerPage
                const currentCars = response.data.slice(indexOfFirstPost, indexOfLastPost)


                this.setState(() => ({ currentCars }))
            }

        } else {
            return toast('Please enter all the fields in the search', { type: 'error' })
        }
    }

    handleBookingSuccessful = (e) => {
        this.props.history.push({
            pathname: '/upcomingrides'
        })
    }

    render() {
        return (
            <div className="welcome-page">
                <section className="slideslow-dashboard-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <div className="slideshowcontent">
                                    <div className="display-table">

                                        <div className="display-table-cell">

                                            <h1>BOOK A CAR TODAY!</h1>
                                            <br />
                                            <div className="book-ur-car">
                                                <form className="book-ur-car-form">
                                                    <div className="retern-date bookinput-item">
                                                        <input type="date"
                                                            required
                                                            placeholder="Pick Up Date"
                                                            //value={this.state.pickUpDate}
                                                            min={moment(new Date()).format('YYYY-MM-DD')}
                                                            onChange={this.onPickUpDateChange} />
                                                    </div>
                                                    <div className="retern-date bookinput-item">
                                                        <input type="time" id="appt" name="appt"
                                                            min="09:00" max="18:00" required
                                                            placeholder="Pick Up Time"
                                                            onChange={this.onPickUpTimeChange}
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="book-ur-car">
                                                <form className="book-ur-car-form">
                                                    <div className="retern-date bookinput-item">
                                                        <input type="date"
                                                            id="test"
                                                            required
                                                            placeholder="Return Date"
                                                            min={moment(new Date()).format('YYYY-MM-DD')}
                                                            onChange={this.onReturnDateChange}
                                                        />

                                                    </div>
                                                    <div className="retern-date bookinput-item">
                                                        <input type="time" id="appt" name="appt"
                                                            min="09:00" max="18:00" required
                                                            placeholder="Return Time"
                                                            onChange={this.onReturnTimeChange}
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="book-ur-car">
                                                <form className="book-ur-car-form">
                                                    <div className="pick-location bookinput-item">
                                                        <select className="custom-select" onChange={this.onStateChange}>
                                                            <option defaultValue>Select State</option>
                                                            {this.state.states.map((state) => (
                                                                <option value={state.g_state} key={state.g_state}> {state.g_state}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="car-choose bookinput-item">
                                                        <select className="custom-select" onChange={this.onCityChange}>
                                                            <option defaultValue>Select City</option>
                                                            {this.state.cities.map((city) => (
                                                                <option value={city.g_city} key={city.g_city}> {city.g_city}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>

                                            <div className="book-ur-car">
                                                <form className="book-ur-car-form">
                                                    <div className="car-choose bookinput-item garage-display">
                                                        <select className="custom-select" onChange={this.onGarageChange}>
                                                            <option defaultValue>Select Garage</option>
                                                            {this.state.garages.map((garage) => (
                                                                <option value={garage.g_id + ';' + garage.g_street + ', ' + garage.g_state + ', ' + garage.g_zip} key={garage.g_id}> {garage.g_name + ', ' + garage.g_street + ', ' + garage.g_state + ', ' + garage.g_zip}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>

                                            {this.state.suggestedGarages.length > 0 && <div>
                                                <div className="book-ur-car">
                                                    <form className="book-ur-car-form">
                                                        <div className="car-choose bookinput-item garage-display">
                                                            <select className="custom-select" onChange={this.onSuggestedGarageChange}>
                                                                <option defaultValue>Suggested Garages</option>
                                                                {this.state.suggestedGarages.map((garage, index) => (
                                                                    <option value={garage.g_id + ';' + garage.g_street + ', ' + garage.g_state + ', ' + garage.g_zip + ';' + index} key={garage.g_id}> {garage.g_name + ', ' + garage.g_street + ', ' + garage.g_state + ', ' + garage.g_zip}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </form>
                                                </div>

                                                <div className="book-ur-car">
                                                    <form className="book-ur-car-form">
                                                        <div className="car-choose bookinput-item garage-display">
                                                            <input className="custom-select" value={this.state.index !== undefined ? `This garage is ${this.state.suggestedGarages[this.state.index].distanceFromOrigin} miles far from your search garage` : 'Distance From Origin'} readOnly />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>}

                                            <div className="book-ur-car">
                                                <form className="book-ur-car-form" onSubmit={this.handleOnSubmit}>
                                                    <div className="bookcar-btn bookinput-item">
                                                        <button type="submit">Search</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {this.state.currentCars.length > 0 && <section id="car-list-area" className="section-padding">
                    <div className="container">

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="car-list-content">


                                    <div className="row book-ur-car-form">

                                        <div className="input-group-append ">
                                            <span className="input-group-text itemsPerPageDiv">Items per page</span>
                                        </div>
                                        <input
                                            type="number"
                                            min={2}
                                            className="form-control itemsPerPage"
                                            value={this.state.itemsPerPage}
                                            onChange={this.onItemsPerPageChange}
                                            placeholder="Items per page" />

                                    </div>
                                    <br />

                                    <div className="row">
                                        {
                                            this.state.currentCars.map((currentCar, index) => (
                                                <SingleCar key={index} {...currentCar} bookingDetails={
                                                    {
                                                        pickUpDate: this.state.pickUpDate,
                                                        pickUpTime: this.state.pickUpTime,
                                                        returnDate: this.state.returnDate,
                                                        returnTime: this.state.returnTime,
                                                        totalTime: this.state.totalTime,
                                                        garageId: this.state.selectedGarageId,
                                                        garageAddress: this.state.selectedGarageAddress
                                                    }
                                                } types={this.state.types}
                                                handleBookingSuccessful={this.handleBookingSuccessful}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <br />
                    <ReactPaginate
                        pageCount={this.state.cars.length / this.state.itemsPerPage}
                        pageRangeDisplayed={4}
                        marginPagesDisplayed={3}
                        onPageChange={this.onPageChange}
                        containerClassName={'pagination justify-content-center'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        initialPage={0}
                        activeClassName={'page-item active'}
                        disabledClassName={'page-item disabled'}
                    />
                </section>}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    users: state.users
})

export default connect(mapStateToProps)(DashboardPage)