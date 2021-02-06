import React, { Component } from 'react';

import { Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faBars, faShoppingBasket, faThermometerHalf, faPrint, faTint, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import { isMobile, isTablet } from 'react-device-detect';

import hollidayIcon from './img/animated-christmas.gif'
import hollidayIcon1 from './img/santa.gif'

import DevicePage from './components/DevicePage';
import InformationPanel from './components/InformationPanel';
import Tasks from './components/Tasks';
import TemperatureGraph from './components/TemperatureGraph';
import GardenGraph from './components/GardenGraph';
import OctoPrint from './components/OctoPrint';
import ConfigPage from './components/ConfigPage';
import TimelapsePage from './components/TimelapsePage';
import { Tabs } from './constants';
import { rooms } from './config';

const styles = {
  container: {
    padding: 5,
  },
  toolbar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '5px 0',
    borderTop: '1px solid #777E87',
    color: '#284257',
    boxShadow: '0px 0px 5px 0px rgba(25, 25, 25, 0.75)',
    textAlign: 'center',
    background: 'rgba(41,68,89,1)',
  },
  toolbarColumn: {
    borderColor: 'yellow',
    borderWidth: 5,
    borderRadius: 2,
  },
  toolbarRow: {
    paddingTop: 3,
  },
  toolbarIcon: {
    color: 'white',
    fontSize: '1.5em',
    minWidth: 20,
  },
  hollidayIcon: {
    textAlign: 'right',
    right: 0,
    bottom: 70,
    height: '38%',
    position: 'absolute'
  },
  hollidayIcon1: {
    textAlign: 'right',
    right: '20%',
    bottom: 50,
    height: '25%',
    position: 'absolute',
  }
};

export default class HomeController extends Component {
  constructor() {
    super();

    this.state = {
      selectedTab: Tabs.LIGHTS,
    };

    this.renderTabView = this.renderTabView.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  renderButton(tabType) {
    let image;
    let buttonStyle = this.state.selectedTab === tabType ? 'success' : 'primary';

    switch (tabType) {
      case Tabs.LIGHTS:
        image = faLightbulb;
        break;
      case Tabs.OTHERS:
        image = faBars;
        break;
      case Tabs.TASKS:
        image = faShoppingBasket;
        break;
      case Tabs.TEMPERATURE:
        image = faThermometerHalf;
        break;
      case Tabs.PRINTER:
        image = faPrint;
        break;
      case Tabs.GARDEN:
        image = faTint;
        break;
      case Tabs.TIMELAPSE:
        image = faSeedling;
        break;
      default:
        image = faBars;
        break;
    }

    const icon = <FontAwesomeIcon icon={image} style={styles.toolbarIcon} />;

    return (
      <Button
        bsStyle={buttonStyle}
        onClick={() => {
          if (this.state.selectedTab !== tabType) {
            this.setState({ selectedTab: tabType });
          }
        }}>
        {icon}
      </Button>
    );
  }

  renderTabView() {
    let view = null;

    switch (this.state.selectedTab) {
      case Tabs.LIGHTS:
        view = <DevicePage rooms={rooms} />;
        break;
      case Tabs.TASKS:
        view = <Tasks />;
        break;
      case Tabs.TEMPERATURE:
        view = <TemperatureGraph />;
        break;
      case Tabs.PRINTER:
        view = <OctoPrint />
        break;
      case Tabs.GARDEN:
        view = <GardenGraph />
        break;
      case Tabs.CONFIG:
        view = <ConfigPage />
        break;
      case Tabs.TIMELAPSE:
        view = <TimelapsePage />
        break;
      default:
        break;
    }

    return view;
  }

  render() {
    let hollidayImage, hollidayImage1 = null;
    let toolbarStyle = styles.toolbar;

    if ((this.state.selectedTab === Tabs.LIGHTS) && !(isMobile && !isTablet) && this.props.theme === 'christmas') {
      hollidayImage = (<img src={hollidayIcon} alt="" style={ styles.hollidayIcon } />);
      hollidayImage1 = (<img src={hollidayIcon1} alt="" style={ styles.hollidayIcon1 } />);
    }

    if (this.props.theme === 'christmas') {
      toolbarStyle = {...toolbarStyle, background: '#A01616'};
    }

    return (
      <Col style={styles.container}>
        <ToastContainer autoClose={3000} position="bottom-center" closeOnClick />
        <div style={{ paddingBottom: 50 }}>{this.renderTabView()}</div>
        {hollidayImage}
        {hollidayImage1}
        <Row>{!((isMobile && !isTablet) || (this.state.selectedTab === Tabs.GARDEN)) ? <InformationPanel /> : null}</Row>
        <div style={toolbarStyle}>
          <Col styles={styles.toolbarColumn} >
            <Row style={{ display: "flex", justifyContent: "space-between" }} >
              {this.renderButton(Tabs.LIGHTS)}
              {this.renderButton(Tabs.TASKS)}
              {this.renderButton(Tabs.TEMPERATURE)}
              {this.renderButton(Tabs.GARDEN)}
              {this.renderButton(Tabs.PRINTER)}
              {this.renderButton(Tabs.TIMELAPSE)}
              {this.renderButton(Tabs.CONFIG)}
            </Row>
          </Col>
        </div>
      </Col>
    );
  }
}
