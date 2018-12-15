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
      selectedGroup: null
    }

    this.onLightSelected = this.onLightSelected.bind(this);
    this.onGroupSelected = this.onGroupSelected.bind(this);
  }

  componentDidMount() {
    if (this.props.rooms && this.props.rooms[0] && this.props.rooms[0].groups && this.props.rooms[0].groups[0]) {
      this.setState({selectedLight: this.props.rooms[0].groups[0].lights[0]});
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

  renderRoom(room) {
    return (
      <Col md={6} key={room.name} >
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
    return (
      <div style={{height: '100%'}} className="controller">
        <ToastContainer autoClose={3000} position="top-center" closeOnClick/>
        <Col md={4}>
          {this.renderRoomTitle('Controller')}
          <LightController light={this.state.selectedLight} group={this.state.selectedGroup}/>
        </Col>
        <Col md={8}>
          {this.props.rooms.map((room) => this.renderRoom(room))}
        </Col>
      </div>
    );
  }
}


