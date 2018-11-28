import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Col, Row, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faPlug, faBars } from '@fortawesome/free-solid-svg-icons'


const styles = {
  title: {
    fontSize: '2em',
    color: '#294459'
  },
  icon: {
    color: 'white',
    fontSize: '1.5em',
  },
};

export default class LightSelector extends Component {

  static propTypes = {
    onSelected: PropTypes.func,
    lamps: PropTypes.array,
  };

  constructor() {
    super();

    this.state = {
      selectedLamp: null,
    }

    this.onButtonClicked = this.onButtonClicked.bind(this);
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    
  }

  onButtonClicked(lamp) {
    this.setState({
      selectedLamp: lamp
    })
    this.props.onSelected(lamp);
  }

  renderButton(lamp) {
    let bsStyle = "info";
    
    if (this.state.selectedLamp && this.state.selectedLamp.id === lamp.id) {
      bsStyle = "success";
    }
    return (<Button key={lamp.id} href="#" bsStyle={bsStyle} onClick={() => this.onButtonClicked(lamp)} >{lamp.name}</Button>);
  }


  render() {
    if (!this.props.lamps || this.props.lamps.length === 0) return;

    return (
      <ButtonGroup justified>
        {this.props.lamps.map((lamp) => this.renderButton(lamp))}
      </ButtonGroup>
    )
  }
}