import React from 'react';

import moment from 'moment';
import { Col, Row } from 'react-bootstrap';

const styles = {
  container: {
    textAlign: 'left',
    position: 'absolute',
    bottom: 60,
    paddingLeft: 10
  },
  clock: {
    color: 'black',
    fontSize: '3em',
    lineHeight: 1,
    lineWidth: 1,
  },
  clockSeconds: {
    color: 'black',
    fontSize: '0.5em',
    verticalAlign: 'top',
    paddingLeft: 1,
    textAlign: 'left',
  },
  smallText: {
    color: 'black',
    fontSize: '1.2em',
  },
};

export default class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new moment(),
      temperature: 22
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new moment(),
    });
  }

  render() {
    console.log("render clock")
    let day = this.state.date.format('dddd, LL');
    day = day.charAt(0).toUpperCase() + day.slice(1);

    return (
      <div style={styles.container}>
        <Row>
          <Col xs={12} />
          <div style={styles.smallText}> {day}</div>
          <Col />
        </Row>
        <Row>
          <Row>
            <Col xs={12}>
              <div style={styles.clock}>
                {this.state.date.format('HH:mm')}
                <span style={styles.clockSeconds}>{this.state.date.format('ss')}</span>
              </div>
            </Col>
          </Row>
        </Row>
        <Row>
          <Col xs={12} />
          <p style={styles.smallText}>
            {this.state.temperature} °C
          </p>
          <Col />
        </Row>
      </div>
    );
  }
}
