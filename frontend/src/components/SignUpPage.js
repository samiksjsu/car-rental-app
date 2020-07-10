import React from 'react'
import Green from './password/green-tick.png'
import Red from './password/rec-cross.png'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css'
import url from '../GlobalVariables'
import ImageUploader from 'react-images-upload'
import StripeCheckout from 'react-stripe-checkout'

// Datepicker imports
import moment from 'moment'
import axios from 'axios';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
toast.configure();

export default class SignUpPage extends React.Component {

    state = {
        firstName: this.props.history.location.firstName || '',
        lastName: this.props.history.location.lastName || '',
        email: this.props.history.location.email || '',
        password: '',
        confirmPassword: '',
        passwordDoesNotMatch: '',
        license: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        licenseState: '',
        res: undefined,

        // Payment Details
        product: {
            name: '6 month Membership Fee',
            price: 600
        },
        paymentDone: false,

        //Password Validations
        errors: [],
        valids: [],
        allClear: 0,

        //Calender
        calenderFocused: false,
        dateOfBirth: moment(),

        //Picture
        pictures: []
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

        const price = await axios.get(url.module + '/membershipFee')
        this.setState(() => ({
            product: {
                name: '6 month Membership Fee',
                price: price.data.m_fee
            }
        }))
    }

    onDrop = (picture) => {
        this.setState(() => ({ pictures: picture[0] }))
    }

