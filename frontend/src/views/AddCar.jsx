import React, { Component } from "react";

import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "../components/Card/Card.jsx";
import "../assets/css/test.css";
import ImageUploader from "react-images-upload"
import axios from 'axios'
import url from "../GlobalVariables"
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
toast.configure();

class AddCar extends React.Component {

  state = {
    carName: '',
    carType: '',
    pictures: [],
    c_registration_number: '',
    c_last_serviced: '',
    c_number_of_seats: '',
    c_manufacture_year: '',
    c_mileage: '',
    c_condition: '',
    cartypes: [],
    selectedcartype: '',
    garagecities: [],
    selectedgaragecity: undefined,
    garages: undefined,
    selectedgarage: '',
    feature1: '',
    feature2: '',
    feature3: '',
    carphoto: React.createRef()
  }

  async componentDidMount() {
    const cartypes = await axios.get(url.module + '/getcartypenames')
    console.log(cartypes.data.data)
    this.setState(() => ({ cartypes: cartypes.data.data }))

    const garagecities = await axios.get(url.module + '/getgaragecity')
    this.setState(() => ({ garagecities: garagecities.data.data }))
    console.log(garagecities.data.data)

  }

  onc_registration_numberChange = (e) => {
    const c_registration_number = e.target.value
    this.setState(() => ({ c_registration_number }))
  }

  onc_modelChange = (e) => {
    const c_model = e.target.value
    this.setState(() => ({ c_model }))
  }

  onc_last_servicedChange = (e) => {
    const c_last_serviced = e.target.value
    this.setState(() => ({ c_last_serviced }))
  }

  onc_number_of_seatsChange = (e) => {
    const c_number_of_seats = e.target.value
    this.setState(() => ({ c_number_of_seats }))
  }

  onc_manufacture_yearChange = (e) => {
    const c_manufacture_year = e.target.value
    this.setState(() => ({ c_manufacture_year }))
  }

  onc_mileageChange = (e) => {
    const c_mileage = e.target.value
    this.setState(() => ({ c_mileage }))
  }

  onselectedcartypeChange = (e) => {
    const selectedcartype = e.target.value
    this.setState(() => ({ selectedcartype }))
  }

  onselectedgaragecityChange = async (e) => {
    const selectedgaragecity = e.target.value
    this.setState(() => ({ selectedgaragecity }))

    const req = {
      g_city: selectedgaragecity
    }

    const garages = await axios.post(url.module + '/getavailablegarage', req)
    console.log(garages.data.data)
    this.setState(() => ({ garages: undefined }))
    this.setState(() => ({ selectedgarage: '', garages: garages.data.data }))

  }

  onselectedgarageChange = async (e) => {
    const selectedgarage = e.target.value
    this.setState(() => ({ selectedgarage }))
  }

  onfeature1Change = (e) => {
    const feature1 = e.target.value
    this.setState(() => ({ feature1 }))
  }

  onfeature2Change = (e) => {
    const feature2 = e.target.value
    this.setState(() => ({ feature2 }))
  }

  onfeature3Change = (e) => {
    const feature3 = e.target.value
    this.setState(() => ({ feature3 }))
  }

  onc_conditionChange = (e) => {
    const c_condition = e.target.value
    this.setState(() => ({ c_condition }))
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const carphoto = this.state.carphoto.current !== null ? this.state.carphoto.current.files[0] : ''
    const req = {
      c_registration_number: this.state.c_registration_number,
      c_last_serviced: this.state.c_last_serviced,
      c_number_of_seats: this.state.c_number_of_seats,
      c_manufacture_year: this.state.c_manufacture_year,
      c_mileage: this.state.c_mileage,
      c_model: this.state.c_model,
      c_type: this.state.selectedcartype,
      c_condition: this.state.c_condition,
      c_location: this.state.selectedgarage,
      feature1: this.state.feature1,
      feature2: this.state.feature2,
      feature3: this.state.feature3
    }

    console.log(carphoto)

    const formData = new FormData();
    formData.append('Carphoto', carphoto);
    formData.append('details', JSON.stringify(req))
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    const res = await axios.post(url.module + '/addcar', formData, config)
    console.log(res)
    if (res.data.flag === 'S') {
      toast('The car is added successfully', { type: 'success' })
      this.setState(() => ({
        c_registration_number: '',
        c_last_serviced: '',
        c_number_of_seats: '',
        c_manufacture_year: '',
        c_mileage: '',
        c_model: '',
        selectedcartype: '',
        c_condition: '',
        selectedgarage: '',
        feature1: '',
        feature2: '',
        feature3: '',
        carphoto: React.createRef()
      }))
      window.location.reload()
    }

    if (res.data.flag === 'F') {
      toast(res.data.message, { type: 'error' })
      
    }

  }

