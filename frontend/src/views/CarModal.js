import React from 'react'
import axios from 'axios'
import { Card } from "../components/Card/Card.jsx";
import url from "../GlobalVariables"
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import "../assets/css/modal.css"
toast.configure();

export default class CarModal extends React.Component {

    state = {
        currentGarage: undefined,
        currentGarageId:'',
        selectedNewGarage:'',
        c_registration_number:this.props.selectedOption.c_registration_number,
        action:''
    }
    async componentDidMount() {
        console.log(this.props)
        if(this.props.selectedOption.c_status==='Active'){
            this.setState(()=>({action:'Blocked'}))
        }else{
            this.setState(()=>({action:'Active'}))
        }
        const req = {
            g_id: this.props.selectedOption.c_location
        }
        const currentGarage = await axios.post(url.module + '/getgaragedetails', req)
        console.log(currentGarage)
        this.setState(() => ({ currentGarageId:currentGarage.data.data[0].g_id,currentGarage: currentGarage.data.data[0].g_street + currentGarage.data.data[0].g_city + currentGarage.data.data[0].g_state + currentGarage.data.data[0].g_zip }))

    }

    ongarageChange = (e) => {
        const selectedNewGarage = e.target.value
        this.setState(()=>({selectedNewGarage}))
    }

    handleUpdate = async (e) => {
        e.preventDefault()
        if(this.state.selectedNewGarage===''){
            toast('Please select new location first', { type: 'error' })
        }
        else{
            console.log(this.state.currentGarageId,this.state.selectedNewGarage)
            const res = await axios.patch(url.module+'/editcarlocation',this.state) 
            if(res.data.flag==='S'){
                toast('Cars New Location Updated Successfully', { type: 'success' })
                this.props.handleClearSelectedOptionUpdated()
            }
            
        }
    }

    handlestatusChange = async (e) => {
        e.preventDefault()
        const res = await axios.patch(url.module+'/editcarstatus',this.state)
        if(res.data.flag==='S'){
            toast('Cars Status Updated Successfully', { type: 'success' })
            this.props.handleClearSelectedOptionUpdated()
            
        }

    }

    render() {
        return (
            <Modal
                isOpen={!!this.props.selectedOption}
                onRequestClose={this.props.handleClearSelectedOption}
                contentLabel="Selected Option"
                ariaHideApp={false}
                closeTimeoutMS={200}
                className="custommodal"
            >
                <center>
                    <div className="modal__body">
                        <div id="blog-page-content" className="">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <article className="single-article">
                                            <div className="row">
                                                <div className="col-lg-5">
                                                    <div className="article-thumb2">
                                                        {this.props.selectedOption.image && <img src={`data:image/png;base64,${this.props.selectedOption.image}`} />}
                                                    </div>
                                                </div>

                                                <div className="col-lg-7">
                                                    <div className="display-table">
                                                        <div className="display-table-cell">
                                                            <div className="article-body">


                                                                <ul className="booking-details">
                                                                    <li>
                                                                        Car Model : {this.props.selectedOption.c_model}
                                                                    </li>

                                                                </ul>
                                                                <ul className="booking-details">
                                                                    <li>
                                                                        Car Registration Number : {this.props.selectedOption.c_registration_number}
                                                                    </li>

                                                                </ul>


                                                                <ul className="booking-details">
                                                                    <li>
                                                                        Car Type : {this.props.selectedOption.c_type}
                                                                    </li>
                                                                    <li>
                                                                        Manufacture Year : {this.props.selectedOption.c_manufacture_year}
                                                                    </li>
                                                                </ul>
                                                                <ul className="booking-details">
                                                                    <li>
                                                                        {this.props.selectedOption.feature1}
                                                                    </li>
                                                                    <li>
                                                                        {this.props.selectedOption.feature2}
                                                                    </li>
                                                                </ul>
                                                                <ul className="booking-details">
                                                                    <li>
                                                                        {this.props.selectedOption.feature3}
                                                                    </li>
                                                                    <li>
                                                                        Status : {this.props.selectedOption.c_status}
                                                                    </li>
                                                                </ul>


                                                                <ul className="booking-details">
                                                                    <li>
                                                                        Current Location : {this.state.currentGarage}
                                                                    </li>

                                                                </ul>

                                                                <ul className="booking-details">
                                                                    <li>
                                                                        <div className="form-group">
                                                                            <select
                                                                                className="form-control"
                                                                                onChange={this.ongarageChange}
                                                                                value={this.selectedNewGarage}

                                                                            >
                                                                                <option selected disabled>Select  New Garage</option>
                                                                                {this.props.garages.map((garage) => (
                                                                                    <option value={garage.g_id} key={garage.g_id}> {garage.g_street + " " + garage.g_city + " " + garage.g_state + " " + garage.g_zip}</option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    </li>
                                                                </ul>


                                                                <button className="button" onClick={this.handleUpdate}>Update</button>
                                                                <button className="button" onClick={this.handlestatusChange}>Make Car {this.state.action}</button>
                                                                <button className="button" onClick={this.props.handleClearSelectedOption}>Back</button>
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
}