import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Col, Row, Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import { Actions, DeviceTypes } from '../constants';
import { handleDeviceAction } from '../lib/ActionHandler';

const styles = {
  deviceTypeText: {
    fontSize: '1.2em',
    color: '#294459',
  },
  brightnessText: {
    marginTop: 14,
    fontSize: '1.2em',
  },
  brightnessSlider: {
    margin: 15,
  },
  wledUrlIcon: {
    color: '#8aaa91',
    fontSize: '1.6em',
  },
};

export default class DeviceController extends Component {
  static propTypes = {
    device: PropTypes.object,
    group: PropTypes.object,
  };

  constructor() {
    super();

    this.state = {
      hueBrightness: 255 / 2,
    };

    this.onBrightnessChange = this.onBrightnessChange.bind(this);
    this.renderBrightness = this.renderBrightness.bind(this);
    this.renderGroupOnOff = this.renderGroupOnOff.bind(this);
  }

  renderControllerDependingOnDevice(device) {
    switch (device.type) {
      case DeviceTypes.HUE:
        return this.renderHueDevice(device);
      case DeviceTypes.WLED:
      case DeviceTypes.WLED_CUSTOM:
        return this.renderWledDevice(device);
      case DeviceTypes.TASMOTA_OUTLET:
      case DeviceTypes.RF_OUTLET:
        return this.renderOnOff(device);
      case DeviceTypes.HYPERION:
        return this.renderOnOff(device);
      case DeviceTypes.TOGGLE:
        return this.renderToggle(device);
      default:
        return <div>Not Implemented: {device.type}</div>;
    }
  }

  renderHueDevice(device) {
    return (
      <div>
        {this.renderOnOff(device)}
        {this.renderBrightness(device)}
      </div>
    );
  }

  renderWledDevice(device) {
    return (
      <div>
        {this.renderOnOff(device)}
        {this.renderBrightness(device)}
        <Row>
          {this.renderEffectsDropdown(device)}
          {this.renderWledWebpageButton(device)}
        </Row>
      </div>
    );
  }

  renderWledWebpageButton(device) {
    return (
      <Button href={device.ip} bsStyle="link">
        <FontAwesomeIcon href={device.ip} icon={faExternalLinkAlt} style={styles.wledUrlIcon} />
      </Button>
    );
  }

  renderGroupOnOff(group) {
    return (
      <div>
        <ButtonGroup justified>
          <Button
            href="#"
            bsStyle="success"
            onClick={() => group.devices.forEach(device => this.handleControllerActionOnOff(device, true))}>
            ON
          </Button>
          <Button
            href="#"
            bsStyle="danger"
            onClick={() => group.devices.forEach(device => this.handleControllerActionOnOff(device, false))}>
            OFF
          </Button>
        </ButtonGroup>
      </div>
    );
  }

  renderOnOff(device) {
    return (
      <div>
        <ButtonGroup justified>
          <Button href="#" bsStyle="success" onClick={() => this.handleControllerActionOnOff(device, true)}>
            ON
          </Button>
          <Button href="#" bsStyle="danger" onClick={() => this.handleControllerActionOnOff(device, false)}>
            OFF
          </Button>
        </ButtonGroup>
      </div>
    );
  }

  renderToggle(device) {
    return (
      <div>
        <ButtonGroup justified>
          <Button href="#" bsStyle="success" onClick={() => this.handleControllerActionToggle(device)}>
            TOGGLE
          </Button>
        </ButtonGroup>
      </div>
    );
  }

  onBrightnessChange(value) {
    this.setState({ hueBrightness: value });
  }

  renderBrightness(device) {
    return (
      <div>
        <Col xs={3}>
          <div style={styles.brightnessText}>Brightness</div>
        </Col>
        <Col xs={9}>
          <Slider
            style={styles.brightnessSlider}
            min={1}
            max={255}
            handleStyle={{
              height: 28,
              width: 28,
              marginLeft: -14,
              marginTop: -9,
            }}
            railStyle={{ height: 10 }}
            trackStyle={{ height: 10 }}
            value={this.state.hueBrightness}
            onChange={this.onBrightnessChange}
            onAfterChange={() => this.handleControllerActionBrightness(device, this.state.hueBrightness)}
          />
        </Col>
      </div>
    );
  }

