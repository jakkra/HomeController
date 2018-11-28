import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Col, Row, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faPlug, faBars } from '@fortawesome/free-solid-svg-icons'


const styles = {
  container: {
    marginTop: '20%'
  },
};

export default class Remote extends Component {

  static propTypes = {
    light: PropTypes.object,
  };

  constructor() {
    super();

    this.state = {
    }

    this.renderOnOffLight = this.renderOnOffLight.bind(this);
  }

  renderControllerDependingOnLight(light) {
    if (light.type === 'switch') {
      return this.renderOnOffLight(light);
    } else {
      return (<div>Not Implemented</div>)
    }
  }

  renderOnOffLight(light) {
    return (
      <ButtonGroup justified>
        <Button href="#" bsStyle="success" onClick={() => this.handleControllerActionOnOff(light, true)} >ON</Button>
        <Button href="#" bsStyle="danger" onClick={() => this.handleControllerActionOnOff(light, false)} >OFF</Button>
      </ButtonGroup>
    );
  }

  handleControllerActionOnOff(light, isOn) {
    console.log(light, isOn);
    const url = light.ip + '/win&T=' + (isOn ? '1' : '0');
    console.log('ip', url);

    fetch(url, { mode: 'no-cors' })
    .catch(err => console.log(err));
  }

  render() {
    if (!this.props.light) return null;

    return (
      <div style={styles.container}>
        {this.renderControllerDependingOnLight(this.props.light)}
      </div>
    )
  }
}