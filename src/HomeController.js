import React, { Component } from 'react';

import { Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faBars, faShoppingBasket, faThermometerHalf, faPrint, faTint } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import { isMobile, isTablet } from 'react-device-detect';

import DevicePage from './components/DevicePage';
import InformationPanel from './components/InformationPanel';
import Tasks from './components/Tasks';
import TemperatureGraph from './components/TemperatureGraph';
import GardenGraph from './components/GardenGraph';
import OctoPrint from './components/OctoPrint';
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
      default:
        break;
    }

    return view;
  }

  render() {
    return (
      <Col style={styles.container}>
        <ToastContainer autoClose={3000} position="bottom-center" closeOnClick />
        <div style={{ paddingBottom: 50 }}>{this.renderTabView()}</div>
        <Row>{!((isMobile && !isTablet) || (this.state.selectedTab === Tabs.GARDEN)) ? <InformationPanel /> : null}</Row>
        <div style={styles.toolbar}>
          <Col styles={styles.toolbarColumn} md={12}>
            <Row xs={12}>
              <Col xs={2}>{this.renderButton(Tabs.LIGHTS)}</Col>
              <Col xs={2}>{this.renderButton(Tabs.TASKS)}</Col>
              <Col xs={2}>{this.renderButton(Tabs.TEMPERATURE)}</Col>
              <Col xs={2}>{this.renderButton(Tabs.GARDEN)}</Col>
              <Col xs={2}>{this.renderButton(Tabs.PRINTER)}</Col>
              <Col xs={2}>{this.renderButton(Tabs.UNKNOWN)}</Col>
            </Row>
          </Col>
        </div>
      </Col>
    );
  }
}