  renderEffectsDropdown(device) {
    return (
      <DropdownButton bsStyle="primary" title={'Select effect'} id="effectDropdown">
        {colorEffects.map((effect, index) => (
          <MenuItem
            onSelect={id => this.handleControllerActionEffect(device, id)}
            id={`dropdown-basic-${index}`}
            key={effect}
            eventKey={index}>
            {effect}
          </MenuItem>
        ))}
      </DropdownButton>
    );
  }

  handleControllerActionOnOff(device, isOn) {
    handleDeviceAction(device, isOn ? Actions.ON : Actions.OFF)
      .then(console.log('Success'))
      .catch(err => console.log('Should display error to user', err));
  }

  handleControllerActionToggle(device) {
    handleDeviceAction(device, Actions.TOGGLE)
      .then(console.log('Success'))
      .catch(err => console.log('Should display error to user', err));
  }

  handleControllerActionBrightness(device, brightness) {
    handleDeviceAction(device, Actions.BRIGHTNESS, { brightness: brightness })
      .then(console.log('Success'))
      .catch(err => console.log('Should display error to user', err));
  }

  handleControllerActionEffect(device, id) {
    handleDeviceAction(device, Actions.LIGHT_EFFECT, { effect: id })
      .then(console.log('Success'))
      .catch(err => console.log('Should display error to user', err));
  }

  render() {
    if (!this.props.device && !this.props.group) return null;
    let controller = null;
    let description = null;

    if (this.props.device) {
      description = this.props.device.name;
      controller = this.renderControllerDependingOnDevice(this.props.device);
    } else if (this.props.group) {
      description = this.props.group.groupName;
      controller = this.renderGroupOnOff(this.props.group);
    }
    return (
      <div>
        <div style={styles.deviceTypeText}>{description}</div>
        {controller}
      </div>
    );
  }
}

// TODO can be fetched dynamic from ip/json
const colorEffects = [
  "Solid",
  "Blink",
  "Breathe",
  "Wipe",
  "Wipe Random",
  "Random Colors",
  "Sweep",
  "Dynamic",
  "Colorloop",
  "Rainbow",
  "Scan",
  "Scan Dual",
  "Fade",
  "Theater",
  "Theater Rainbow",
  "Running",
  "Saw",
  "Twinkle",
  "Dissolve",
  "Dissolve Rnd",
  "Sparkle",
  "Sparkle Dark",
  "Sparkle+",
  "Strobe",
  "Strobe Rainbow",
  "Strobe Mega",
  "Blink Rainbow",
  "Android",
  "Chase",
  "Chase Random",
  "Chase Rainbow",
  "Chase Flash",
  "Chase Flash Rnd",
  "Rainbow Runner",
  "Colorful",
  "Traffic Light",
  "Sweep Random",
  "Running 2",
  "Red & Blue",
  "Stream",
  "Scanner",
  "Lighthouse",
  "Fireworks",
  "Rain",
  "Merry Christmas",
  "Fire Flicker",
  "Gradient",
  "Loading",
  "Police",
  "Police All",
  "Two Dots",
  "Two Areas",
  "Circus",
  "Halloween",
  "Tri Chase",
  "Tri Wipe",
  "Tri Fade",
  "Lightning",
  "ICU",
  "Multi Comet",
  "Scanner Dual",
  "Stream 2",
  "Oscillate",
  "Pride 2015",
  "Juggle",
  "Palette",
  "Fire 2012",
  "Colorwaves",
  "Bpm",
  "Fill Noise",
  "Noise 1",
  "Noise 2",
  "Noise 3",
  "Noise 4",
  "Colortwinkles",
  "Lake",
  "Meteor",
  "Meteor Smooth",
  "Railway",
  "Ripple",
  "Twinklefox",
  "Twinklecat",
  "Halloween Eyes",
  "Solid Pattern",
  "Solid Pattern Tri",
  "Spots",
  "Spots Fade",
  "Glitter",
  "Candle",
  "Fireworks Starburst",
  "Fireworks 1D",
  "Bouncing Balls",
  "Sinelon",
  "Sinelon Dual",
  "Sinelon Rainbow",
  "Popcorn",
  "Drip",
  "Plasma",
  "Percent",
  "Ripple Rainbow",
  "Heartbeat",
  "Pacifica",
  "Candle Multi"
];
