import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Button, ButtonGroup } from 'react-bootstrap';
import { DeviceTypes } from '../constants';

const styles = {
  lightButton: {
    margin: 4,
  },
};

export default class LightSelector extends Component {
  static propTypes = {
    onLightSelected: PropTypes.func,
    onGroupSelected: PropTypes.func,
    lightGroups: PropTypes.array,
  };

  constructor() {
    super();

    this.state = {
      selectedlight: null,
    };

    this.onLightClicked = this.onLightClicked.bind(this);
    this.renderAllbutton = this.renderAllbutton.bind(this);
  }

  onLightClicked(light) {
    this.setState({
      selectedlight: light,
    });
    this.props.onLightSelected(light);
  }

  renderLightButton(light) {
    let bsStyle = 'primary';

    switch (light.type) {
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

    return (
      <Button
        key={light.id}
        style={styles.lightButton}
        href="#"
        bsStyle={bsStyle}
        onClick={() => this.onLightClicked(light)}>
        {light.name}
      </Button>
    );
  }

  renderAllbutton(group) {
    if (group.lights.length > 1) {
      return (
        <Button
          key={group.name}
          style={styles.lightButton}
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
    if (!this.props.lightGroups || this.props.lightGroups.length === 0) return null;
    return (
      <div>
        {this.props.lightGroups.map(group => {
          return (
            <ButtonGroup key={group.groupName} justified>
              {group.groupName}
              <Row md={4}>
                {this.renderAllbutton(group)}
                {group.lights.map(light => this.renderLightButton(light))}
              </Row>
            </ButtonGroup>
          );
        })}
      </div>
    );
  }
}
