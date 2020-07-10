import React from 'react'
import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux'
import { addUser } from '../action/users'
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import url from '../GlobalVariables'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
toast.configure();

class LoginPage extends React.Component {

    state = {

        _isMounted: false,

        userId: '',
        email: '',
        password: '',
        name: '',
        loggedIn: false,
        redirectedFromLogout: false,
        googloginCancelled: false
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState(() => ({ redirectedFromLogout: false, googloginCancelled: false }))
    };

    handleGoogleLoginSuccess = async (response) => {

        const user = {
            email: response.profileObj.email,
            name: response.profileObj.name,
            profilePic: response.profileObj.imageUrl,
            loggedIn: true
        }

        const userResponse = await axios.post(url.module + '/userlogin', { u_email_id: user.email, u_password: 'Google Login' })

        if (userResponse.data.message === 'Please register and then login') {
            // Call the SignUp page here

            this.props.history.push({
                pathname: '/signup',
                firstName: response.profileObj.givenName,
                lastName: response.profileObj.familyName,
                email: response.profileObj.email,
            })

        } else {

            // Earlier registered but now trying to signin using google
            // if (response.data.message == 'Please enter correct password')
            // Directly log user in

            user.status = userResponse.data.user.u_status
            user.driverLicense = userResponse.data.user.u_driver_license
            localStorage.setItem('user', JSON.stringify(user));
            this.props.dispatch(addUser(user))

            this.props.history.push({
                pathname: `/dashboard/${user.name}`,
                type: 'success',
                message: 'Login Successfull'
            })
        }
    }

    handleGoogleLoginFailure = (error) => {
        toast('Google Login Cancelled!', { type: 'warning' })
    }

    responseFacebook = (response) => {
        console.log(response);
    }

    onEmailChange = (e) => {
        const email = e.target.value
        this.setState(() => ({ email }))
    }

    onPasswordChange = (e) => {
        const password = e.target.value
        this.setState(() => ({ password }))
    }

    handleOnSubmit = async (e) => {

        e.preventDefault()
        const user = {
            u_email_id: this.state.email,
            u_password: this.state.password
        }
        const res = await axios.post(url.module + '/userlogin', user)
        console.log(res)
        if (res.data.message === 'Please register and then login') toast('Invalid Email or Password!', { type: 'error' })

        else if (res.data.user.u_status === 'Approved' || res.data.user.u_status === 'Requested') {

            const user = {
                email: res.data.user.u_email_id,
                name: res.data.user.u_name,
                profilePic: '',
                loggedIn: true,
                status: res.data.user.u_status,
                driverLicense: res.data.user.u_driver_license
            }
            
            localStorage.setItem('user', JSON.stringify(user));
            this.props.dispatch(addUser(user))
            this.props.history.push({
                pathname: `/dashboard/${res.data.user.u_name}`,
                type: 'success',
                message: 'Login Successfull'
            })

        } else if (res.data.user.u_status === 'Blocked' || res.data.user.u_status === 'Rejected') {

            toast(`Your UserId has been ${res.data.user.u_status} by our Admin. Please contact support`, { type: 'error' })

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
                                        <h3>Welcome!</h3>
                                        <form onSubmit={this.handleOnSubmit}>
                                            <div className="username">
                                                <input
                                                    type="text"
                                                    placeholder="Email"
                                                    value={this.state.email}
                                                    onChange={this.onEmailChange}
                                                />
                                            </div>
                                            <div className="password">
                                                <input
                                                    type="password"
                                                    placeholder="Password"
                                                    value={this.state.password}
                                                    onChange={this.onPasswordChange}
                                                />
                                            </div>

                                            <div className="log-btn">
                                                <button type="submit"><i className="fa fa-sign-in"></i> Log In</button>
                                                <p><NavLink to="/forgotpassword">Forgot Password</NavLink></p>
                                            </div>
                                        </form>
                                        {this.state._isMounted && <div className="login-other">
                                            <GoogleLogin
                                                clientId="812949026130-j8oqischl0fkhiti62tlb4vfsv2eg0p8.apps.googleusercontent.com"
                                                render={renderProps => (
                                                    <button
                                                        className="login-with-btn google"
                                                        onClick={renderProps.onClick}
                                                        disabled={renderProps.disabled}>
                                                        <i className="fa fa-google"></i>
                                                        Login With Google</button>
                                                )}
                                                buttonText="Login"
                                                onSuccess={this.handleGoogleLoginSuccess}
                                                onFailure={this.handleGoogleLoginFailure}
                                                cookiePolicy={'single_host_origin'}
                                            />
                                        </div>}
                                        <div className="create-ac">
                                            <p>Don't have an account? <NavLink to="/signup">Sign Up</NavLink></p>
                                        </div>
                                        <div className="login-menu">
                                            <a href="about.html">About</a>
                                            <span>|</span>
                                            <a href="contact.html">Contact</a>
                                        </div>
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

export default connect(mapStateToProps)(LoginPage)

