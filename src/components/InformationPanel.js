import React from 'react';

import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import { getCurrentWeather } from '../lib/smhi';

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

export default class InformationPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new moment(),
      temperature: 22,
      weather: null,
    };

    this.refreshWeather = this.refreshWeather.bind(this);
    this.handleNewWeather = this.handleNewWeather.bind(this);
  }

  componentDidMount() {
    this.timerClockID = setInterval(() => this.tick(), 1000);
    this.timerClockID = setInterval(() => this.refreshWeather(), 10 * 60 * 1000);
    this.refreshWeather();
  }

  componentWillUnmount() {
    clearInterval(this.timerClockID);
  }

  tick() {
    this.setState({
      date: new moment(),
    });
  }

  refreshWeather() {
    getCurrentWeather()
      .then(this.handleNewWeather)
      .catch(err => console.log(err));
  }

  handleNewWeather(weather) {
    this.setState({
      weather: weather,
    });
  }

  renderCurrentWeather(weather) {
    if (weather) {
      return (
        <div>
          <Col xs={12} />
            <p style={styles.smallText}>
            {`${this.state.weather.temp} °C (Känns som ${this.state.weather.windChill} °C)`}
            </p>
          <Col />
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
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
          {this.renderCurrentWeather(this.state.weather)}
        </Row>
      </div>
    );
  }
}
