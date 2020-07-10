import React from 'react'
import axios from 'axios'
import url from "../GlobalVariables"
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
toast.configure();


export default class SingleUserRequest extends React.Component {
    state = {
        image: undefined,
        request:true,
        status:''
    }
    async componentDidMount() {
        const photo = await axios.post(url.module + '/getuserlicensephoto', this.props)
        this.setState(() => ({
            image: photo.data
        }))
    }

    onApproveClick = async (e)=>{
        const req = {
            u_driver_license:this.props.u_driver_license,
            u_status:"Approved"
        }

        const res = await axios.patch(url.module+'/approverejectuser',req)
        if(res.data.flag==="S"){
            toast('User approved successfully!', { type: 'success' })
            this.setState(()=>({request:false,status:'Approved'}))
        }

    }

    onRejectClick = async (e)=>{
        const req = {
            u_driver_license:this.props.u_driver_license,
            u_status:"Rejected"
        }

        const res = await axios.patch(url.module+'/approverejectuser',req)
        if(res.data.flag==="S"){
            toast('User rejected successfully!', { type: 'success' })
            this.setState(()=>({request:false,status:'Rejected'}))
        }

    }


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
                                            <div className="article-thumb2 hover-img3">
                                                {this.state.image && <img src={`data:image/png;base64,${this.state.image}`} />}
                                            </div>
                                        </div>

                                        <div className="col-lg-7">
                                            <div className="display-table">
                                                <div className="display-table-cell">
                                                    <div className="article-body">
                                                        <center><h5>{this.props.u_name}</h5></center>
                                                        <br/>
                                                        <ul className="booking-details">
                                                            <li>
                                                                Email : {this.props.u_email_id}
                                                            </li>

                                                        </ul>
                                                        <ul className="booking-details">
                                                            <li>
                                                                DOB : {this.props.u_dob}
                                                            </li>

                                                        </ul>


                                                        <ul className="booking-details">
                                                            <li>
                                                                Driver License : {this.props.u_driver_license}
                                                            </li>
                                                            <li>
                                                                License State : {this.props.u_driver_license_state}
                                                            </li>
                                                        </ul>
                                                        <ul className="booking-details">
                                                            <li>
                                                                Street : {this.props.u_street}
                                                            </li>
                                                            <li>
                                                                City : {this.props.u_city}
                                                            </li>
                                                        </ul>
                                                        <ul className="booking-details">
                                                            <li>
                                                                State : {this.props.u_state}
                                                            </li>
                                                            <li>
                                                                Zip : {this.props.u_zip}
                                                            </li>
                                                        </ul>

                                                        {this.state.request ? <div className="buttondiv2">
                                                        <button 
                                                            name="button" 
                                                            className="button2" 
                                                            value="update"
                                                            onClick={this.onApproveClick}
                                                            >Approve</button>
                                                            <br /><br />
                                                        <button 
                                                            name="button" 
                                                            className="button2" 
                                                            value="update" 
                                                            onClick={this.onRejectClick}
                                                            >Reject</button>
                                                    </div>
                                                : <center><p>Request {this.state.status} successfully!</p></center>}
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
