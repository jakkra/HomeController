import React, {Component} from 'react';

import { Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faPlug, faBars } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from 'react-toastify';

import LightPage from './components/LightPage'
import { Tabs } from './constants';
import { rooms } from './config';


const styles = {
  container: {
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
    background: 'rgba(41,68,89,1)'
  },
  toolbarColumn: {
    borderColor: 'yellow',
    borderWidth: 5,
    borderRadius: 2
  },
  toolbarRow: {
    paddingTop: 3,
  },
  toolbarIcon: {
    color: 'white',
    fontSize: '1.5em',
  },
};

export default class HomeController extends Component {
  constructor() {
    super();
    
    this.state = {
      selectedTab: Tabs.LIGHTS,
    }

    this.renderControllerView = this.renderControllerView.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  renderButton(tabType, onClickThis) {
    let image;
    let buttonStyle = (this.state.selectedTab) === tabType ? "success" : "primary";
    
    switch(tabType) {
      case Tabs.LIGHTS:
        image = faLightbulb;
        break;
      case Tabs.OUTLETS:
        image = faPlug;
        break;
      case Tabs.OTHERS:
        image = faBars;
        break;
      default:
        image = faBars;
        break;
    }

    const icon = (<FontAwesomeIcon icon={image} style={styles.toolbarIcon} />);

    return (
      <Button
        bsStyle={ buttonStyle }
        onClick={() => { 
          if (this.state.selectedTab !== tabType) {
            this.setState({selectedTab: tabType});
          }
        }}
        >
        {icon}
      </Button>
    );
  }

  renderControllerView() {
    let view = null;

    switch(this.state.selectedTab) {
      case Tabs.LIGHTS:
        view = (<LightPage rooms={rooms}/>);
        break;
      case Tabs.OUTLETS:
        view =('OutletConroller')
        break;
      case Tabs.OTHERS:
        view = ('OtherController');
        break;
      default:
        break;
    }

    return view;
  }

  render() {
    return (
      <Col style={styles.container} >
        <ToastContainer autoClose={3000} position="top-center" closeOnClick/>
        <div style={{paddingBottom: 50}}>
          {this.renderControllerView()}
        </div>
        <div style={styles.toolbar}>
          <Col styles={styles.toolbarColumn} md={12} >
            <Row xs={12}>
              <Col xs={4}>
                {this.renderButton(Tabs.LIGHTS, this.props.onLightsSelected)}
              </Col>
              <Col xs={4}>
                {this.renderButton(Tabs.OUTLETS, this.props.onOutletsSelected)}
              </Col>
              <Col xs={4}>
                {this.renderButton(Tabs.OTHERS, this.props.onOthersSelected)}
              </Col>
            </Row>
          </Col>
        </div>
      </Col>
    );
  }
}


