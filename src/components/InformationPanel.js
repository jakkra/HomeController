import React from 'react';

import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import { getCurrentWeather } from '../lib/smhi';
import { getLatestTemperatureFromSource } from '../lib/fetch';
import { toast } from 'react-toastify';

const styles = {
  container: {
    textAlign: 'left',
    position: 'absolute',
    bottom: 60,
    paddingLeft: 30,
  },
  clock: {
    color: '#284257',
    fontSize: '3em',
    lineHeight: 1,
    lineWidth: 1,
  },
  clockSeconds: {
    color: '#284257',
    fontSize: '0.5em',
    verticalAlign: 'top',
    paddingLeft: 1,
    textAlign: 'left',
  },
  smallText: {
    color: '#284257',
    fontSize: '1.2em',
  },
};

// https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
let hidden = null;
let visibilityChange = null;
if (typeof document.hidden !== 'undefined') {
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

export default class InformationPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new moment(),
      temperature: 22,
      weather: null,
    };
    this.isFirstLoad = true;
    this.refreshWeather = this.refreshWeather.bind(this);
    this.handleNewWeather = this.handleNewWeather.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  componentDidMount() {
    this.isFirstLoad = true;
    document.addEventListener(visibilityChange, this.handleVisibilityChange, false);
    this.timerClockID = setInterval(() => this.tick(), 1000);
    this.timerWeatherID = setInterval(() => this.refreshWeather(), 5 * 60 * 1000);
    this.refreshWeather();
  }

  componentWillUnmount() {
    document.removeEventListener(visibilityChange, this.handleVisibilityChange);
    clearInterval(this.timerClockID);
    clearInterval(this.timerWeatherID);
  }

  handleVisibilityChange() {
    if (!document[hidden]) {
     this.refreshWeather();
    }
  }

  tick() {
    this.setState({
      date: new moment(),
    });
  }

  refreshWeather() {
    getCurrentWeather()
      .then(this.handleNewWeather)
      .catch(err => { console.log(err); toast.error(err) });

    getLatestTemperatureFromSource('4')
      .then(temperature => {
        this.setState({
          temperature: temperature.temperature
        })
      })
      .catch(err => { console.log(err); });
  }

  handleNewWeather(weather) {
    if (this.isFirstLoad !== true && !toast.isActive(this.toastId)) {
      this.toastId = toast.success("Updated!", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        closeButton: false,
      });
    } else {
      this.isFirstLoad = false;
    }

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
            {`${this.state.temperature} °C / ${this.state.weather.temp} °C (Känns som ${this.state.weather.windChill} °C)`}
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
      <div style={styles.container} onClick={() => this.refreshWeather()}>
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
        <Row>{this.renderCurrentWeather(this.state.weather)}</Row>
      </div>
    );
  }
}
