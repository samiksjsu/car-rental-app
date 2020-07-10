import React from 'react'
import axios from 'axios'
import url from "../GlobalVariables"
import "../assets/css/Addlocation.css"
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { Card } from "../components/Card/Card.jsx";
toast.configure();

export default class EditLocation extends React.Component {

    state = {
        data: undefined,
        selectedcity: '',
        cities: [],
        city: '',
        selectedValue: '',
        g_id: '',
        g_name: '',
        g_capacity: '',
        g_street: '',
        g_city: '',
        g_state: '',
        g_zip: ''
    }

    async componentDidMount() {
        const res1 = await axios.get(url.module + '/getgaragecity')
        this.setState(() => ({ cities: res1.data.data }))
        console.log(res1.data.data)
    }

    onGetGarageClick = async (e) => {
        if (this.state.selectedcity === '') {
            toast('Please select the city', { type: 'error' })
            return
        }
        const req = {
            g_city: this.state.selectedcity
        }
        console.log(req)
        const res = await axios.post(url.module + '/getgarage', req)
        console.log(res.data)
        this.setState(() => ({ data: res.data.data }))
    }

    onSelectedChange = (e) => {

        const index = e.target.value

        const selectedvalue = this.state.data[index].g_id
        this.setState(() => ({
            selectedValue: selectedvalue,
            g_id: this.state.data[index].g_id,
            g_name: this.state.data[index].g_name,
            g_capacity: this.state.data[index].g_capacity,
            g_street: this.state.data[index].g_street,
            g_city: this.state.data[index].g_city,
            g_state: this.state.data[index].g_state,
            g_zip: this.state.data[index].g_zip,
            vt_late_percent: this.state.data[index].vt_late_percent
        }))
        console.log(selectedvalue)
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

    oncityChange = (e) => {
        const selectedcity = e.target.value
        this.setState(() => ({ selectedcity, city: selectedcity }))
    }

    ondeleteClick = async (e) => {
        e.preventDefault()
        if (this.state.selectedValue === '') {
            toast('Please select the garage to delete', { type: 'error' })
            return
        }
        const req = {
            g_id: this.state.g_id,
        }

        const res = await axios.patch(url.module + '/deletegarage', req)
        if (res.data.flag === 'S') {
            const temp = this.state.data.filter((d) => {
                return d.g_id !== req.g_id
            })
            this.setState(() => ({ data: temp, selectedValue: '' }))
            toast('The garage is deactivated successfully', { type: 'success' })
        }


    }

    onhandleSubmit = async (e) => {
        e.preventDefault()
        if (this.state.selectedValue === '') {
            toast('Please select the garage to update', { type: 'error' })
            return
        }
        const req = {
            g_id: this.state.g_id,
            g_name: this.state.g_name,
            g_capacity: this.state.g_capacity,
            g_street: this.state.g_street,
            g_city: this.state.g_city,
            g_state: this.state.g_state,
            g_zip: this.state.g_zip,
        }

        const res = await axios.patch(url.module + '/updategarage', req)
        if (res.data.flag === 'S') {
            const temp = this.state.data.filter((d) => {
                return d.g_id !== req.g_id
            })
            temp.push(req)
            this.setState(() => ({ data: temp, selectedValue: '' }))
            toast('The garage is updated successfully', { type: 'success' })
        }
    }

    render() {
        return (
            <div className="content">
                <Card
                    ctTableFullWidth=""
                    title="Edit Location"
                    content={
                        <div >
                            <div >

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Please select the city</label>
                                    <select
                                        className="form-control"
                                        id="exampleFormControlSelect1"
                                        onChange={this.oncityChange}
                                        value={this.selectedcity}

                                    >
                                        <option selected disabled>Select city</option>
                                        {this.state.cities.map((city) => (
                                            <option value={city.g_city} key={city.g_city}> {city.g_city}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="buttondiv">
                                    <button name="button" type="submit" className="button2" value="update" onClick={this.onGetGarageClick}>Get Garage</button>
                                </div>
                                <br />
                                {this.state.data && <form onSubmit={this.onhandleSubmit}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Select</th>
                                                <th>Garage Name</th>
                                                <th>Capacity</th>
                                                <th>Street</th>
                                                <th>City</th>
                                                <th>State</th>
                                                <th>Zip</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.data.map((row, index) => (

                                                <tr key={index}>
                                                    <td>
                                                        <input type="radio" value={index}
                                                            checked={this.state.selectedValue === row.g_id}
                                                            onChange={this.onSelectedChange}
                                                            required />
                                                    </td>
                                                    <td>
                                                        {row.g_name}
                                                    </td>
                                                    <td>
                                                        {this.state.selectedValue === row.g_id ?
                                                            <input
                                                                type="number"
                                                                step="0.01"
                                                                className="inputtable"
                                                                value={this.state.g_capacity}
                                                                onChange={this.ong_capacityChange}
                                                                required
                                                            /> : row.g_capacity}
                                                    </td>
                                                    <td>
                                                        {this.state.selectedValue === row.g_id ?
                                                            <input
                                                                type="text"
                                                                className="inputtable"
                                                                value={this.state.g_street}
                                                                onChange={this.ong_streetChange}
                                                                required
                                                            /> : row.g_street}
                                                    </td>
                                                    <td>
                                                        {this.state.selectedValue === row.g_id ?
                                                            <input
                                                                type="text"
                                                                className="inputtable"
                                                                value={this.state.g_city}
                                                                onChange={this.ong_cityChange}
                                                                required
                                                            /> : row.g_city}
                                                    </td>
                                                    <td>
                                                        {this.state.selectedValue === row.g_id ?
                                                            <input
                                                                type="text"
                                                                className="inputtable"
                                                                value={this.state.g_state}
                                                                onChange={this.ong_stateChange}
                                                                required
                                                            /> : row.g_state}
                                                    </td>
                                                    <td>
                                                        {this.state.selectedValue === row.g_id ?
                                                            <input
                                                                type="text"
                                                                className="inputtable"
                                                                value={this.state.g_zip}
                                                                onChange={this.ong_zipChange}
                                                                required
                                                            /> : row.g_zip}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <br />
                                    <div className="buttondiv2">
                                        <button name="button" type="submit" className="button2" value="update">Update</button><br /><br />
                                        <button name="button" className="button2" value="update" onClick={this.ondeleteClick}>Delete</button>
                                    </div>

                                </form>

                                }
                            </div>
                        </div>

                    }
                />

            </div>
        )
    }
}