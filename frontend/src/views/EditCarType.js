import React from 'react'
import axios from 'axios'
import url from "../GlobalVariables"
import "../assets/css/editcartype.css"
import { Card } from "../components/Card/Card.jsx";

import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
toast.configure();


export default class EditCarType extends React.Component {
    state = {
        data: [],
        selectedvalue: '',
        vt_1_5: '',
        vt_6_10: '',
        vt_11_24: '',
        vt_25_48: '',
        vt_49_72: '',
        vt_late_percent: ''

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

    async componentDidMount() {
        const res = await axios.get(url.module + '/getcartype')
        console.log(res.data.data)
        this.setState(() => ({ data: res.data.data }))
    }

    onSelectedChange = (e) => {
        const index = e.target.value

        const selectedvalue = this.state.data[index].vt_name
        console.log(selectedvalue)
        this.setState(() => ({
            selectedvalue,
            vt_1_5: this.state.data[index].vt_1_5,
            vt_6_10: this.state.data[index].vt_6_10,
            vt_11_24: this.state.data[index].vt_11_24,
            vt_25_48: this.state.data[index].vt_25_48,
            vt_49_72: this.state.data[index].vt_49_72,
            vt_late_percent: this.state.data[index].vt_late_percent
        }))
    }

    onhandleSubmit = async (e) => {
        e.preventDefault()
        
        const req={
            vt_name:this.state.selectedvalue,
            vt_1_5: this.state.vt_1_5,
            vt_6_10: this.state.vt_6_10,
            vt_11_24: this.state.vt_11_24,
            vt_25_48: this.state.vt_25_48,
            vt_49_72: this.state.vt_49_72,
            vt_late_percent: this.state.vt_late_percent
        }

        const res = await axios.patch(url.module+'/updatecartype',req)
        console.log(res.data)
        if(res.data.flag==='S'){
            const temp = this.state.data.filter((d)=>{
                return d.vt_name!==req.vt_name
            })
            temp.push(req)
            this.setState(()=>({data:temp,selectedvalue:''}))
            toast('The car type is updated successfully', { type: 'success' })

        }
    }

    render() {
        return (
            <div className="content">

            <Card 
            ctTableFullWidth=""
            title="Edit Car Type"
            content={
                <form onSubmit={this.onhandleSubmit}>
                <table>
                    <thead>
                    <tr>
                        <th>Select</th>
                        <th>Car Type Name</th>
                        <th>Price for 1 to 5 hours</th>
                        <th>Price for 6 to 10 hours</th>
                        <th>Price for 11 to 24 hours</th>
                        <th>Price for 25 to 48 hours</th>
                        <th>Price for 49 to 72 hours</th>
                        <th>Late Fee Percentage</th>

                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map((row, index) => (

                        <tr key={index}>
                            <td>
                                <input type="radio" value={index}
                                    checked={this.state.selectedvalue === row.vt_name}
                                    onChange={this.onSelectedChange}
                                    required />
                            </td>
                            <td>
                                {row.vt_name}
                            </td>
                            <td>
                                {this.state.selectedvalue === row.vt_name ?
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="inputtable"
                                        value={this.state.vt_1_5}
                                        onChange={this.on15Change}
                                        required
                                    /> : row.vt_1_5}
                            </td>
                            <td>
                                {this.state.selectedvalue === row.vt_name ?
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="inputtable"
                                        value={this.state.vt_6_10}
                                        onChange={this.on610Change}
                                        required
                                    /> : row.vt_6_10}
                            </td>
                            <td>
                                {this.state.selectedvalue === row.vt_name ?
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="inputtable"
                                        value={this.state.vt_11_24}
                                        onChange={this.on1124Change}
                                        required
                                    /> : row.vt_11_24}
                            </td>
                            <td>
                                {this.state.selectedvalue === row.vt_name ?
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="inputtable"
                                        value={this.state.vt_25_48}
                                        onChange={this.on2548Change}
                                        required
                                    /> : row.vt_25_48}
                            </td>
                            <td>
                                {this.state.selectedvalue === row.vt_name ?
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="inputtable"
                                        value={this.state.vt_49_72}
                                        onChange={this.on4972Change}
                                        required
                                    /> : row.vt_49_72}
                            </td>
                            <td>
                                {this.state.selectedvalue === row.vt_name ?
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="inputtable"
                                        value={this.state.vt_late_percent}
                                        onChange={this.onPercentChange}
                                        required
                                    /> : row.vt_late_percent}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <br/>
                <div className="buttondiv">
                    <button name="button" type="submit" className="button2" value="update">Update</button>
                </div>

            </form>
        
                   
        
            }
            />
            
            </div>
           )
    }
}