import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Button, ButtonGroup } from 'react-bootstrap';

import { Actions, DeviceTypes } from '../constants';
import { handleLightAction } from '../lib/ActionHandler';

const styles = {
  lightTypeText: {
    fontSize: '1.2em',
    color: '#294459',
  },
};


export default class LightController extends Component {

  static propTypes = {
    light: PropTypes.object,
  };

  renderControllerDependingOnLight(light) {
    switch (light.type) {
      case DeviceTypes.WLED:
      case DeviceTypes.HUE:
      case DeviceTypes.TASMOTA_OUTLET:
      case DeviceTypes.RF_OUTLET:
        return this.renderOnOffLight(light);
      default:
        return (<div>Not Implemented: {light.type}</div>);
    }
  }

  renderOnOffLight(light) {
    return (
      <div>
        <ButtonGroup justified>
          <Button href="#" bsStyle="success" onClick={() => this.handleControllerActionOnOff(light, true)} >ON</Button>
          <Button href="#" bsStyle="danger" onClick={() => this.handleControllerActionOnOff(light, false)} >OFF</Button>
        </ButtonGroup>
        <div style={styles.lightTypeText}>
          {light.type}
        </div>
      </div>
    );
  }

  handleControllerActionOnOff(light, isOn) {
    handleLightAction(light, isOn ? Actions.ON : Actions.OFF)
    .then(console.log('Success'))
    .catch(err => console.log('Should display error to user', err));
  }

  render() {
    if (!this.props.light) return null;

    return (
      <div>
        {this.renderControllerDependingOnLight(this.props.light)}
      </div>
    )
  }
}