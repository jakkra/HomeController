import React from 'react';
import moment from 'moment';

import { Row } from 'react-bootstrap';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import { getTemperaturesSevenDays } from '../lib/fetch';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  chartTitle: {
    color: '#284257',
    fontSize: '1.3em'
  }
};

export default class TemperatureGraph extends React.Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      temperatures: [],
    };
    this.days = [];
    this.handleNewTemp = this.handleNewTemp.bind(this);
    this.refreshTemps = this.refreshTemps.bind(this);
    this.formatX = this.formatX.bind(this);
    this.formatY = this.formatY.bind(this);
  }

  componentDidMount() {
    this.refreshTimer = setInterval(() => this.refreshTemps(), 1000 * 60 * 5);
    this.refreshTemps();
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer);
  }

  refreshTemps() {
    getTemperaturesSevenDays()
      .then(this.handleNewTemp)
      .catch(err => console.log(err));
  }

  handleNewTemp(temps) {
    const t = temps.filter(function(obj) {
      return obj.temperature !== 0;
    });
    this.setState({
      temperatures: t,
    });
  }

  formatX(x) {
    if (this.days.indexOf(moment(new Date(x)).format('dddd')) > -1) {
      return '';
    } else {
      this.days.push(moment(new Date(x)).format('dddd'));
      return moment(new Date(x)).format('dddd');
    }
  }

  formatY(y) {
    return y + ' °C';
  }

  render() {
    return (
      <div>
        <Row>
          <p style={styles.chartTitle}>
            Temperatur inomhus
          </p>
        </Row>
        <Row style={styles.container}>
          <ResponsiveContainer width='90%' aspect={2.5}>
            <AreaChart
              title="Test title"
              data={this.state.temperatures}
              >
              <XAxis
                interval={Math.round(this.state.temperatures.length / 7)}
                tickFormatter={this.formatX}
                dataKey="createdAt"
              />
              <YAxis
                type="number"
                domain={['dataMin - 1']}
                tickFormatter={this.formatY}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Area
                name="Temperatur"
                type="monotone"
                dataKey="temperature"
                stroke="#FFA500"
                fill='#8884d8'
              />
               <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </Row>
      </div>
    );
  }
}
