import React from 'react';

import { Col, Row, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import { enableJoinZigbee } from '../lib/fetch';

const styles = {
  container: {},
  listTitle: {
    color: '#284257',
    fontSize: '2em',
    textAlign: 'left',
    marginBottom: 7,
  },
  taskText: {
    color: '#284257',
    fontSize: '1.3em',
    textAlign: 'left',
    paddingLeft: 15,
  },
  taskInput: {
    fontSize: '1.5em',
    marginBottom: 20,
  },
  button: {},
  buttonIcon: {
    color: 'white',
    fontSize: '1.8em',
  },
  icon: {
    color: '#284257',
    marginLeft: 15,
    fontSize: '0.9em',
  },
};

export default class ConfigPage extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {

    };

  }

  permitJoin() {
    enableJoinZigbee(120)
      .then(() => {
        toast.success('120s to jo join Zigbee network', { autoClose: 120 * 1000 });
      })
      .catch(err => {
        toast.error('Failed to permit join');
      });
  }


  renderButtons() {
    return (
      <div>
        <div style={styles.listTitle}>
          {'Zigbee Setup'}
        </div>
        <Form>
          <Button block style={styles.button} bsStyle="primary" onClick={this.permitJoin}>
            <FontAwesomeIcon icon={faLink} style={styles.buttonIcon} />
          </Button>
        </Form>
      </div>
    );
  }

  renderInput() {
    return null;
  }

  render() {
    return (
      <Row style={styles.container}>
        <Col md={4}>{this.renderButtons()}</Col>
        <Col md={4}>{this.renderInput()}</Col>
      </Row>
    );
  }
}
