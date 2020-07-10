import React from 'react'
import Modal from 'react-modal'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import url from '../GlobalVariables'
import '../assets/css/ModalDisplay.css'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
toast.configure();

export default class ModalDisplay extends React.Component {
    state = {
        product: {
            name: this.props.c_model,
            price: this.props.totalAmount
        }
    }

    handleToken = async (token, addresses) => {

        const product = this.state.product
        const res = await axios.post(url.module + '/checkout', { token, product })

        if (res.data.status === 'success') {
            const message = "Payment of $" + this.props.totalAmount + " is done successfully"
            toast(message, { type: 'success' })
            this.props.handleConfirmPaymentAndBook()
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.openModal}
                onRequestClose={this.props.handleClearSelectedOption}
                contentLabel="Selected Option"
                ariaHideApp={false}
                closeTimeoutMS={200}
                className="custommodalSelectedCar"
                style={{
                    content: {

                    }
                }}
            >
                <div className="modal__body__selectedCar">
                    <div id="blog-page-content" >
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <article className="single-article-booking-modal">
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <div className="article-thumb-booking-modal hover-img">
                                                    <img src={`data:image/png;base64,${this.props.image}`} />
                                                </div>
                                            </div>

                                            <div className="col-lg-7">
                                                <div className="display-table">
                                                    <div className="display-table-cell">
                                                        <div className="article-body">
                                                            <h5 style={{ color: '#ffd000' }}>{this.props.c_model}</h5>

                                                            <ul className="booking-details">
                                                                <li>
                                                                    Rent : ${this.props.ratePerHour} per hour
                                                                </li>
                                                                <li>
                                                                    Total Payable : ${this.props.totalAmount}
                                                                </li>
                                                            </ul>

                                                            <ul className="booking-details">
                                                                <li>
                                                                    PickUp Date : {this.props.bookingDetails.pickUpDate}
                                                                </li>
                                                                <li>
                                                                    Return Date : {this.props.bookingDetails.returnDate}
                                                                </li>
                                                            </ul>

                                                            <ul className="booking-details">
                                                                <li>
                                                                    PickUp Time : {this.props.bookingDetails.pickUpTime}
                                                                </li>
                                                                <li>
                                                                    Return Time : {this.props.bookingDetails.returnTime}
                                                                </li>
                                                            </ul>

                                                            <ul className="booking-details">
                                                                <li>
                                                                    Pickup Location : {this.props.bookingDetails.garageAddress}
                                                                </li>
                                                                <li>
                                                                    Drop Location : {this.props.bookingDetails.garageAddress}
                                                                </li>
                                                            </ul>
                                                            <ul className="car-info-list">
                                                                <li>{this.props.feature1}</li>
                                                                <li>{this.props.feature2}</li>
                                                                <li>{this.props.feature3}</li>
                                                            </ul>

                                                            <button className="cancel-btn-modal-cancel" onClick={this.props.handleClearSelectedOption}>Cancel <i className="fa fa-long-arrow-right"></i></button>
                                                            <StripeCheckout
                                                                stripeKey="pk_test_o85updIuelSeT5iCUNfiTDjR00t7iCKLuF"
                                                                token={this.handleToken}
                                                                amount={this.props.totalAmount * 100}                                                                
                                                            >
                                                                <button className="cancel-btn-modal-confirm">Confirm Booking and Pay <i className="fa fa-long-arrow-right"></i></button>
                                                                </StripeCheckout>
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
            </Modal>
        )
    }
}