import React from 'react';
import axios from 'axios'
import moment from 'moment'
import profilePic from '../myAvatar.png'
import StripeCheckout from 'react-stripe-checkout'
import url from '../GlobalVariables'
import '../assets/css/userprofile.css';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
toast.configure();

export default class MyProfile extends React.Component {

    state = {
        membershipDetails: {
            
        },
        userDetails: {
            u_city: '',
            u_dob: '',
            u_driver_license: '',
            u_driver_license_state: '',
            u_email_id: '',
            u_name: '',
            u_state: '',
            u_status: '',
            u_street: '',
            u_zip: '',
            firstName: '',
            lastName: ''
        },

        product: {
            name: '',
            price: ''
        }
    }

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

        const script1 = document.createElement("script");
        script1.src = 'https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js';
        script1.async = false;
        script1.integrity = 'sha384-fA23ZRQ3G/J53mElWqVJEGJzU0sTs+SvzG8fXVWP+kJQ1lwFAOkcUOysnlKJC33U'
        script1.crossOrigin = 'anonymous'
        document.body.appendChild(script1);

        const script2 = document.createElement("script");
        script2.src = 'https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js';
        script2.async = false;
        script2.integrity = 'sha384-CauSuKpEqAFajSpkdjv3z9t8E7RlpJ1UP0lKM/+NdtSarroVKu069AlsRPKkFBz9'
        script2.crossOrigin = 'anonymous'
        document.body.appendChild(script2);


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

    componentDidMount = async (e) => {
        const user = JSON.parse(localStorage.getItem('user'))
        const membershipDetails = await axios.get(url.module + `/membershipDetails/${user.driverLicense}`)
        const price = await axios.get(url.module + '/membershipFee')

        let userDetails = (await axios.get(url.module + `/userDetails/${user.email}`)).data
        userDetails.firstName = userDetails.u_name.split(' ')[0]
        userDetails.lastName = userDetails.u_name.split(' ')[1]
        userDetails.profilePic = user.profilePic
        this.setState(() => ({ membershipDetails: membershipDetails.data, userDetails, product: { name: '6 Month Membership Fee', price: price.data.m_fee } }))
    }

    // On change handlers

    onStreetChange = (e) => {
        e.preventDefault()
        let userDetails = {
            ...this.state.userDetails,
            u_street: e.target.value
        }

        this.setState(() => ({ userDetails }))
    }

    onCityChange = (e) => {
        e.preventDefault()
        let userDetails = {
            ...this.state.userDetails,
            u_city: e.target.value
        }

        this.setState(() => ({ userDetails }))
    }

    onStateChange = (e) => {
        e.preventDefault()
        let userDetails = {
            ...this.state.userDetails,
            u_state: e.target.value
        }

        this.setState(() => ({ userDetails }))
    }

    onZipChange = (e) => {
        e.preventDefault()
        let userDetails = {
            ...this.state.userDetails,
            u_zip: e.target.value
        }

        this.setState(() => ({ userDetails }))
    }

    handleRenewMembership = async (token, addresses) => {

        const product = this.state.product
        const res = await axios.post(url.module + '/checkout', { token, product })

        if (res.data.status === 'success') {
            await axios.post(url.module + '/updateMembership', { um_user_driver_license: this.state.userDetails.u_driver_license, amount: this.state.product.price })
            const message = `Payment of $${this.state.product.price} is done successfully`
            let membershipDetails = {
                ...this.state.membershipDetails,
                renewed_on: moment().format('YYYY-MM-DD'),
                valid_till: moment(this.state.membershipDetails.valid_till).add(6, 'M').format('YYYY-MM-DD'),
                amount: this.state.product.price
            }
            this.setState(() => ({ membershipDetails }))
            toast(message, { type: 'success' })
        }
    }

    handleAdrressUpdate = async (e) => {
        e.preventDefault()
        let { u_street, u_city, u_state, u_zip, u_driver_license } = this.state.userDetails

        await axios.patch(url.module + '/updateUserAddress', { u_street, u_city, u_state, u_zip, u_driver_license })
        toast('Address Details Updated Successfully!', { type: 'success' })
    }

