import React from 'react'

export default class SupportPage extends React.Component {

    state = {
        fullName: '',
        email: '',
        website: '',
        subject: '',
        message: ''
    }

    handleFullNameChange = (e) => {
        const fullName = e.target.value
        this.setState(() => ({ fullName }))
    }

    handleEmailChange = (e) => {
        const email = e.target.value
        this.setState(() => ({ email }))
    }

    handleWebsiteChange = (e) => {
        const website = e.target.value
        this.setState(() => ({ website }))
    }

    handleSubjectChange = (e) => {
        const subject = e.target.value
        this.setState(() => ({ subject }))
    }

    handleMessageChange = (e) => {
        const message = e.target.value
        this.setState(() => ({ message }))
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
                <section id="page-title-area" className="section-padding overlay">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title  text-center">
                                    <h2>Support</h2>
                                    <span className="title-line"><i className="fa fa-car"></i></span>
                                    <p>Get your queries resolved within 24HRS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="contact-page-wrao section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="contact-form">
                                    <form action="index.html">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="name-input">
                                                    <input
                                                        type="text"
                                                        placeholder="Full Name"
                                                        value={this.state.fullName}
                                                        onChange={this.handleFullNameChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="email-input">
                                                    <input
                                                        type="email"
                                                        placeholder="Email Address"
                                                        value={this.state.email}
                                                        onChange={this.handleEmailChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="website-input">
                                                    <input
                                                        type="url"
                                                        placeholder="Website"
                                                        value={this.state.website}
                                                        onChange={this.handleWebsiteChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="subject-input">
                                                    <input
                                                        type="text"
                                                        placeholder="Subject"
                                                        value={this.state.subject}
                                                        onChange={this.handleSubjectChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="message-input">
                                            <textarea
                                                name="review"
                                                cols="30"
                                                rows="10"
                                                placeholder="Message"
                                                value={this.state.message}
                                                onChange={this.handleMessageChange}
                                            ></textarea>
                                        </div>

                                        <div className="input-submit">
                                            <button type="submit">Submit Message</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}