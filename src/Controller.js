import React, {Component} from 'react';

import { Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faPlug, faBars } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from 'react-toastify';

import { tabs } from './constants';

const styles = {
  container: {
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

export default class Controller extends Component {
  constructor() {
    super();

    this.state = {
      selectedTab: tabs.LIGHTS,
    }

    this.renderSelected = this.renderSelected.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    
  }

  renderSelected() {
    let text;
    switch(this.state.selectedTab) {
      case tabs.LIGHTS:
        text = 'LIGHT';
        break;
      case tabs.OUTLETS:
        text = 'OUTLETS';
        break;
      case tabs.OTHERS:
        text = 'OTHERS';
        break;
      default:
        text = 'WHUT';
        break;
    }

    return (<div> {text}</div>);
  }

  renderButton(tabType, onClickThis) {
    let image;
    let buttonStyle = (this.state.selectedTab) === tabType ? "success" : "primary";
    
    switch(tabType) {
      case tabs.LIGHTS:
        image = faLightbulb;
        break;
      case tabs.OUTLETS:
        image = faPlug;
        break;
      case tabs.OTHERS:
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

  render() {
    return (
      <div className="controller">
        <ToastContainer autoClose={3000} position="top-center" closeOnClick/>
        <Col className="Container">
          <Row xs={10}>
            {this.renderSelected()}
          </Row>
          <Row>
            <video ref="video"/>
          </Row>
          <Row xs={2}>
            <div style={styles.container}>
              <Col mdHidden styles={styles.toolbarColumn} md={12} >
                <Row xs={12}>
                  <Col xs={4}>
                    {this.renderButton(tabs.LIGHTS, this.props.onLightsSelected)}
                  </Col>
                  <Col xs={4}>
                    {this.renderButton(tabs.OUTLETS, this.props.onOutletsSelected)}
                  </Col>
                  <Col xs={4}>
                    {this.renderButton(tabs.OTHERS, this.props.onOthersSelected)}
                  </Col>
                </Row>
              </Col>
            </div>
          </Row>
        </Col>
      </div>
    );
  }
}


