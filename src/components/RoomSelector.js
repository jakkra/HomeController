import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import ImageMapper from 'react-image-mapper';


import firstFloor from '../img/first_sloor.png'
import secondFloor from '../img/second_floor.jpg';


export default class RoomSelector extends Component {

  static propTypes = {
    onGroupSelected: PropTypes.func,
  };

  constructor() {
    super();

    this.state = {
      selectedGroup: null,
    }
    this.onRoomClicked = this.onRoomClicked.bind(this);
  }

  componentDidMount() {
  }

  onRoomClicked(area) {
  	this.props.onGroupSelected(area.name);
  }

  render() {
  	const first = {
		  name: "firstFloor",
		  areas: [
		    { name: "Kök", shape: "rect", coords: [67,322,789,1333] },
		    { name: "Vardagsrum", shape: "poly", coords: [793,326,1529,327,1532,1042,1078,1052,1074,1761,784,1760,209,1760,211,1338,795,1335] },
		  ]
		}

		const second = {
		  name: "secondFloor",
		  areas: [
		    { name: "Sovrum", shape: "rect", coords: [25,25,237,425] },
		    { name: "Lekrum", shape: "rect", coords: [243,26,459,327] },
		    { name: "Allrum", shape: "rect", coords: [244,337,461,547] },
		    { name: "Vardagsrum", shape: "poly", coords: [24,432,25,547,241,548,242,481,67,481,67,431] },
		  ]
		}

    return (
      <div style={{marginTop: 50}}>
        <SwipeableViews enableMouseEvents>
        <ImageMapper
        	src={firstFloor}
        	map={first}
        	width={280}
        	imgWidth={1550}
  	    	onClick={evt => this.onRoomClicked(evt)}
      	/>
      	<ImageMapper
        	src={secondFloor}
        	map={second}
    	 		width={280}
    	 		imgWidth={480}
  	    	onClick={evt => this.onRoomClicked(evt)}
      	/>
       </SwipeableViews>
      </div>
	  );
	}
}