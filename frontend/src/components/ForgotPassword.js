import React from 'react'

export default class ForgotPassword extends React.Component {
    state = {
        userName: '',
        password: ''
    }

    onUserNameChange = (e) => {
        const userName = e.target.value
        this.setState(() => ({ userName }))
    }

    onPasswordChange = (e) => {
        const password = e.target.value
        this.setState(() => ({ password }))
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
    }

    componentWillMount() {

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
    }

    render() {
        return (
            <div>
                <section id="lgoin-page-wrap" className="section-padding">
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
                                                    placeholder="Email or Username"
                                                    value={this.state.userName}
                                                    onChange={this.onUserNameChange}
                                                />
                                            </div>
                                            <div className="log-btn">
                                                <button type="submit"><i className="fa fa-sign-in"></i> Send Password</button>
                                            
                                            </div>
                                        </form>
                                    </div>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}