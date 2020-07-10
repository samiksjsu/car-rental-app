import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


// Component Imports
import NotFoundPage from '../components/NotFoundPage'
import WelcomePage from '../components/WelcomePage'
import LoginPage from '../components/LoginPage'
import AdminLoginPage from '../components/AdminLoginPage'
import Header from '../components/Header'
import Header1 from '../components/Header1'
import SignUpPage from '../components/SignUpPage'
import DashboardPage from '../components/DashboardPage'
import AboutPage from '../components/About'
import SupportPage from '../components/SupportPage'
import ForgotPassword from '../components/ForgotPassword'
import MyProfile from '../components/MyProfile'
import Footer from '../components/Footer'
import ServicesPage from '../components/ServicesPage'
import AdminLayout from "../layouts/Admin.jsx";
import UpcomingRides from '../components/UpcomingRides';
import PastRides from '../components/PastRides';

import "bootstrap/dist/css/bootstrap.min.css";



class AppRouter extends React.Component {


    render() {

        const user = JSON.parse(localStorage.getItem('user'))
        const admin = JSON.parse(localStorage.getItem('admin'))
        return (
            <BrowserRouter>
                {user && user.loggedIn ? <Header1 /> : <Header />}
                <Switch>
                    <Route path="/" component={WelcomePage} exact />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/adminLogin" component={AdminLoginPage} />
                    <Route path="/forgotpassword" component={ForgotPassword} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/dashboard/:id" component={DashboardPage} />
                    <Route path="/contact" component={SupportPage} />
                    <Route path="/myProfile/:id" component={MyProfile} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/services" component={ServicesPage} />
                    <Route path="/admin" render={props => <AdminLayout {...props} />} />
                    <Route path="/upcomingrides" component={UpcomingRides} />
                    <Route path="/pastrides" component={PastRides} />
                    <Route component={NotFoundPage} />
                </Switch>

            </BrowserRouter >
        )
    }
}

const mapStateToProps = (state, props) => ({
    users: state.users
})

export default connect(mapStateToProps)(AppRouter)