import React from 'react'
import { Card } from "../components/Card/Card.jsx";
import axios from 'axios'
import url from "../GlobalVariables"
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import SingleUSerRequest from './SingleUserRequest'
toast.configure();

export default class AddUser extends React.Component{


    state = {
        users:undefined,
        image:''
    }
    
    async componentDidMount() {

        

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

        const users = await axios.post(url.module+'/getrequestedusers')
        
        this.setState(()=>({
            users:users.data.data,
            
        }))
    

    }

    render(){
        return(
            <div className="content">
            <Card
            ctTableFullWidth=""
            title="Approve/Reject Users Request"
            content={
                
                    <div>
                    

                    {
                        this.state.users && this.state.users.map((user)=>(
                            <SingleUSerRequest key={user.u_driver_license}{...user} />
                        ))

                    }
               
                    </div>
            }
            />

            </div>
        )
    }
}