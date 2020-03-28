import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col,
  Jumbotron,
  InputGroup,
  Input,
  Button,
  InputGroupAddon,
  FormGroup
} from "reactstrap"
import Weather from "./Weather"

class App extends Component{

  constructor(props) {
    super(props)
  
    this.state = {
        weather: null,
        cityList:[],
        newCityName:""
    }
  }
  
  getCityList = ()=>{
    fetch("/api/cities")
    .then(res=> res.json())
    .then(res => {
      var cityList = res.map(r => r.city_name)
      this.setState({cityList})
    })
  }

  handleInputChange = (e)=>{
    this.setState({newCityName:e.target.value})
  }

  handleAddCity = ()=>{
    fetch("/api/cities",{
      method: "post",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({city: this.state.newCityName})
    })
    .then(res => res.json())
    .then(res => {
      this.getCityList();
      this.setState({newCityName: ""})
    })
  }

  geatWeather = (city)=>{
    fetch(`api/weather/${city}`)
    .then(res => res.json())
    .then(weather => {
      console.log(weather)
      this.setState({weather})
    })
  }
  handleChangeCity = (e)=>{
    this.geatWeather(e.target.value)
  }
  componentDidMount(){
    this.getCityList();
  }

  render(){
    return(
    <Container>
      <Navbar dark color="dark">
        <NavbarBrand href="/"> MyWeather</NavbarBrand>
      </Navbar>
      <Row>
        <Col>
          <Jumbotron className="centered">
            <h1 className= "display-3">MyWeather</h1>
            <p className="lead">The current weather from your favourite cities!</p>
          
            <InputGroup>
            <Input
              placeholder="New city name..."
              value = {this.state.newCityName}
              onChange={this.handleInputChange}
            />
            <InputGroupAddon>
              <Button color="primary" onClick={this.handleAddCity}>Add City</Button>
            </InputGroupAddon>
            
          </InputGroup>
          </Jumbotron>
         
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="display-5 centered">Current Weather</h1>
          <FormGroup>
            <Input type="select" onChange={this.handleChangeCity}>
              { this.state.cityList.length === 0 && <option>No cities added yet</option>}
              {this.state.cityList.length > 0 && <option>Select a city</option>}
              {this.state.cityList.map((city, i)=><option key={i}>{city}</option>)}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Weather data = {this.state.weather}/>
    </Container>

      )
  }
}

export default App;
