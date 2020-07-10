import React from 'react'
import Modal from 'react-modal'
import "../assets/css/modal.css"
const OptionModal = (props) => {
    return (
       <Modal
        isOpen = {!!props.selectedOption}
        onRequestClose={props.handleClearSelectedOption}
        contentLabel = "Selected Option"
        ariaHideApp = {false}
        closeTimeoutMS={200}
        className="custommodal"
       >
       <center>
        <div className = "modal__body">
        <div id="blog-page-content" className="">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <article className="single-article">
                            <div className="row">
                                <div className="col-lg-5">
                                    <div className="article-thumb2 hover-img3">
                                        {props.selectedOption.image && <img src={`data:image/png;base64,${props.selectedOption.image}`} />}
                                    </div>
                                </div>

                                <div className="col-lg-7">
                                    <div className="display-table">
                                        <div className="display-table-cell">
                                            <div className="article-body">
                                                <center><h5>{props.selectedOption.u_name}</h5></center>
                                                
                                                <ul className="booking-details">
                                                    <li>
                                                        Email : {props.selectedOption.u_email_id}
                                                    </li>

                                                </ul>
                                                <ul className="booking-details">
                                                    <li>
                                                        DOB : {props.selectedOption.u_dob}
                                                    </li>

                                                </ul>


                                                <ul className="booking-details">
                                                    <li>
                                                        Driver License : {props.selectedOption.u_driver_license}
                                                    </li>
                                                    <li>
                                                        License State : {props.selectedOption.u_driver_license_state}
                                                    </li>
                                                </ul>
                                                <ul className="booking-details">
                                                    <li>
                                                        Street : {props.selectedOption.u_street}
                                                    </li>
                                                    <li>
                                                        City : {props.selectedOption.u_city}
                                                    </li>
                                                </ul>
                                                <ul className="booking-details">
                                                    <li>
                                                        State : {props.selectedOption.u_state}
                                                    </li>
                                                    <li>
                                                        Zip : {props.selectedOption.u_zip}
                                                    </li>
                                                </ul>
                                                <ul className="booking-details">
                                                    <li>
                                                        Member From : {props.selectedOption.start_date}
                                                    </li>
                                                    <li>
                                                        Member Till : {props.selectedOption.valid_till}
                                                    </li>
                                                </ul>
                                                <button className="button" onClick={props.handleClearSelectedOption}>Okay</button>
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
    </center>
       
        
       </Modal>
    )
}

export default OptionModal