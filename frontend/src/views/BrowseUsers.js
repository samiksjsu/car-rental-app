import React from 'react'
import axios from 'axios'
import OptionModal from './OptionModal'
import { Card } from "../components/Card/Card.jsx";
import "../assets/css/modal.css"
import ReactPaginate from 'react-paginate';
import url from "../GlobalVariables"
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
toast.configure();



export default class BrowseUsers extends React.Component {
    state = {
        itemsPerPage: 10,
        totalUsers: 0,
        users: [],
        selectedUser: '',
        selectedStatus: '',
        action: '',
        u_driver_license: '',
        selectedUserForDisplay: undefined,
    }

    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedUserForDisplay: undefined }))
    }

    async componentDidMount() {
        const numberOfUsers = await axios.post(url.module + '/getnumberofusers')

        this.setState(() => ({ totalUsers: numberOfUsers.data.data.number }))

        const linkArr = ["../assets/css/bootstrap.min.css",
            
        "../assets/css/font-awesome.css",
        
        "../style.css",
        "../assets/css/responsive.css"]

    linkArr.forEach((scr) => {
        const link = document.createElement("link");
        link.href = scr;
        link.rel = "stylesheet"
        document.head.appendChild(link);
    })
    }

    onPageChange = async (e) => {

        const req = {
            limit: this.state.itemsPerPage,
            offset: e.selected * this.state.itemsPerPage
        }
        const users = await axios.post(url.module + '/browseusers', req)

        this.setState(() => ({
            users: users.data.data,
            selectedUser: '',
            selectedStatus: '',
            action: '',
            u_driver_license: ''
        }))
    }

    onSelectedChange = (e) => {

        const index = e.target.value

        const selectedvalue = this.state.users[index].u_email_id
        const selectedStatus = this.state.users[index].u_status
        const u_driver_license = this.state.users[index].u_driver_license
        let action = ''
        if (selectedStatus === "Approved") {
            action = "Block"
        }
        else {
            action = "Activate"
        }
        this.setState(() => ({
            selectedUser: selectedvalue,
            selectedStatus,
            action,
            u_driver_license
        }))
    }

    handleOnRowClick = async (user, e) => {
        const photo = await axios.post(url.module + '/getuserlicensephoto', user)
        user.image = photo.data
        this.setState(() => ({ selectedUserForDisplay: user }))
    }

    handleOnSubmit = async (e) => {
        e.preventDefault()
        let status = ''
        if (this.state.action === "Block") {
            status = "Blocked"
        }
        if (this.state.action === "Activate") {
            status = "Approved"
        }
        const req = {
            u_status: status,
            u_driver_license: this.state.u_driver_license
        }

        const res = await axios.patch(url.module + '/approverejectuser', req)
        if (res.data.flag === "S") {
            toast('request successful!', { type: 'success' })
            window.location.reload();
        }
    }

    render() {
        return (
            <div className="content">
                <Card
                    ctTableFullWidth=""
                    title="Browse Users"
                    content={

                        <div>


                            <form onSubmit={this.handleOnSubmit}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Select</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>License</th>
                                            <th>DOB</th>
                                            <th>Status</th>
                                            <th>Member Till</th>
                                            <th>Member Amount Paid</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.users.map((user, index) => (
                                            <tr key={index} >
                                                <td>
                                                    <input type="radio" value={index}
                                                        checked={this.state.selectedUser === user.u_email_id}
                                                        onChange={this.onSelectedChange}
                                                        required />
                                                </td>
                                                <td onClick={this.handleOnRowClick.bind(this, user)}>
                                                    {user.u_name}
                                                </td>
                                                <td onClick={this.handleOnRowClick.bind(this, user)}>
                                                    {user.u_email_id}
                                                </td>
                                                <td onClick={this.handleOnRowClick.bind(this, user)}>
                                                    {user.u_driver_license}
                                                </td>
                                                <td onClick={this.handleOnRowClick.bind(this, user)}>
                                                    {user.u_dob}
                                                </td>
                                                <td onClick={this.handleOnRowClick.bind(this, user)}>
                                                    {user.u_status}
                                                </td>
                                                <td onClick={this.handleOnRowClick.bind(this, user)}>
                                                    {user.valid_till}
                                                </td>
                                                <td onClick={this.handleOnRowClick.bind(this, user)}>
                                                    ${user.amount}
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
                            {!this.state.selectedUserForDisplay &&

                                <ReactPaginate
                                    pageCount={this.state.totalUsers / this.state.itemsPerPage}
                                    pageRangeDisplayed={4}
                                    marginPagesDisplayed={3}
                                    onPageChange={this.onPageChange}
                                    pageClassName="page-item"
                                    containerClassName={'pagination justify-content-center'}
                                    pageClassName={'page-item'}
                                    pageLinkClassName={'page-link'}
                                    previousClassName={'page-item'}
                                    previousLinkClassName={'page-link'}
                                    nextClassName={'page-item'}
                                    nextLinkClassName={'page-link'}
                                    initialPage={0}
                                    activeClassName={'page-item active'}
                                    disabledClassName={'page-item disabled'}
                                />
                            }

                            {!!this.state.selectedUserForDisplay &&
                                <OptionModal
                                    selectedOption={this.state.selectedUserForDisplay}
                                    handleClearSelectedOption={this.handleClearSelectedOption}
                                ></OptionModal>
                            }
                        </div>
                    }
                />
            </div>
        )
    }
}