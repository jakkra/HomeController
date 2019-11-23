import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Button, ButtonGroup } from 'react-bootstrap';
import { DeviceTypes } from '../constants';

const styles = {
  deviceButton: {
    margin: 4,
  },
};

export default class DeviceSelector extends Component {
  static propTypes = {
    onDeviceSelected: PropTypes.func,
    onGroupSelected: PropTypes.func,
    deviceGroups: PropTypes.array,
  };

  constructor() {
    super();

    this.state = {
      selecteddevice: null,
    };

    this.onDeviceClicked = this.onDeviceClicked.bind(this);
    this.renderAllbutton = this.renderAllbutton.bind(this);
  }

  onDeviceClicked(device) {
    this.setState({
      selecteddevice: device,
    });
    this.props.onDeviceSelected(device);
  }

  renderDeviceButton(device) {
    let bsStyle = 'primary';
    let overrideStyle = styles.deviceButton;

    switch (device.type) {
      case DeviceTypes.HUE:
        bsStyle = 'info';
        break;
      case DeviceTypes.WLED:
        bsStyle = 'primary';
        break;
      case DeviceTypes.TASMOTA_OUTLET:
        bsStyle = 'success';
        break;
      case DeviceTypes.RF_OUTLET:
        bsStyle = 'success';
        break;
      default:
        bsStyle = 'primary';
        break;
    }

    if (device.color) {
      bsStyle = 'default';
      overrideStyle = {...styles.deviceButton,  backgroundColor: device.color, color: 'white'};
    }

    return (
      <Button
        key={device.id}
        style={overrideStyle}
        href="#"
        bsStyle={bsStyle}
        onClick={() => this.onDeviceClicked(device)}>
        {device.name}
      </Button>
    );
  }

  renderAllbutton(group) {
    if (group.devices.length > 1) {
      return (
        <Button
          key={group.name}
          style={styles.deviceButton}
          href="#"
          bsStyle="warning"
          onClick={() => this.props.onGroupSelected(group)}>
          Alla
        </Button>
      );
    } else {
      return null;
    }
  }

  render() {
    if (!this.props.deviceGroups || this.props.deviceGroups.length === 0) return null;
    return (
      <div>
        {this.props.deviceGroups.map(group => {
          return (
            <ButtonGroup key={group.groupName} justified>
              {group.groupName}
              <Row md={4}>
                {this.renderAllbutton(group)}
                {group.devices.map(device => this.renderDeviceButton(device))}
              </Row>
            </ButtonGroup>
          );
        })}
      </div>
    );
  }
}
