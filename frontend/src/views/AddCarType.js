import React from 'react'
import "../assets/css/adminforms.css"
import url from "../GlobalVariables"
import axios from 'axios'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { Card } from "../components/Card/Card.jsx";
toast.configure();
export default class AddCarType extends React.Component {
    state = {
        vt_name: '',
        vt_1_5: '',
        vt_6_10: '',
        vt_11_24: '',
        vt_25_48: '',
        vt_49_72: '',
        vt_late_percent: ''
    }

    onTypeChange = (e) => {
        const vt_name = e.target.value
        this.setState(() => ({ vt_name }))
    }

    on15Change = (e) => {
        const vt_1_5 = e.target.value
        this.setState(() => ({ vt_1_5 }))
    }

    on610Change = (e) => {
        const vt_6_10 = e.target.value
        this.setState(() => ({ vt_6_10 }))
    }

    on1124Change = (e) => {
        const vt_11_24 = e.target.value
        this.setState(() => ({ vt_11_24 }))
    }

    on2548Change = (e) => {
        const vt_25_48 = e.target.value
        this.setState(() => ({ vt_25_48 }))
    }

    on4972Change = (e) => {
        const vt_49_72 = e.target.value
        this.setState(() => ({ vt_49_72 }))
    }


    onPercentChange = (e) => {
        const vt_late_percent = e.target.value
        this.setState(() => ({ vt_late_percent }))
    }

    handleOnSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post(url.module + '/addcartype', this.state)
        console.log(res)
        if (res.data.flag === 'S') {
            toast('The car type is created successfully', { type: 'success' })
            this.setState(() => ({
                vt_name: '',
                vt_1_5: '',
                vt_6_10: '',
                vt_11_24: '',
                vt_25_48: '',
                vt_49_72: '',
                vt_late_percent: ''
            }))
        }
        
    }

    render() {
        return (
            <div className="content">
            <Card
          ctTableFullWidth=""
          title="Add Car Type"
          content={
            <form onSubmit={this.handleOnSubmit}>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Car Type Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            placeholder="Enter Car Type"
                            value={this.state.vt_name}
                            onChange={this.onTypeChange}
                            required
                        />
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="formGroupExampleInput">Rent for range 1-5 hours</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                placeholder="Rent for range 1-5 hours"
                                value={this.state.vt_1_5}
                                onChange={this.on15Change}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="formGroupExampleInput">Rent for range 6-10 hours</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                placeholder="Rent for range 6-10 hours"
                                value={this.state.vt_6_10}
                                onChange={this.on610Change}
                                required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="formGroupExampleInput">Rent for range 11-24 hours</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                placeholder="Rent for range 11-24 hours"
                                value={this.state.vt_11_24}
                                onChange={this.on1124Change}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="formGroupExampleInput">Rent for range 25-48 hours</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                placeholder="Rent for range 25-48 hours"
                                value={this.state.vt_25_48}
                                onChange={this.on2548Change}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="formGroupExampleInput">Rent for range 49-72 hours</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                placeholder="Rent for range 49-72 hours"
                                value={this.state.vt_49_72}
                                onChange={this.on4972Change}
                                required />
                        </div>
                        <div className="col">
                            <label htmlFor="formGroupExampleInput">Late payment percentage</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                placeholder="Late payment percentage"
                                value={this.state.vt_late_percent}
                                onChange={this.onPercentChange}
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