import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Button, ButtonGroup } from 'react-bootstrap';


export default class LightSelector extends Component {

  static propTypes = {
    onSelected: PropTypes.func,
    lights: PropTypes.array,
  };

  constructor() {
    super();

    this.state = {
      selectedlight: null,
    }

    this.onButtonClicked = this.onButtonClicked.bind(this);
  }

  onButtonClicked(light) {
    this.setState({
      selectedlight: light
    })
    this.props.onSelected(light);
  }

  renderButton(light) {
    return (<Button key={light.id} href="#" bsStyle="info" onClick={() => this.onButtonClicked(light)} >{light.name}</Button>);
  }


  render() {
    if (!this.props.lights || this.props.lights.length === 0) return null;

    return (
      <ButtonGroup justified>
        {this.props.lights.map((light) => this.renderButton(light))}
      </ButtonGroup>
    )
  }
}