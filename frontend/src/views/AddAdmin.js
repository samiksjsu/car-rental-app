import React from 'react'
import axios from 'axios'
import { Card } from "../components/Card/Card.jsx";
import url from "../GlobalVariables"
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
toast.configure();


export default class AddAdmin extends React.Component {
    state = {
        a_name: '',
        a_password: '',
        a_email_id: '',
        a_status:'Active',
        admins:[],
        selectedAdmin:'',
        selectedStatus:'',
        action:''

    }

    async componentDidMount(){
        const admins = await axios.get(url.module+'/getalladmins')
        console.log(admins.data.data)
        this.setState(()=>({admins:admins.data.data}))
    }

    ona_nameChange = (e) => {
        const a_name = e.target.value
        this.setState(() => ({ a_name }))
    }

    ona_passwordChange = (e) => {
        const a_password = e.target.value
        this.setState(() => ({ a_password }))
    }


    ona_email_idChange = (e) => {
        const a_email_id = e.target.value
        this.setState(()=>({a_email_id}))
    }

    onSelectedChange = (e) => {

        const index = e.target.value
        
        const selectedvalue = this.state.admins[index].a_email_id
        const selectedStatus = this.state.admins[index].a_status
        const a_name = this.state.admins[index].a_name
        let action = ''
        if (selectedStatus === "Active") {
            action = "Block"
        }
        else {
            action = "Active"
        }
        this.setState(() => ({
            selectedAdmin: selectedvalue,
            selectedStatus,
            action,
            
        }))
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        console.log(this.state)
        const res = await axios.post(url.module+'/addadministrator',this.state)
        if(res.data.flag==='S'){
            toast(res.data.message, { type: 'success' })
            this.setState(()=>({
                a_name:'',
                a_password: '',
                a_email_id: ''
            }))
        }
        else{
            toast(res.data.message, { type: 'error' })
        }
    }

    handleEditAdmin = async (e) => {
        e.preventDefault()
        
        const req = {
            a_email_id:this.state.selectedAdmin,
            a_status:this.state.action
        }
        

        const res = await axios.patch(url.module+'/editadministrator',req)
        
        if(res.data.flag==='S'){
            toast(res.data.message, { type: 'success' })
            window.location.reload();
        }
    }

    render() {
        return (
            <div className="content">
                <Card
                    ctTableFullWidth=""
                    title="Add Admin"
                    content={
                        <div>

                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="formGroupExampleInput">Admin Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Administrator Name"
                                        value={this.state.a_email_id}
                                        onChange={this.ona_email_idChange}
                                        required
                                    />
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="formGroupExampleInput">Admin Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Administrator Name"
                                            value={this.state.a_name}
                                            onChange={this.ona_nameChange}
                                            required
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="formGroupExampleInput">Admin Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter Administrator Password"
                                            value={this.state.a_password}
                                            onChange={this.ona_passwordChange}
                                            required />
                                    </div>

                                </div>
                                <br/>
                                <div className="buttondiv">
                                    <button type="submit" className="button">Submit</button>
                                </div>
                            </form>
                        </div>
                    }
                />


                <Card
                    ctTableFullWidth=""
                    title="Edit Admin"
                    content={
                        <div>

                        <form onSubmit={this.handleEditAdmin}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.admins.map((admin, index) => (
                                    <tr key={index} >
                                        <td>
                                            <input type="radio" value={index}
                                                checked={this.state.selectedAdmin === admin.a_email_id}
                                                onChange={this.onSelectedChange}
                                                required />
                                        </td>
                                        <td >
                                            {admin.a_name}
                                        </td>
                                        <td >
                                            {admin.a_email_id}
                                        </td>
                                        <td >
                                            {admin.a_status}
                                        </td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br />
                        <div className="buttondiv2">
                            {this.state.selectedStatus &&
                                <button name="button" type="submit" className="button2" value={this.state.selectedStatus}>
                                    {this.state.action}
                                </button>}

                        </div>
                    </form>
                    <br />
                    


                        </div>}
                />

            </div>
        )
    }
}