import React from 'react';

import { get3DPrinterState } from '../lib/fetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faBed, faThermometerHalf} from '@fortawesome/free-solid-svg-icons';

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
  videoFeed: {
    maxWidth: '70%',
    maxHeight: '70%',
    marginTop: 10,
    marginRight: 0
  },
};

export default class OctoPrint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrinterState: {},
      currentJob: {},
      isReachable: false,
    };
    this.refreshPrinterState = this.refreshPrinterState.bind(this);
  }

  componentDidMount() {
    this.refreshTimer = setInterval(() => this.refreshPrinterState(), 1000 * 10);
    this.refreshPrinterState();
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer);
  }

  refreshPrinterState() {
    get3DPrinterState()
      .then(state => this.setState({ currentPrinterState: state.state, currentJob: state.job, isReachable: true }))
      .catch(err => {
        console.log('Printer offline', err);
        this.setState({ currentPrinterState: {}, currentJob: {}, isReachable: false })
      });
  }

  render() {
    if (!this.state.isReachable) {
      return (
        <div style={styles.container}>
          <div style={styles.notAvailibleText}>
            3D skrivare ej tillgänglig
          </div>
          <div>
            <img style={styles.videoFeed} src={"http://krantz.asuscomm.com:9080/"} alt="Stream of print"/>
          </div>
        </div>);
    }
    if (!(this.state.currentPrinterState.state !== undefined) || !(this.state.currentPrinterState.state.flags.printing !== undefined)) return null;
    let progress = null;
    if (this.state.currentJob && this.state.currentJob.job.file.name && this.state.flasgs && this.state.flags.printing) {
      progress = (
        <div style={styles.listName}>
          {'Printing ' + this.state.currentJob.job.file.name + ' ' + Math.round(this.state.currentJob.progress.completion)} %
          <FontAwesomeIcon spin icon={faSpinner} style={styles.icon} />
        </div>
      );
    } else {
      progress = (
        <div style={styles.listName}>
          Printer idle
          <FontAwesomeIcon icon={faBed} style={styles.icon} />
        </div>
      );
    }
    return (
      <div style={styles.container}>
        {progress}

        <div style={styles.listItem}>
          Nossle {this.state.currentPrinterState.temperature.tool0.actual}°C
          <FontAwesomeIcon icon={faThermometerHalf} style={styles.icon} />
        </div>
        <div style={styles.listItem}>
          Bed {this.state.currentPrinterState.temperature.bed.actual}°C
          <FontAwesomeIcon icon={faThermometerHalf} style={styles.icon} />
        </div>
        <div>
          <img style={styles.videoFeed} src={"http://krantz.asuscomm.com:9080/"} alt="Stream of print"/>
        </div>
      </div>
    );
  }
}