    onDateChange = (dateOfBirth) => {
        this.setState(() => ({ dateOfBirth }))
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calenderFocused: focused }))
    }

    onFirstNameChange = (e) => {
        const firstName = e.target.value
        this.setState(() => ({ firstName }))
    }

    onLastNameChange = (e) => {
        const lastName = e.target.value
        this.setState(() => ({ lastName }))
    }

    onEmailChange = (e) => {
        const email = e.target.value
        this.setState(() => ({ email }))
    }

    onUserNameChange = (e) => {
        const userName = e.target.value
        this.setState(() => ({ userName }))
    }

    onLicenseChange = (e) => {
        const license = e.target.value
        this.setState(() => ({ license }))
    }

    onStreetChange = (e) => {
        const street = e.target.value
        this.setState(() => ({ street }))
    }

    onCityChange = (e) => {
        const city = e.target.value
        this.setState(() => ({ city }))
    }

    onStateChange = (e) => {
        const state = e.target.value
        this.setState(() => ({ state }))
    }

    onZipChange = (e) => {
        const zip = e.target.value
        this.setState(() => ({ zip }))
    }

    onDriverLicenseStateChange = (e) => {
        const licenseState = e.target.value
        this.setState(() => ({ licenseState }))
    }

    handleToken = async (token, addresses) => {

        if (!this.state.license) return toast('Please enter drivers license number', { type: 'error' })
        const product = this.state.product
        const res = await axios.post(url.module + '/checkout', { token, product })

        if (res.data.status === 'success') {
            const message = `Payment of $${this.state.product.price} is done successfully`
            toast(message, { type: 'success' })
            this.setState(() => ({ paymentDone: true }))
        }
    }

    onPasswordChange = (e) => {
        /*
            Array Positions:
            0 - Password length
            1 - Has uppercase
            2 - Has lowercase
            3 - Has special characters
        */

        let password = e.target.value
        let errors = [undefined, undefined, undefined, undefined, undefined] // Store the errors here
        let valids = [undefined, undefined, undefined, undefined, undefined] // Store the valids here

        // Handle length
        if (password.length >= 8 && password.length <= 12) {
            valids[0] = "The password length should be between 8 to 12"
        } else {
            errors[0] = "The password length should be between 8 to 12"
            // valids[0] = undefined
        }

        // Handle Upper case characters
        if (/([A-Z]+)/g.test(password)) {
            valids[1] = "Should have an upper-case letter"
        } else {
            errors[1] = "Should have an upper-case letter"
        }

        // Handle lower case characters
        if (/([a-z]+)/g.test(password)) {
            valids[2] = "Should have an lower-case letter"
        } else {
            errors[2] = "Should have an lower-case letter"
        }

        // Handle number
        if (/([0-9]+)/g.test(password)) {
            valids[3] = "Should have a number"
        } else {
            errors[3] = "Should have a number"
        }

        // Handle special character
        if (/([!@#\$%\^\&*\)\(+=._-]+)/g.test(password)) {
            valids[4] = "Should have a special character"
        } else {
            errors[4] = "Should have a special character"
        }

        let allClear = 0

        valids.forEach((valid) => {
            if (valid) allClear += 1
        })

        this.setState(() => ({ password, valids, errors, allClear }))

        const confirmPassword = this.state.confirmPassword
        //const password = this.state.password
        let passwordDoesNotMatch = ''

        if (password !== confirmPassword) {
            passwordDoesNotMatch = 'Passwords do not match'
            this.setState(() => ({ passwordDoesNotMatch, confirmPassword }))

        } else {
            passwordDoesNotMatch = ''
            this.setState(() => ({ passwordDoesNotMatch, confirmPassword }))
        }
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calenderFocused: focused }))
    }

    handleConfirmPassword = (e) => {
        const confirmPassword = e.target.value
        const password = this.state.password
        let passwordDoesNotMatch = ''

        if (password !== confirmPassword) {
            passwordDoesNotMatch = 'Passwords do not match'
            this.setState(() => ({ passwordDoesNotMatch, confirmPassword }))

        } else {
            passwordDoesNotMatch = ''
            this.setState(() => ({ passwordDoesNotMatch, confirmPassword }))
        }
    }

    handleOnSubmit = async (e) => {
        e.preventDefault()
        
        try {
            if (!this.state.paymentDone) return toast('Please pay membership fee before proceeding', { type: 'error' })
            const user_object = {
                u_name: this.state.firstName + " " + this.state.lastName,
                u_email_id: this.state.email,
                u_password: this.state.password,
                u_driver_license: this.state.license,
                u_street: this.state.street,
                u_city: this.state.city,
                u_zip: 95112,
                u_state: this.state.state,
                u_dob: this.state.dateOfBirth,
                u_driver_license_state: this.state.licenseState,
                u_status: "Requested"
            }

            const formData = new FormData();
            formData.append('DriversLicense', this.state.pictures);
            formData.append('details', JSON.stringify(user_object))
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };

            const res = await axios.post(url.module + '/profile', formData, config)
            await axios.post(url.module + '/updateMembership', { um_user_driver_license: this.state.license, amount: this.state.product.price.toString() })
            this.props.history.push({
                pathname: '/login',
                type: 'success',
                message: 'SignUp Successfull'
            })

        } catch (error) {
            console.log(error);
        }

    }

    render() {
        return (
            <div>
                <section id="lgoin-page-wrap" className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-md-8 m-auto">
                                <div className="login-form">
                                    <h3>Sign Up</h3>
                                    <form onSubmit={this.handleOnSubmit}>
                                        <div className="name">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        placeholder="First Name"
                                                        value={this.state.firstName}
                                                        onChange={this.onFirstNameChange}
                                                        disabled={this.props.history.location.firstName}
                                                        required
                                                    />
                                                </div>

                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        placeholder="Last Name"
                                                        value={this.state.lastName}
                                                        onChange={this.onLastNameChange}
                                                        disabled={this.props.history.location.lastName}
                                                        required
                                                    />
                                                </div>

                                            </div>
                                        </div>

                                        <div className="username">
                                            <input type="date"
                                                id="test"
                                                required
                                                placeholder="Date Of Birth" />

                                        </div>

                                        <div className="username">
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                value={this.state.email}
                                                onChange={this.onEmailChange}
                                                disabled={this.props.history.location.email}
                                                required
                                            />

                                        </div>

                                        <div className="username">
                                            <input
                                                type="text"
                                                placeholder="Street"
                                                value={this.state.street}
                                                onChange={this.onStreetChange}
                                                required
                                            />

                                        </div>
                                        <div className="username">
                                            <input
                                                type="text"
                                                placeholder="City"
                                                value={this.state.city}
                                                onChange={this.onCityChange}
                                                required
                                            />

                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    placeholder="State"
                                                    value={this.state.state}
                                                    onChange={this.onStateChange}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    placeholder="Zip Code"
                                                    value={this.state.zip}
                                                    onChange={this.onZipChange}
                                                    required
                                                />
                                            </div>

                                        </div>

                                        <div className="password">
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                value={this.state.password}
                                                onChange={this.onPasswordChange}
                                                required />

                                            {this.state.password && <div className="password-div">
                                                {this.state.errors.map((error) => {
                                                    return error ? <p className="errorMessage" key={error}><img src={Red} className="password" alt="alt"></img> {error}</p> : undefined
                                                })}
                                                {this.state.valids.map((valid) => {
                                                    return valid ? <p className="correctMessage" key={valid}><img src={Green} className="password" alt="alt"></img> {valid}</p> : undefined
                                                })}
                                            </div>}

                                        </div>

                                        {this.state.password && this.state.allClear === 5 && <div className="password">
                                            <input
                                                type="password"
                                                placeholder="Confirm Password"
                                                value={this.state.confirmPassword}
                                                onChange={this.handleConfirmPassword} />
                                            {this.state.password && this.state.confirmPassword && !!this.state.passwordDoesNotMatch && <div className="password-div"><p className="errorMessage"><img src={Red} className="password" alt="alt"></img> Passwords do not match</p></div>}
                                            {this.state.password && this.state.confirmPassword && !this.state.passwordDoesNotMatch && <div className="password-div"><p className="correctMessage"><img src={Green} className="password" alt="alt"></img> Passwords match</p></div>}
                                        </div>}
                                        <input
                                            type="text"
                                            placeholder="Driver's License Number"
                                            value={this.state.license}
                                            onChange={this.onLicenseChange} />


                                        <div className="username">
                                            <input
                                                type="text"
                                                placeholder="Drivers License State"
                                                value={this.state.licenseState}
                                                onChange={this.onDriverLicenseStateChange}
                                                required
                                            />

                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    placeholder="Driver's License Photo"
                                                    value={this.state.pictures.name || ''}
                                                    readOnly
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ImageUploader
                                                    withIcon={false}
                                                    buttonText="Upload"
                                                    onChange={this.onDrop}
                                                    imgExtension={['.jpg', '.png', '.jpeg']}
                                                    maxFileSize={5242880}
                                                    singleImage={true}
                                                    label=""
                                                />

                                            </div>
                                        </div>

                                        <StripeCheckout
                                            stripeKey="pk_test_o85updIuelSeT5iCUNfiTDjR00t7iCKLuF"
                                            token={this.handleToken}
                                            amount={this.state.product.price * 100}
                                        >
                                            <div className="fileContainer">
                                                <button className="chooseFileButton">Pay Membership fee of ${this.state.product.price} <i className="fa fa-long-arrow-right"></i></button>
                                            </div>
                                        </StripeCheckout>
                                        <div className="log-btn">
                                            <button type="submit" onClick={this.handleOnSubmit}><i className="fa fa-check-square"></i> Sign Up</button>
                                        </div>


                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}