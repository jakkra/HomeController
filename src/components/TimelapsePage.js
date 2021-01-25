import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, FormControl, Button } from 'react-bootstrap';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
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
    width: '20%',
    textAlign: 'center',
  },
  videoFeed: {
    maxWidth: '50%',
    maxHeight: '50%',
    marginTop: 10,
    marginRight: 0
  },
};

export default class TimelapsePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timelapseLength: 3,
      showVideo: false
    };
    this.setTimelapseLength = this.setTimelapseLength.bind(this);
    this.onLengthSelected = this.onLengthSelected.bind(this);
  }

  setTimelapseLength(input) {
    this.setState({
      timelapseLength: input.target.value,
    });
  }

  onLengthSelected() {
    this.setState({showVideo: false})
    renderTimelapse(this.state.timelapseLength)
    .then((done) => this.setState({showVideo: true}))
    .catch(err => console.log(err));
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
            <FontAwesomeIcon icon={faSeedling} />
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
      <div style={styles.container}>
        {this.renderVideoRenderButtonAndInput()}
        {this.state.showVideo ? this.renderVideoPlayer() : null}
      </div>
    );
  }
}