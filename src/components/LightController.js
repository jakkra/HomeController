import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Col, Row, Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons'


import { Actions, DeviceTypes } from '../constants';
import { handleLightAction } from '../lib/ActionHandler';

const styles = {
  lightTypeText: {
    fontSize: '1.2em',
    color: '#294459',
  },
  brightnessText: {
    marginTop: 14,
  },
  brightnessSlider: {
    margin: 15,
  },
  wledUrlIcon: {
    color: '#8aaa91',
    fontSize: '1.6em',
  },
};


export default class LightController extends Component {

  static propTypes = {
    light: PropTypes.object,
  };

  constructor() {
    super();

    this.state = {
      hueBrightness: 255/2,
    }

    this.onBrightnessChange = this.onBrightnessChange.bind(this);
    this.renderBrightness = this.renderBrightness.bind(this);
  }

  renderControllerDependingOnLight(light) {
    switch (light.type) {
      case DeviceTypes.HUE:
        return this.renderHueLight(light);
      case DeviceTypes.WLED:
        return this.renderWledLight(light);
      case DeviceTypes.TASMOTA_OUTLET:
      case DeviceTypes.RF_OUTLET:
        return this.renderOnOff(light);
      default:
        return (<div>Not Implemented: {light.type}</div>);
    }
  }

  renderHueLight(light) {
    return (
      <div>
        {this.renderOnOff(light)}
        {this.renderBrightness(light)}
      </div>
      )
  }

  renderWledLight(light) {
    return (
      <div>
          {this.renderOnOff(light)}
          {this.renderBrightness(light)}
        <Row>
            {this.renderEffectsDropdown(light)}
            {this.renderWledWebpageButton(light)}
        </Row>
      </div>
      )
  }

  renderWledWebpageButton(light) {
    return  (
      <Button href={light.ip} bsStyle="link"><FontAwesomeIcon href={light.ip} icon={faExternalLinkAlt} style={styles.wledUrlIcon} /></Button>
      );
  }

  renderOnOff(light) {
    return (
      <div>
        <ButtonGroup justified>
          <Button href="#" bsStyle="success" onClick={() => this.handleControllerActionOnOff(light, true)} >ON</Button>
          <Button href="#" bsStyle="danger" onClick={() => this.handleControllerActionOnOff(light, false)} >OFF</Button>
        </ButtonGroup>
      </div>
    );
  }

  onBrightnessChange(value) {
    this.setState({ hueBrightness: value });
  }

  renderBrightness(light) {
    return(
      <div>
        <Col xs={2}>
          <div style={styles.brightnessText} >
            Brightness:
          </div>
        </Col>
        <Col xs={10}>
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
            trackStyle={{  height: 10 }}
            value={this.state.hueBrightness}
            onChange={this.onBrightnessChange}
            onAfterChange={() => this.handleControllerActionBrightness(light, this.state.hueBrightness)}
          />
        </Col>
      </div>
      )
  }

  renderEffectsDropdown(light) {
    return (
      <DropdownButton
        bsStyle="primary"
        title={"Select effect"}
        id="effectDropdown"
      >
        { colorEffects.map((effect, index) => <MenuItem onSelect={(id => this.handleControllerActionEffect(light, id)) } id={`dropdown-basic-${index}`} key={effect} eventKey={index}>{effect}</MenuItem>) }
      </DropdownButton>
    );
  }

  handleControllerActionOnOff(light, isOn) {
    handleLightAction(light, isOn ? Actions.ON : Actions.OFF)
    .then(console.log('Success'))
    .catch(err => console.log('Should display error to user', err));
  }

  handleControllerActionBrightness(light, brightness) {
    console.log(brightness)
    handleLightAction(light, Actions.BRIGHTNESS, { brightness: brightness })
    .then(console.log('Success'))
    .catch(err => console.log('Should display error to user', err));
  }

  handleControllerActionEffect(light, id) {
    console.log(id, light)
    handleLightAction(light, Actions.LIGHT_EFFECT, { effect: id })
    .then(console.log('Success'))
    .catch(err => console.log('Should display error to user', err));
  }

  render() {
    if (!this.props.light) return null;

    return (
      <div>
        <div style={styles.lightTypeText}>
          {this.props.light.name + ' ' + this.props.light.type}
        </div>
        {this.renderControllerDependingOnLight(this.props.light)}
      </div>
    )
  }
}

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
  "Double Scan",
  "Fade",
  "Chase",
  "Chase Rainbow",
  "Running",
  "Twinkle",
  "Twinkle Random",
  "Twinkle Fade",
  "Twinkle Random Fade",
  "Sparkle",
  "Dark Sparkle",
  "Dark Sparkle+",
  "Strobe",
  "Strobe Rainbow",
  "Double Strobe",
  "Blink Rainbow",
  "Android",
  "Dark Chase",
  "Dark Chase Random",
  "Dark Chase Rainbow",
  "Chase Flash",
  "Dark Chase Random_1",
  "Rainbow Runner",
  "Colorful",
  "Traffic Light",
  "Sweep Random",
  "Running 2",
  "Red & Blue",
  "Running 2 Random",
  "Scanner",
  "Lighthouse",
  "Fireworks",
  "Fireworks Random",
  "Merry Christmas",
  "Fire Flicker",
  "Gradient",
  "Loading",
  "In Out",
  "In In",
  "Out Out",
  "Out In",
  "Circus",
  "Halloween",
  "Tri Chase",
  "Tri Wipe",
  "Tri Fade",
  "Lightning",
  "ICU",
  "Multi Comet",
  "Dual Scanner",
  "Random Chase",
  "Oscillate",
  "Pride 2015",
  "Juggle",
  "Palette",
  "Fire 2012",
  "Colorwaves",
  "BPM",
  "Fill Noise 8",
  "Noise 16 1",
  "Noise 16 2",
  "Noise 16 3",
  "Noise 16 4",
  "Colortwinkle",
  "Lake"
]