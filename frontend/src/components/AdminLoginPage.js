import React from 'react'
import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux'
import { addUser } from '../action/users'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import url from '../GlobalVariables'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
toast.configure();

class AdminLoginPage extends React.Component {

    state = {
        // Admin Credentials
        a_email_id: '',
        a_name: '',
        a_password: '',
        a_status: ''
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState(() => ({ redirectedFromLogout: false, googloginCancelled: false }))
    };

    onEmailChange = (e) => {
        const a_email_id = e.target.value
        this.setState(() => ({ a_email_id }))
    }

    onPasswordChange = (e) => {
        const a_password = e.target.value
        this.setState(() => ({ a_password }))
    }

    handleOnSubmit = async (e) => {
        e.preventDefault()

        try {
            const admin = {
                a_email_id: this.state.a_email_id,
                a_password: this.state.a_password
            }
            const res = (await axios.post(url.module + '/adminLogin', admin)).data

            if (res.a_status === 'Blocked') return toast('Account Blocked! Please Contact Support', { type: 'error' })

            this.setState(() => ({
                a_email_id: res.a_email_id,
                a_name: res.a_name,
                a_status: res.a_status
            }))
            admin.loggedIn=true
            localStorage.setItem('admin', JSON.stringify(admin));
            this.props.history.push({
                pathname: `/admin/dashboard`,
            })
            
        } catch (e) {
            return toast('Incorrect Admin Login Credentials!', { type: 'error' })
        }
    }
    componentDidMount() {

        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            this.props.history.push({
                pathname: `/dashboard/${user.name}`
            })
        }

        const scriptArr = ["../assets/js/jquery-3.2.1.min.js",
            "../assets/js/jquery-migrate.min.js",
            "../assets/js/popper.min.js",
            "../assets/js/bootstrap.min.js",
            "../assets/js/plugins/gijgo.js",
            "../assets/js/plugins/vegas.min.js",
            "../assets/js/plugins/isotope.min.js",
            "../assets/js/plugins/owl.carousel.min.js",
            "../assets/js/plugins/waypoints.min.js",
            "../assets/js/plugins/counterup.min.js",
            "../assets/js/plugins/mb.YTPlayer.js",
            "../assets/js/plugins/magnific-popup.min.js",
            "../assets/js/plugins/slicknav.min.js",
            "../assets/js/main.js"]

        scriptArr.forEach((scr) => {
            const script = document.createElement("script");
            script.src = scr;
            script.async = false;
            document.body.appendChild(script);
        })

        const linkArr = ["../assets/css/bootstrap.min.css",
            "../assets/css/plugins/vegas.min.css",
            "../assets/css/plugins/slicknav.min.css",
            "../assets/css/plugins/magnific-popup.css",
            "../assets/css/plugins/owl.carousel.min.css",
            "../assets/css/plugins/gijgo.css",
            "../assets/css/font-awesome.css",
            "../assets/css/reset.css",
            "../style.css",
            "../assets/css/responsive.css"]

        linkArr.forEach((scr) => {
            const link = document.createElement("link");
            link.href = scr;
            link.rel = "stylesheet"
            document.head.appendChild(link);
        })

        if (this.props.history.location.message) toast(this.props.history.location.message, { type: this.props.history.location.type })

        this.setState(() => ({ _isMounted: true }))
    }

    render() {
        return (
            <div>
                <section id="lgoin-page-wrap" className="section-padding login-page-wrap-height">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-8 m-auto">
                                <div className="login-page-content">
                                    <div className="login-form">
                                        <h3>Welcome Admin!</h3>
                                        <form onSubmit={this.handleOnSubmit}>
                                            <div className="username">
                                                <input
                                                    type="text"
                                                    placeholder="Email"
                                                    value={this.state.a_email_id}
                                                    onChange={this.onEmailChange}
                                                />
                                            </div>
                                            <div className="password">
                                                <input
                                                    type="password"
                                                    placeholder="Password"
                                                    value={this.state.a_password}
                                                    onChange={this.onPasswordChange}
                                                />
                                            </div>

                                            <div className="log-btn">
                                                <button type="submit"><i className="fa fa-sign-in"></i> Log In</button>
                                                <p><NavLink to="/forgotpassword">Forgot Password</NavLink></p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    users: state.users
})

export default connect(mapStateToProps)(AdminLoginPage)