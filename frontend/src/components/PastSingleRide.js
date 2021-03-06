import React from 'react'


export default class PastRide extends React.Component {
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
                                            <div className="article-thumb hover-img2">
                                                <img src={this.props.img} alt="JSOFT" />
                                            </div>
                                        </div>

                                        <div className="col-lg-7">
                                            <div className="display-table">
                                                <div className="display-table-cell">
                                                    <div className="article-body">
                                                        <h5>{this.props.carName}</h5>
                                                        <ul className="booking-details">
                                                            <li>
                                                                Rent : {this.props.rent}
                                                            </li>
                                                            <li>
                                                                Amount Paid : {this.props.amountPaid}
                                                            </li>
                                                        </ul>

                                                        <ul className="booking-details">
                                                            <li>
                                                                Booking Date : {this.props.bookingDate}
                                                            </li>
                                                            <li>
                                                                Return Date : {this.props.returnDate}
                                                            </li>
                                                        </ul>
                                                        <ul className="booking-details">
                                                            <li>
                                                                Booking Time : {this.props.bookingTime}
                                                            </li>
                                                            <li>
                                                                Return Time : {this.props.returnTime}
                                                            </li>
                                                        </ul>
                                                        <ul className="booking-details">
                                                            <li>
                                                                Pickup Location : {this.props.pickupLocation}
                                                            </li>
                                                            <li>
                                                                Drop Location : {this.props.dropLocation}
                                                            </li>
                                                        </ul>
                                                        <ul className="car-info-list">
                                                            {this.props.features.map((feature) => (
                                                                <li key={feature}>{feature}</li>
                                                            ))}
                                                        </ul>
                                                        <ul className="booking-details">
                                                            <li>
                                                                Condition : {this.props.condition}
                                                            </li>
                                                        
                                                        </ul>
                                                        <ul className="booking-details">
                                                        <li>
                                                            Comments : {this.props.comments}
                                                        </li>
                                                    
                                                    </ul>
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