import React from 'react';
import moment from 'moment';

import { Col, Row } from 'react-bootstrap';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import { gardenSources } from '../config';

import { getMoistureSevenDays, getTemperaturesSevenDays } from '../lib/fetch';

const styles = {
  container: {
  },
  graphTitle: {
    overflow: 'hidden',
    height: '100%',
    width: '100%',
  },
};

export default class GardenGraph extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    this.days = [];
    this.handleNewData = this.handleNewData.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.formatX = this.formatX.bind(this);
    this.formatY = this.formatY.bind(this);
  }

  componentDidMount() {
    this.refreshTimer = setInterval(() => this.refreshData(), 1000 * 60 * 5);
    this.refreshData();
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer);
  }

  refreshData() {
    const temps = {};
    let moistures = {};

    const fetchMoisturePromise = getMoistureSevenDays()
      .then(res => moistures = this.handleNewMoisture(res))
      .catch(err => console.log(err));

    const actions = gardenSources.map((source) => {
      return getTemperaturesSevenDays(source.key)
        .then(res => temps[source.key] = { temperatures: res })
        .catch(err => console.log(err));
    })
    actions.push(fetchMoisturePromise);

    Promise.all(actions).then(() => this.handleNewData(temps, moistures));
  }

  handleNewData(temperatures, moistures) {
    // Combine all keys
    const data = {
      ...temperatures,
      ...moistures
    };

    const result = {};
    // Combine mositure and temperature data to one object, with the name/id as key
    Object.keys(data)
      .forEach(key => result[key] = {
        temperatures: temperatures[key] ? temperatures[key].temperatures : [] , moistures: moistures[key] ? moistures[key].moistures : []
      });

    console.log(result);
    this.setState({
      data: result
    });
  }

  handleNewMoisture(moistures) {
    let logs = [];
    moistures.forEach((moisture) => {
      if (!logs.find(element => element.name === moisture.name) && gardenSources.find(element => element.key === moisture.name)) {
        logs.push({
          name: moisture.name,
          moistures: moistures.filter(log => log.name === moisture.name)
        });
      }
    });

    const data = {};
    logs.forEach(log => {
      data[log.name] = {
        moistures: log.moistures,
      }
    })

    return data;
  }

  formatX(x) {
    /*if (this.days.indexOf(moment(new Date(x)).format('dddd')) > -1) {
      return '';
    } else {*/
      this.days.push(moment(new Date(x)).format('dddd'));
      return moment(new Date(x)).format('dddd');
    /*}*/
  }

  formatY(y) {
    return y + '%';
  }

  formatYTemp(y) {
    return y + ' °C';
  }

  render() {
    if (Object.keys(this.state.data).length === 0) return null;
    const graphColors= ["#8884d8", "#00ff80", "#00ffff", "#ff0080"]
    return (
      <Row >
        {Object.keys(this.state.data).map((key, i) =>
          <div key={i}>
            <Col xs={6}>
              <div style={styles.chartTitle} >{"Fuktighet " + key}</div>
                <ResponsiveContainer title="A title" width="90%" aspect={2.5}>
                  <AreaChart title="A title" data={this.state.data[key].moistures}>
                    <XAxis
                      interval={Math.round(this.state.data[key].moistures) / 7}
                      tickFormatter={this.formatX}
                      dataKey="createdAt"
                    />
                    <YAxis type="number" domain={['dataMin - 1']} tickFormatter={this.formatY} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Area name="Fuktighet" type="monotone" dataKey="moisture" stroke="#FFA500" fill={graphColors[i % graphColors.length]} />
                    <Tooltip />
                  </AreaChart>
                </ResponsiveContainer>
              </Col>
              <Col xs={6}>
              <div style={styles.chartTitle} >{"Temperature " + key}</div>
                <ResponsiveContainer title="A title" width="90%" aspect={2.5}>
                  <AreaChart title="A title" data={this.state.data[key].temperatures}>
                    <XAxis
                      interval={Math.round(this.state.data[key].temperatures) / 7}
                      tickFormatter={this.formatX}
                      dataKey="createdAt"
                    />
                    <YAxis type="number" domain={['dataMin - 1']} tickFormatter={this.formatYTemp} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Area name="Temperatur" type="monotone" dataKey="temperature" stroke="#FFA500" fill={graphColors[i+1 % graphColors.length]} />
                    <Tooltip />
                  </AreaChart>
                </ResponsiveContainer>
            </Col>
          </div>
        )}
      </Row>
    );
  }
}
