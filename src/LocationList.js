import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {Link} from 'react-router'
import Moment from 'react-moment';
import Spinner from 'react-spinkit';
import  {ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, Legend} from 'recharts';

const data = [
  {name: 'Today', clouds: 4000, moonshine: 2400, amt: 2400},
  {name: 'Tuesday', clouds: 3000, moonshine: 1398, amt: 2210},
  {name: 'Wednesday', clouds: 2000, moonshine: 9800, amt: 2290},
  {name: 'Thursday', clouds: 2780, moonshine: 3908, amt: 2000},
  {name: 'Friday', clouds: 1890, moonshine: 4800, amt: 2181},
  {name: 'Saturday', clouds: 2390, moonshine: 3800, amt: 2500},
  {name: 'Sunday', clouds: 3490, moonshine: 4300, amt: 2100},
];

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
    console.log('lon lat props', this.props.lon, this.props.lat);
    navigator.geolocation.getCurrentPosition(position => {
      console.log('position', position);
      fetch(`https://s7heu2cj63.execute-api.eu-central-1.amazonaws.com/prod/astronomyforecast?lat=20&lon=160&timeZone=Etc/GMT-10`)
        .then(response => response.json().then(data => {
          console.log('data receoved ', data);
          this.setState({forecasts: data.horlyForecasts});
        }));
    });
  }

  render() {
    const forecasts = this.state.forecasts;
    return (
      forecasts ? (
        <Grid>
          <Row>
            {forecasts.map(forecast =>
              <Col xs={12} sm={6} lg={2}>
                <Panel>
                  <p>{padToTwo(forecast.startOfHour.date.day)}.{padToTwo(forecast.startOfHour.date.month)}.{padToTwo(forecast.startOfHour.date.year)}
                    @ {padToTwo(forecast.startOfHour.time.hour)}:{padToTwo(forecast.startOfHour.time.minute)}   </p>
                  <h1>{forecast.cloudyness.percentage} % clouds </h1>
                </Panel> </Col>)}</Row></Grid>) : <Spinner spinnerName='cube-grid'/>
    )
  }
}
export default LocationList;
