import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {Link} from 'react-router'
import Spinner from 'react-spinkit';
import {ResponsiveContainer, AreaChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const StackedAreaChart = ({data}) =>
  <ResponsiveContainer width={1000} height={450}>
    <AreaChart data={data} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
      <XAxis dataKey="name"/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Tooltip/>
      <Area type='monotone' dataKey='high' stackId="1" stroke='#C0C0FF' fill='#C0C0FF'/>
      <Area type='monotone' dataKey='medium' stackId="2" stroke='#B0B0FF' fill='#B0B0FF'/>
      <Area type='monotone' dataKey='low' stackId="3" stroke='#A0A0FF' fill='#A0A0FF'/>
      <Legend />
    </AreaChart>
  </ResponsiveContainer>;


function padToTwo(number) {
  if (number < 99) {
    number = ("0" + number).slice(-2);
  }
  return number;
}

class LocationList extends Component {

  constructor(props) {
    super(props);
    this.state = {forecasts: null}
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      fetch(`https://s7heu2cj63.execute-api.eu-central-1.amazonaws.com/prod/astronomyforecast?lat=20&lon=160&timeZone=Etc/GMT-10`)
        .then(response => response.json().then(data => {
          this.setState({forecasts: data.horlyForecasts});
        }));
    });
  }

  render() {
    const forecasts = this.state.forecasts;
    if (!forecasts) {
      return (<Grid><Row><Col lg={12} xs={12}><Spinner spinnerName='cube-grid'/></Col></Row></Grid>);
    } else {
      const mapped = [];
      forecasts.forEach(forecast => mapped.push({
        name: forecast.forecastFrom,
        high: forecast.highClouds.percentage,
        medium: forecast.mediumClouds.percentage,
        low: forecast.lowClouds.percentage
      }));

      return (
        <Grid>
          <Row>
            <Col xs={12} sm={12} lg={12}>
              <h1>Cloudyness</h1>
              <p> Coverage % of high medium and low clouds over the next coming days </p>
              <Panel>
                <StackedAreaChart id='container' data={mapped}/>
              </Panel>
            </Col>
          </Row>
          <Row>
            {forecasts.filter(forecast => forecast.cloudyness.percentage < 10).map(forecast =>
              <Col xs={12} sm={6} lg={4}>
                <Panel>
                  <p>{forecast.forecastFrom}</p>
                  <h1>{forecast.cloudyness.percentage} % clouds </h1>
                  <p>Dewpoint at {forecast.dewPoint} {forecast.dewPointUnit}</p>
                </Panel> </Col>)}</Row></Grid>
      )
    }
  }
}


export default LocationList;
