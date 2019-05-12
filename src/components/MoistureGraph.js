import React from 'react';
import moment from 'moment';

import { Col, Row } from 'react-bootstrap';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import { getMoistureSevenDays } from '../lib/fetch';

const styles = {
  container: {
  },
  graphTitle: {
    overflow: 'hidden',
    height: '100%',
    width: '100%',
  },
};

export default class MoistureGraph extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      moistures:  [],
    };
    this.days = [];
    this.handleNewMoisture = this.handleNewMoisture.bind(this);
    this.refreshMoistures = this.refreshMoistures.bind(this);
    this.formatX = this.formatX.bind(this);
    this.formatY = this.formatY.bind(this);
  }

  componentDidMount() {
    this.refreshTimer = setInterval(() => this.refreshMoistures(), 1000 * 60 * 5);
    this.refreshMoistures();
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer);
  }

  refreshMoistures() {
    getMoistureSevenDays()
      .then(res => this.handleNewMoisture(res))
      .catch(err => console.log(err));
    return;
  }

  handleNewMoisture(moistures) {
    let logs = [];
    moistures.forEach((moisture) => {
      if (!logs.find(element => element.name === moisture.name)) {
        logs.push({
          name: moisture.name,
          moistures: moistures.filter(log => log.name === moisture.name)
        });
      }
    });
    
    console.log(logs)
    logs.push(logs[1])
    logs.push(logs[0]);
    this.setState({
      moistures: logs,
    });
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
    return y + '';
  }

  render() {
    if (this.state.moistures.length === 0) return null;
    const graphColors= ["#8884d8", "#00ff80", "#00ffff", "#ff0080"]
    return (
      <Row>
        {this.state.moistures.map((data, i) =>
          <Col xs={6} key={i}>
            <div style={styles.chartTitle} >{data.name}</div>
            <ResponsiveContainer title="A title" width="90%" aspect={2.5}>
              <AreaChart title="A title" data={data.moistures}>
                <XAxis
                  interval={Math.round(data.moistures) / 7}
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
        )}
      </Row>
    );
  }
}
