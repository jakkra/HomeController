import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Row, Button, ButtonGroup } from 'react-bootstrap';

const styles = {
  lightButton: {
    margin: 4,
  }
}

export default class LightSelector extends Component {

  static propTypes = {
    onSelected: PropTypes.func,
    lightGroups: PropTypes.array,
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
    return (<Button key={light.id} bsSize="large" style={styles.lightButton} href="#" bsStyle="info" onClick={() => this.onButtonClicked(light)} >{light.name}</Button>);
  }


  render() {
    if (!this.props.lightGroups || this.props.lightGroups.length === 0) return null;
    return (
      <div>
        {this.props.lightGroups.map((group) => {
          return(
            <ButtonGroup key={group.groupName} justified>
              {group.groupName}
              <Row md={4}>
                {group.lights.map((light) => this.renderButton(light))}
              </Row>
            </ButtonGroup>
          );
        })}
      </div>
    );
  }
}