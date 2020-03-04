import React from 'react'
import Header from './Header'

export default class WelcomePage extends React.Component {
    render() {
        return (
            <section id="slideslow-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="slideshowcontent">
                                <div className="display-table">
                                    <div className="display-table-cell">
                                        <h1>BOOK A CAR TODAY!</h1>
                                        <p>FOR AS LOW AS $10 A DAY PLUS 15% DISCOUNT <br/> FOR OUR RETURNING CUSTOMERS</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}