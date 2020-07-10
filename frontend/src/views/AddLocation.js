import React from 'react'
import axios from 'axios'
import url from "../GlobalVariables"
import "../assets/css/Addlocation.css"
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { Card } from "../components/Card/Card.jsx";
toast.configure();

export default class AddLocation extends React.Component {
    state = {
        g_name: '',
        g_capacity: '',
        g_street: '',
        g_city: '',
        g_state: '',
        g_zip: ''
    }

    ong_nameChange = (e) => {
        const g_name = e.target.value
        this.setState(() => ({ g_name }))
    }

    ong_capacityChange = (e) => {
        const g_capacity = e.target.value
        this.setState(() => ({ g_capacity }))
    }

    ong_streetChange = (e) => {
        const g_street = e.target.value
        this.setState(() => ({ g_street }))
    }

    ong_cityChange = (e) => {
        const g_city = e.target.value
        this.setState(() => ({ g_city }))
    }

    ong_stateChange = (e) => {
        const g_state = e.target.value
        this.setState(() => ({ g_state }))
    }

    ong_zipChange = (e) => {
        const g_zip = e.target.value
        this.setState(() => ({ g_zip }))
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post(url.module + '/addgarage', this.state)
        console.log(res)
        if (res.data.flag === 'S') {
            toast('The garage is added successfully', { type: 'success' })
            this.setState(() => ({
                g_name: '',
                g_capacity: '',
                g_street: '',
                g_city: '',
                g_state: '',
                g_zip: ''
            }))
        }
    }


    render() {
        return (
            <div className="content">
                <Card
                ctTableFullWidth=""
                title="Add Location"
                content={
                    <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="formGroupExampleInput">Garage Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Garage Name"
                                value={this.state.g_name}
                                onChange={this.ong_nameChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="formGroupExampleInput">Garage Capacity</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Garage Capacity"
                                value={this.state.g_capacity}
                                onChange={this.ong_capacityChange}
                                required />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="formGroupExampleInput">Street</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter street"
                                value={this.state.g_street}
                                onChange={this.ong_streetChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="formGroupExampleInput">City</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter city"
                                value={this.state.g_city}
                                onChange={this.ong_cityChange}
                                required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="formGroupExampleInput">State</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter state"
                                value={this.state.g_state}
                                onChange={this.ong_stateChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="formGroupExampleInput">Zip Code</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter zip code"
                                value={this.state.g_zip}
                                onChange={this.ong_zipChange}
                                required />
                        </div>
                    </div>
                    <br />
                    <div className="buttondiv">
                        <button type="submit" className="button">Submit</button>
                    </div>
                </form>
            

                }
                
                />
            
            </div>
        )
    }
}