  render() {
    return (

      <div className="content">
        <Card
          ctTableFullWidth=""
          title="Add Car"
          content={

            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col">
                  <label htmlFor="formGroupExampleInput">Car Registration Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Car Registration Number"
                    value={this.state.c_registration_number}
                    onChange={this.onc_registration_numberChange}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="formGroupExampleInput">Car MOdel</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Car Model"
                    value={this.state.c_model}
                    onChange={this.onc_modelChange}
                    required />
                </div>

              </div>

              <div className="row">
                <div className="col">
                  <label htmlFor="formGroupExampleInput">Total Number of seats</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter number of seats"
                    value={this.state.c_number_of_seats}
                    onChange={this.onc_number_of_seatsChange}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="formGroupExampleInput">Enter Car Manufacture Year</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter car manufacture year"
                    value={this.state.c_manufacture_year}
                    onChange={this.onc_manufacture_yearChange}
                    required />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label htmlFor="formGroupExampleInput">Last Serviced Date</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter last serviced date"
                    value={this.state.c_last_serviced}
                    onChange={this.onc_last_servicedChange}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="formGroupExampleInput">Car Mileage</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter mileage"
                    value={this.state.c_mileage}
                    onChange={this.onc_mileageChange}
                    required />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label htmlFor="formGroupExampleInput">Car Type</label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onChange={this.onselectedcartypeChange}
                    value={this.selectedcartype}
                  >
                    <option selected disabled>Select Car Type</option>
                    {this.state.cartypes.map((cartype) => (
                      <option value={cartype.vt_name} key={cartype.vt_name}> {cartype.vt_name}</option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="formGroupExampleInput">Assign car to garage</label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onChange={this.onselectedgaragecityChange}
                    value={this.selectedgaragecity}
                  >
                    <option selected disabled>Select city</option>
                    {this.state.garagecities.map((city) => (
                      <option value={city.g_city} key={city.g_city}> {city.g_city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {this.state.garages && <div className="form-group">
                <label htmlFor="exampleInputPassword1">Select Garage</label>

                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={this.onselectedgarageChange}
                  value={this.selectedgarage}
                >
                  <option selected disabled>Select city</option>
                  {this.state.garages.map((garage) => (
                    <option value={garage.g_id} key={garage.g_name + "_" + garage.g_street + "_" + garage.g_city + "_" + garage.g_state + "_" + garage.g_zip}> {garage.g_name + "_" + garage.g_street + "_" + garage.g_city + "_" + garage.g_state + "_" + garage.g_zip}</option>
                  ))}
                </select>
              </div>}

              <div className="row">
                <div className="col">
                  <label htmlFor="formGroupExampleInput">Car feature 1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter cars first feature"
                    value={this.state.feature1}
                    onChange={this.onfeature1Change}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="formGroupExampleInput">Car feature 2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter cars second feature"
                    value={this.state.feature2}
                    onChange={this.onfeature2Change}
                    required />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label htmlFor="formGroupExampleInput">Car feature 3</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter cars third feature"
                    value={this.state.feature3}
                    onChange={this.onfeature3Change}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="formGroupExampleInput">Car Condition</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter cars condition"
                    value={this.state.c_condition}
                    onChange={this.onc_conditionChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Upload Car Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Upload Car Image"
                  value={this.state.carphoto ? this.state.carphoto.name : ''}
                  ref={this.state.carphoto}
                  onChange={()=>{}} />
              </div>


              <br />
              <div className="buttondiv">
                <button type="submit" className="button">Submit</button>
              </div>
            </form>

          }
        />
      </div>
    );
  }
}

export default AddCar;