    render() {
        return (
            <div >
                <div className="profile-page">
                    <div className="page-header header-filter user-background" data-parallax="true"></div>
                    <div className="main main-raised">
                        <div className="profile-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 ml-auto mr-auto">
                                        <div className="profile">
                                            <div className="avatar">
                                                <img src={this.state.userDetails.profilePic || profilePic} alt="Circle" className="img-raised rounded-circle img-fluid" />
                                            </div>
                                            <div className="name">
                                                <h3 className="title">{this.state.userDetails.firstName + ' ' + this.state.userDetails.lastName}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="blog-page-content" className="section-padding">
                                        <div className="container">
                                            <div className="row">

                                                <div className="col-lg-12">
                                                    <article className="single-article">
                                                        <div className="row">
                                                            <div className="col-lg-5">
                                                                <div className="article-thumb">
                                                                    <img src="../assets/img/article/arti-thumb-1.jpg" alt="JSOFT" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-7">
                                                                <div className="display-table">
                                                                    <div className="display-table-cell">
                                                                        <div className="article-body">
                                                                            <h3><a href="article-details.html">Personal Details</a></h3>

                                                                            <div>

                                                                                <div className="form-group review-form-small">

                                                                                    <input type="input"
                                                                                        className="form-control"
                                                                                        placeholder="First Name"
                                                                                        value={this.state.userDetails.firstName || ''}
                                                                                        readOnly
                                                                                    />
                                                                                </div>

                                                                                <div className="form-group review-form-small">

                                                                                    <input
                                                                                        type="input"
                                                                                        className="form-control"
                                                                                        placeholder="Last Name"
                                                                                        value={this.state.userDetails.lastName || ''}
                                                                                        readOnly
                                                                                    />
                                                                                </div>

                                                                                <div className="form-group review-form-big">

                                                                                    <input
                                                                                        type="input"
                                                                                        className="form-control"
                                                                                        placeholder="Email"
                                                                                        value={this.state.userDetails.u_email_id}
                                                                                        readOnly
                                                                                    />
                                                                                </div>

                                                                                <div className="form-group review-form-big">

                                                                                    <input
                                                                                        type="date"
                                                                                        className="form-control"
                                                                                        placeholder="Date Of Birth"
                                                                                        value={this.state.userDetails.u_dob}
                                                                                        readOnly
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </article>
                                                </div>
                                                <div className="col-lg-12">
                                                    <article className="single-article">
                                                        <div className="row">


                                                            <div className="col-lg-7">
                                                                <div className="display-table">
                                                                    <div className="display-table-cell">
                                                                        <div className="article-body">
                                                                            <h3><a href="article-details.html">Address Details</a></h3>

                                                                            <div>

                                                                                <div className="form-group review-form-small">

                                                                                    <input type="text"
                                                                                        className="form-control"
                                                                                        placeholder="Street"
                                                                                        value={this.state.userDetails.u_street}
                                                                                        onChange={this.onStreetChange}
                                                                                    />
                                                                                </div>

                                                                                <div className="form-group review-form-small">

                                                                                    <input
                                                                                        type="input"
                                                                                        className="form-control"
                                                                                        placeholder="City"
                                                                                        value={this.state.userDetails.u_city}
                                                                                        onChange={this.onCityChange}
                                                                                    />
                                                                                </div>
                                                                                <div className="form-group review-form-small">

                                                                                    <input
                                                                                        type="input"
                                                                                        className="form-control"
                                                                                        placeholder="State"
                                                                                        value={this.state.userDetails.u_state}
                                                                                        onChange={this.onStateChange}
                                                                                    />
                                                                                </div>
                                                                                <div className="form-group review-form-small">

                                                                                    <input
                                                                                        type="input"
                                                                                        className="form-control"
                                                                                        placeholder="Zip"
                                                                                        value={this.state.userDetails.u_zip}
                                                                                        onChange={this.onZipChange}
                                                                                    />
                                                                                </div>

                                                                            </div>
                                                                            <button className="readmore-btn" onClick={this.handleAdrressUpdate}>Save <i className="fa fa-long-arrow-right"></i></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="right-image-div">
                                                                <div className="article-thumb">
                                                                    <img src="../assets/img/article/arti-thumb-2.jpg" alt="JSOFT" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </article>
                                                </div>
                                                <div className="col-lg-12">
                                                    <article className="single-article">
                                                        <div className="row">
                                                            <div className="col-lg-5">
                                                                <div className="article-thumb">
                                                                    <img src="../assets/img/article/arti-thumb-4.jpg" alt="JSOFT" />
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-7">
                                                                <div className="display-table">
                                                                    <div className="display-table-cell">
                                                                        <div className="article-body">
                                                                            <h3><a href="article-details.html">Driver's License Details</a></h3>
                                                                            <div>
                                                                                <div className="form-group review-form-small">

                                                                                    <input type="input"
                                                                                        className="form-control"
                                                                                        placeholder="Driver's License Number"
                                                                                        value={this.state.userDetails.u_driver_license}
                                                                                        readOnly
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </article>

                                                </div>
                                                <div className="col-lg-12">
                                                    <article className="single-article">
                                                        <div className="row">


                                                            <div className="col-lg-7">
                                                                <div className="display-table">
                                                                    <div className="display-table-cell">
                                                                        <div className="article-body">
                                                                            <h3><a href="article-details.html">Membership Details</a></h3>

                                                                            <div>

                                                                                <div className="form-group review-form-small">

                                                                                    <input type="input"
                                                                                        className="form-control"
                                                                                        placeholder="Start Date"
                                                                                        value={`Start Date - ${this.state.membershipDetails.start_date}` || ''}
                                                                                        readOnly
                                                                                    />
                                                                                </div>

                                                                                <div className="form-group review-form-small">

                                                                                    <input
                                                                                        type="input"
                                                                                        className="form-control"
                                                                                        placeholder="End Date"
                                                                                        value={`End Date - ${this.state.membershipDetails.valid_till}` || ''}
                                                                                        readOnly
                                                                                    />
                                                                                </div>
                                                                                <div className="form-group review-form-small">

                                                                                    <input
                                                                                        type="input"
                                                                                        className="form-control"
                                                                                        placeholder="Renewed On"
                                                                                        value={`Renewed On - ${this.state.membershipDetails.renewed_on}` || ''}
                                                                                        readOnly
                                                                                    />
                                                                                </div>
                                                                                <div className="form-group review-form-small">

                                                                                    <input
                                                                                        type="input"
                                                                                        className="form-control"
                                                                                        placeholder="Amount"
                                                                                        value={`Amount - $${this.state.membershipDetails.amount}` || ''}
                                                                                        readOnly
                                                                                    />
                                                                                </div>

                                                                            </div>
                                                                            <StripeCheckout
                                                                                stripeKey="pk_test_o85updIuelSeT5iCUNfiTDjR00t7iCKLuF"
                                                                                token={this.handleRenewMembership}
                                                                                amount={this.state.product.price * 100}
                                                                            >
                                                                                <button className="readmore-btn">Renew Membership for ${this.state.product.price} <i className="fa fa-long-arrow-right"></i></button>
                                                                            </StripeCheckout>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="right-image-div">
                                                                <div className="article-thumb">
                                                                    <img src="../assets/img/article/arti-thumb-2.jpg" alt="JSOFT" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </article>
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
        )
    }

}