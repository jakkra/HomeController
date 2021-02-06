import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { renderTimelapse } from '../lib/fetch';

const styles = {
  container: {
  },
  listName: {
    color: '#294459',
    fontSize: '1.4em',
    textAlign: 'left',
  },
  listItem: {
    color: '#294459',
    fontSize: '1.2em',
    textAlign: 'left',
  },
  notAvailibleText: {
    color: '#294459',
    fontSize: '1.8em',
    textAlign: 'center',
  },
  icon: {
    color: '#294459',
    marginLeft: 15,
    fontSize: '0.9em',
  },
  taskInput : {
    textAlign: 'center',
  },
  videoFeed: {
    maxWidth: '100%',
    maxHeight: '100%',
    marginTop: 10,
    marginRight: 0
  },
};

export default class TimelapsePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timelapseLength: 25,
      showVideo: false
    };
    this.setTimelapseLength = this.setTimelapseLength.bind(this);
    this.onLengthSelected = this.onLengthSelected.bind(this);
    this.onPlayTimelapse = this.onPlayTimelapse.bind(this);
  }

  setTimelapseLength(input) {
    this.setState({
      timelapseLength: input.target.value,
    });
  }

  onLengthSelected() {
    renderTimelapse(this.state.timelapseLength)
    .then(() => toast.success('Rendering timelapse, will take a few minutes...'))
    .catch(err => console.log(err));
  }

  onPlayTimelapse() {
    this.setState({showVideo: true})
  }

  renderVideoRenderButtonAndInput() {
    return (
      <div>
        <Form style={styles.taskInput}>
          <FormControl
            bsSize="large"
            onChange={this.setTimelapseLength}
            value={this.state.timelapseLength}
          />
          <Button block  bsStyle="primary" onClick={this.onLengthSelected}>
            Render new timelapse
          </Button>
          <Button block  bsStyle="primary" onClick={this.onPlayTimelapse}>
            <FontAwesomeIcon icon={faPlay} />
          </Button>
        </Form>
      </div>
    );
  }

  renderVideoPlayer() {
    return (<video controls muted style={styles.videoFeed}>
      <source src="http://192.168.1.98:3001/api/timelapse/?length=3" type="video/mp4"></source>
    </video>);
  }


  render() {
    return (
      <Row md={12} style={styles.container}>
        <Col md={2}>
          {this.renderVideoRenderButtonAndInput()}
        </Col>
        <Col md={10}>
          {this.state.showVideo ? this.renderVideoPlayer() : null}
        </Col>
      </Row>
    );
  }
}