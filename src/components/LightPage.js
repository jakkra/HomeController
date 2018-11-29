import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Col} from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import LightSelector from './LightSelector'
import LightController from './LightController'

const styles = {
  title: {
    fontSize: '2em',
    color: '#294459',
    marginBottom: '5%'
  },
};

export default class LightPage extends Component {

  static propTypes = {
    rooms: PropTypes.array,
  };

  constructor() {
    super();

    this.state = {
      selectedLight: null
    }

    this.onLightSelected = this.onLightSelected.bind(this);
  }

  componentDidMount() {
    if (this.props.rooms && this.props.rooms[0] && this.props.rooms[0].lights && this.props.rooms[0].lights[0]) {
      this.setState({selectedLight: this.props.rooms[0].lights[0]});
    }
  }

  renderRoomTitle(roomName) {
    return (<div style={styles.title}>{roomName}</div>);
  }

  onLightSelected(light) {
    this.setState({ selectedLight: light });
  }

  renderRoom(room) {
    return (
      <Col md={6} key={room.name} >
        {this.renderRoomTitle(room.name)}
        <LightSelector lights={room.lights} onSelected={this.onLightSelected}/>
      </Col>
      )
  }

  render() {
    return (
      <div className="controller">
        <ToastContainer autoClose={3000} position="top-center" closeOnClick/>
        <Col md={4}>
          {this.renderRoomTitle('Controller')}
          <LightController light={this.state.selectedLight}/>
        </Col>
        <Col md={8}>
          {this.props.rooms.map((room) => this.renderRoom(room))}
        </Col>
      </div>
    );
  }
}


