import React, {Component} from "react";
import './App.css'
import Button from "react-bootstrap/lib/Button";
import Jumbotron from "react-bootstrap/lib/Jumbotron";
import Navbar from "react-bootstrap/lib/Navbar";
import FormGroup from "react-bootstrap/lib/FormGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import NavItem from "react-bootstrap/lib/NavItem";
import LocationList from "./LocationList";
import Nav from "react-bootstrap/lib/Nav";
import geocoding from 'reverse-geocoding';

class App extends Component {

  componentDidMount() {
    this.setState({'lat': 1, 'lon': 1});
  }

  render() {
    return (
      <div className="App">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React-Bootstrap</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">Home</NavItem>
            <NavItem eventKey={2} href="#">About</NavItem>
          </Nav>
          <Navbar.Collapse>
            <Navbar.Form pullRight>
              <FormGroup>
                <FormControl type="text" placeholder="Search other location"/>
              </FormGroup> {'  ' }
              <Button type="submit">Search</Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        <Jumbotron className="jumbotron">
          <h1>Lillestrøm </h1>
          <p>9 day forecast for dark and clear skies in your area </p>
          <p><Button bsStyle="primary">Connect Alexa Skill</Button></p>
        </Jumbotron>
        <LocationList lat={this.props.lat} lon={this.props.lon}/>
      </div>
    );
  }
}
export default App;
