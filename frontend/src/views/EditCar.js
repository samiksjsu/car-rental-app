import React from 'react'
import axios from 'axios'
import { Card } from "../components/Card/Card.jsx";
import url from "../GlobalVariables"
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import CarModal from "./CarModal"
toast.configure();

export default class EditCar extends React.Component {
    state = {
        states: [],
        selectedState: '',
        cities:undefined,
        selectedCity:'',
        garages:undefined,
        selectedGarage:'',
        cars:undefined,
        selectedCarForDisplay:undefined
    }

    async componentDidMount() {
        const states = await axios.get(url.module + '/getGarageStateForUser')
        console.log(states.data.data)
        this.setState(() => ({ states: states.data.data }))
    }

    onstateChange = async (e) => {
        const selectedState = e.target.value
        this.setState(()=>({selectedState,cities:undefined,garages:undefined}))
        const req = {
            g_state:selectedState
        }
        const cities = await axios.post(url.module+'/getCityFromState',req)
        this.setState(()=>({cities:cities.data.data}))
    }

    oncityChange = async(e) => {
        const selectedCity = e.target.value
        this.setState(()=>({selectedCity,garages:undefined}))
        const req = {
            g_state:this.state.selectedState,
            g_city:selectedCity
        }
        const garages = await axios.post(url.module+'/getGarageFromCity',req)
        this.setState(()=>({garages:garages.data.data}))
    }

    ongarageChange = async (e) => {
        const selectedGarage = e.target.value
        this.setState(()=>({selectedGarage}))
    }

    onGetCar = async (e) => {
        console.log(this.state.selectedGarage)
        const req = {
            c_location:this.state.selectedGarage
        }
        const cars = await axios.post(url.module+'/getallcarsforgarage',req)
        console.log(cars.data.data)
        this.setState(()=>({cars:cars.data.data}))
    }

    handleOnRowClick = async(car,e) => {
        console.log(car)
        const req = {
            c_registration_number:car.c_registration_number
        }
        const car_photo = await axios.post(url.module+'/getCarPhoto',req)
        
        car.image = car_photo.data
        this.setState(() => ({ selectedCarForDisplay: car }))
    }

    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedCarForDisplay: undefined }))
    }

    handleClearSelectedOptionUpdated = () => {
        this.setState(() => ({ selectedCarForDisplay: undefined }))
        window.location.reload()
    }

    render() {
        return (
            <div className="content">
                <Card
                    ctTableFullWidth=""
                    title="Edit Car"
                    content={
                        <div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Please select the state</label>
                                <select
                                    className="form-control"
                                    onChange={this.onstateChange}
                                    value={this.selectedState}

                                >
                                    <option selected disabled>Select State</option>
                                    {this.state.states.map((state) => (
                                        <option value={state.g_state} key={state.g_state}> {state.g_state}</option>
                                    ))}
                                </select>
                            </div>

                            {this.state.cities && 
                                <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Please select city</label>
                                <select
                                    className="form-control"
                                    onChange={this.oncityChange}
                                    value={this.selectedCity}

                                >
                                    <option selected disabled>Select City</option>
                                    {this.state.cities.map((city) => (
                                        <option value={city.g_city} key={city.g_city}> {city.g_city}</option>
                                    ))}
                                </select>
                            </div>
                            
                            }

                            {this.state.garages && 
                                <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Please select garage</label>
                                <select
                                    className="form-control"
                                    onChange={this.ongarageChange}
                                    value={this.selectedGarage}

                                >
                                    <option selected disabled>Select Garage</option>
                                    {this.state.garages.map((garage) => (
                                        <option value={garage.g_id} key={garage.g_id}> {garage.g_street+" "+garage.g_city+" "+garage.g_state+" "+garage.g_zip}</option>
                                    ))}
                                </select>
                            </div>
                            
                            }

                            {
                                this.state.garages && this.state.selectedGarage && 
                                <div className="buttondiv">
                                    <button name="button" type="submit" className="button2" value="update" onClick={this.onGetCar}>Get Cars</button>
                                </div>
                            }

                        </div>
                    }
                />

                {this.state.cars && 
                    <Card
                    ctTableFullWidth=""
                    title="Cars for selected Garage"
                    content={
                        <div>
                        <table>
                        <thead>
                            <tr>
                                <th>Car Model</th>
                                <th>Car Type</th>
                                <th>Registration</th>
                                <th>Seats</th>
                                <th>Last Serviced On</th>
                                <th>Condition</th>
                                <th>Manufacture Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cars.map((car, index) => (
                                <tr key={index} >
                                    <td onClick={this.handleOnRowClick.bind(this, car)}>
                                        {car.c_model}
                                    </td>
                                    <td onClick={this.handleOnRowClick.bind(this, car)}>
                                        {car.c_type}
                                    </td>
                                    <td onClick={this.handleOnRowClick.bind(this, car)}>
                                        {car.c_registration_number}
                                    </td>
                                    <td onClick={this.handleOnRowClick.bind(this, car)}>
                                        {car.c_number_of_seats}
                                    </td>
                                    <td onClick={this.handleOnRowClick.bind(this, car)}>
                                        {car.c_last_serviced}
                                    </td>
                                    <td onClick={this.handleOnRowClick.bind(this, car)}>
                                        {car.c_condition}
                                    </td>
                                    <td onClick={this.handleOnRowClick.bind(this, car)}>
                                        {car.c_manufacture_year}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                        </div>
                    }
                />

                
                }

                {!!this.state.selectedCarForDisplay &&
                    <CarModal
                        selectedOption={this.state.selectedCarForDisplay}
                        handleClearSelectedOption={this.handleClearSelectedOption}
                        handleClearSelectedOptionUpdated={this.handleClearSelectedOptionUpdated}
                        garages={this.state.garages}
                    ></CarModal>
                }
                
            </div>
        )
    }
}