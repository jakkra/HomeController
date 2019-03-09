import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Col, Row, Collapse} from 'react-bootstrap';
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
    this.renderRoomTitle = this.renderRoomTitle.bind(this);
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
    return (<div onClick={() => this.onRoomSelected(roomName)} style={styles.title}>{roomName}</div>);
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
    let newLight = this.state.selectedLight;

    if (room && room.groups[0] && room.groups[0].lights[0]) {
      newLight = room.groups[0].lights[0];
    }
    if (room) {
      this.setState({
        selectedRoom: room,
        selectedLight: newLight,
      });
    }
  }

  renderRoom(room) {
    return (
      <Col md={12} key={room.name} >
        {this.renderRoomTitle(room.name)}
        <Collapse in={this.state.selectedRoom.name === room.name}>
          <div>
            <LightSelector
              lightGroups={room.groups}
              onLightSelected={this.onLightSelected}
              onGroupSelected={this.onGroupSelected}
            />
          </div>
        </Collapse>
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
        <Col md={4}>
          <Row>
            {this.renderRoomTitle('Controller')}
          </Row>
          <Row>
            <LightController light={this.state.selectedLight} group={this.state.selectedGroup}/>
          </Row>
        </Col>
        {view}
      </div>
    );
  }
}


