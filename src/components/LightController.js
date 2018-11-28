import React, {Component} from 'react';

import { Col, Row, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faPlug, faBars } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from 'react-toastify';

import LightSelector from './LightSelector'
import Remote from './Remote'

const styles = {
  title: {
    fontSize: '2em',
    color: '#294459'
  },
  controller: {

  },
  icon: {
    color: 'white',
    fontSize: '1.5em',
  },
};

const lampsLekrum =
[{
  name: "Falcon",
  id: 1,
  type: 'switch',
  ip: 'http://192.168.1.33',
},
{
  name: "Ljusstake",
  id: 2,
  type: 'switch',
  ip: 'http://192.168.1.251',
},
{
  name: "Skrivare",
  id: 3,
  type: 'switch',
  ip: 'http://192.168.1.196',
},
{
  name: "Skrivbord",
  id: 4,
  type: 'switch',
  ip: 'http://192.168.1.66',
}]

export default class LightController extends Component {
  constructor() {
    super();

    this.state = {
      selectedLamp: null
    }

    this.onLampSelected = this.onLampSelected.bind(this);
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    
  }

  renderRoomTitle(roomName) {
    return (<div style={styles.title}>{roomName}</div>);
  }

  onLampSelected(lamp) {
    this.setState({ selectedLamp: lamp });
  }

  render() {
    return (
      <div className="controller">
        <ToastContainer autoClose={3000} position="top-center" closeOnClick/>
        <Col style={styles.controller} md={4}>
          {this.renderRoomTitle('Controller')}
          <Remote light={this.state.selectedLamp}/>
        </Col>
        <Col md={4}>
          {this.renderRoomTitle('Lekrum')}
          <LightSelector lamps={lampsLekrum} onSelected={this.onLampSelected}/>
        </Col>
        <Col md={4}>
          {this.renderRoomTitle('Vardagsrum')}
        </Col>
        <Col md={4}>
          {this.renderRoomTitle('Sovrum')}
        </Col>
      </div>
    );
  }
}


