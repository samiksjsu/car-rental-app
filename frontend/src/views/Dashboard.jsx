/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import axios from 'axios'
import url from "../GlobalVariables"
import { Card } from "../components/Card/Card.jsx";
import { StatsCard } from "../components/StatsCard/StatsCard.jsx";
import { Tasks } from "../components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "../variables/Variables.jsx";
import Axios from "axios";

class Dashboard extends Component {
  state={
    dataCarTypes:undefined,
    revenue:undefined,
    numberOfUsers:undefined,
    garagecapacity:undefined
  }
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  async componentDidMount(){
    const cartypesdata = await axios.get(url.module+'/getcartypesdata')
    
    const labels=[]
    const series=[]
    
    for(let i=0;i<cartypesdata.data.data[0].length;i++){
      labels.push(cartypesdata.data.data[0][i].count + " "+ cartypesdata.data.data[0][i].c_type)
      series.push(cartypesdata.data.data[0][i].count)
    }

    const dataCarTypes={
      labels:labels,
      series:series
    } 

    const revenue = await axios.get(url.module+'/getrevenue')
    
    const numberOfUsers = await axios.get(url.module+'/getnumberofusersfordashboard')
    const garagedata = await axios.get(url.module+'/getgarageandcapacity')
    

    let labels2=[]
    let series2=[]
    for(let i=0;i<garagedata.data.data[0].length;i++){
      labels2.push(garagedata.data.data[0][i].g_id)
      series2.push(garagedata.data.data[0][i].g_capacity)
    }

    const garagecapacity={
      labels:labels2,
      series:[series2]
    }

    this.setState(()=>({dataCarTypes,garagecapacity,revenue:revenue.data.data[0][0].sum,numberOfUsers:numberOfUsers.data.data[0][0].count}))
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
           
            {this.state.revenue && <Col lg={6} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-wallet text-success" />}
              statsText="Revenue"
              statsValue={'$'+this.state.revenue}
              statsIcon={<i className="fa fa-calendar-o" />}
              statsIconText="Updated Now"
            />
          </Col>}
            
            
            {this.state.numberOfUsers &&  <Col lg={6} sm={6}>
            <StatsCard
              bigIcon={<i className="fa fa-twitter text-info" />}
              statsText="Number of users"
              statsValue={this.state.numberOfUsers}
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText="Updated now"
            />
          </Col>}
           
          </Row>
          <Row>
          <Col md={8}>
          {this.state.garagecapacity && 
            <Card
            id="chartActivity"
            title="Garage Capacity per garage ID"
            category="This block includes all available garages"
            stats="Garage Capacity"
            statsIcon="fa fa-check"
            content={
              <div className="ct-chart">
                <ChartistGraph
                  data={this.state.garagecapacity}
                  type="Bar"
                  options={optionsBar}
                  responsiveOptions={responsiveBar}
                />
              </div>
            }
            legend={
              <div className="legend">{this.createLegend(legendBar)}</div>
            }
          />}
          
        </Col>

        
     
                {this.state.dataCarTypes && <Col md={4}>
                <Card
                  statsIcon="fa fa-clock-o"
                  title="Car Type Statistics"
                  category="Number of cars per car type"
                  stats="Latest data"
                  content={
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                      <ChartistGraph data={this.state.dataCarTypes} type="Pie" />
                    </div>
                  }
                  legend={
                    <div className="legend">Car Types Distribution</div>
                  }
                />
              </Col>
            
            
              }
            </Row>

          <Row>
             </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
