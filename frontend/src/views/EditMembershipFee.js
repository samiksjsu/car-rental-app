import React from 'react'
import axios from 'axios'
import { Card } from "../components/Card/Card.jsx";
import url from "../GlobalVariables"
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
toast.configure();

export default class EditMembershipFee extends React.Component {

    state = {
        m_fee: 0,
        old_fee:0
    }

    async componentDidMount() {
        const data = await axios.get(url.module + '/getmembershipfee')
        console.log(data.data.data[0].m_fee)
        this.setState(() => ({ m_fee: data.data.data[0].m_fee,old_fee:data.data.data[0].m_fee }))
    }

    onFeeChange = (e) => {
        const m_fee = e.target.value
        this.setState(() => ({ m_fee }))
    }

    handleonsubmit = async (e) => {
        e.preventDefault()
        console.log(this.state.m_fee)
        const res = await axios.patch(url.module+'/updatemembershipfee',this.state)
        if(res.data.flag==='S'){
            toast('Membership fee updated successfully!', { type: 'success' })
        }
    }

    render() {
        return (
            <div className="content">
                <Card
                    ctTableFullWidth=""
                    title="Edit Membership Fee"
                    content={
                        <div>
                            <form onSubmit={this.handleonsubmit}>
                                <div className="form-group">
                                    <label htmlFor="formGroupExampleInput">enter Membership Fee</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="formGroupExampleInput"
                                        placeholder="Edit Membership fee"
                                        value={this.state.m_fee}
                                        onChange={this.onFeeChange}
                                        required
                                    />
                                </div>

                                <div className="buttondiv">
                                    <button type="submit" className="button">Submit</button>
                                </div>
                            </form>
                        </div>

                    }
                />
            </div>
        )
    }
}