import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Col} from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { isMobile, isTablet } from "react-device-detect";

import LightSelector from './LightSelector'
import LightController from './LightController'
import RoomSelector from './RoomSelector'


const styles = {
  title: {
    fontSize: '2em',
    color: '#294459',
  },
};

export default class LightPage extends Component {

  static propTypes = {
    rooms: PropTypes.array,
  };

  constructor() {
    super();

    this.state = {
      selectedLight: null,
      selectedGroup: null,
      selectedRoom: null
    }

    this.onLightSelected = this.onLightSelected.bind(this);
    this.onGroupSelected = this.onGroupSelected.bind(this);
    this.onRoomSelected = this.onRoomSelected.bind(this);
  }

  componentDidMount() {
    if (this.props.rooms && this.props.rooms[0] && this.props.rooms[0].groups && this.props.rooms[0].groups[0]) {
      this.setState({ 
        selectedLight: this.props.rooms[0].groups[0].lights[0],
        selectedRoom: this.props && this.props.rooms ? this.props.rooms[0] : null,
      });
    }
  }

  renderRoomTitle(roomName) {
    return (<div style={styles.title}>{roomName}</div>);
  }

  onLightSelected(light) {
    this.setState({ selectedLight: light, selectedGroup: null });
  }

  onGroupSelected(group) {
    console.log(group);
    this.setState({ selectedLight: null, selectedGroup: group });
  }

  onRoomSelected(roomName) {
    const room = this.props.rooms.find(room => room.name === roomName);
    if (room) {
      this.setState({
        selectedRoom: room
      });
    }
  }

  renderRoom(room) {
    return (
      <Col md={12} key={room.name} >
        {this.renderRoomTitle(room.name)}
        <LightSelector
          lightGroups={room.groups}
          onLightSelected={this.onLightSelected}
          onGroupSelected={this.onGroupSelected}
        />
      </Col>
      )
  }

  render() {
    if (!this.state.selectedRoom) return null;
    let view = null;

    if (isMobile && !isTablet) {
      view = (
        <Col md={8}>
          {this.props.rooms.map((room) => this.renderRoom(room))}
        </Col>);
    } else {
      view = (
        <div>
          <Col md={4}>
            {this.renderRoom(this.state.selectedRoom)}
          </Col>
          <Col md={4}>
            <RoomSelector onGroupSelected={this.onRoomSelected}/>
          </Col>
        </div>
        );
    }

    return (
      <div style={{height: '100%'}} className="controller">
        <ToastContainer autoClose={3000} position="top-center" closeOnClick/>
        <Col md={4}>
          {this.renderRoomTitle('Controller')}
          <LightController light={this.state.selectedLight} group={this.state.selectedGroup}/>
        </Col>
        {view}
      </div>
    );
  }
}


