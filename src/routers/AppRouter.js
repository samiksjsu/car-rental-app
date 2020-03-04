import React from 'react'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'


// Component Imports
import NotFoundPage from '../components/NotFoundPage'
import WelcomePage from '../components/WelcomePage'
import LoginPage from '../components/LoginPage'
import Header from '../components/Header'



export default class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" component={WelcomePage} exact={true} />
                    <Route path="/login" component={LoginPage} />
                </Switch>
            </BrowserRouter >
        )
    }
}