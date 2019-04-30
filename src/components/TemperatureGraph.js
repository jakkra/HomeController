import React from 'react';
import moment from 'moment';

import { temperatureSources } from '../config';

import { Row } from 'react-bootstrap';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import SwipeableViews from 'react-swipeable-views';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { getTemperaturesSevenDays } from '../lib/fetch';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  chartTitle: {
    color: '#284257',
    fontSize: '1.3em',
  },
  graphTitle: {
    overflow: 'hidden',
    height: '100%',
    width: '100%',
  },
  swipeDirectionIcon: {
    color: 'black',
    fontSize: '1em',
    minWidth: 10,
    marginLeft: 20,
    marginRight: 20,
  },
};

export default class TemperatureGraph extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      temperatures: {},
    };
    this.days = [];
    this.handleNewTemp = this.handleNewTemp.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
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
    temperatureSources.forEach(source => {
      getTemperaturesSevenDays(source.key)
        .then(res => this.handleNewTemp(source.key, res))
        .catch(err => console.log(err));
    });
    return;
  }

  handleNewTemp(source, temps) {
    const t = temps.filter(function(obj) {
      return obj.temperature !== 0;
    });
    const prevTemps = this.state.temperatures;
    prevTemps[source] = t;

    console.log('prev', prevTemps);
    this.setState({
      allTemperatures: prevTemps,
      currentSource: temperatureSources[0],
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

  handleSourceChange(newIndex) {
    this.days = [];
    this.setState({
      currentSource: temperatureSources[newIndex % temperatureSources.length],
    });
  }

  render() {
    if (!this.state.temperatures[temperatureSources[0].key]) return null;

    return (
      <div>
        <SwipeableViews ignoreNativeScroll={false} enableMouseEvents onChangeIndex={this.handleSourceChange}>
          {temperatureSources.map((source, index) => {
            let iconLeft = null;
            let iconRight = null;
            if (index === temperatureSources.length - 1) {
              iconLeft = <FontAwesomeIcon icon={faArrowLeft} style={styles.swipeDirectionIcon} />;
            } else {
              iconRight = <FontAwesomeIcon icon={faArrowRight} style={styles.swipeDirectionIcon} />;
            }
            return (
              <Row style={styles.graphTitle} key={source.key}>
                <p style={styles.chartTitle}>
                  {iconLeft} Temperatur {source.name} {iconRight}
                </p>
              </Row>
            );
          })}
        </SwipeableViews>
        <Row style={styles.container}>
          <ResponsiveContainer width="90%" aspect={2.5}>
            <AreaChart title="A title" data={this.state.temperatures[this.state.currentSource.key]}>
              <XAxis
                interval={Math.round(this.state.temperatures[this.state.currentSource.key].length / 7)}
                tickFormatter={this.formatX}
                dataKey="createdAt"
              />
              <YAxis type="number" domain={['dataMin - 1']} tickFormatter={this.formatY} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Area name="Temperatur" type="monotone" dataKey="temperature" stroke="#FFA500" fill="#8884d8" />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </Row>
      </div>
    );
  }
}
