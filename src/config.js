import { DeviceTypes } from './constants';

export const rooms =
	[{
		name: "Lekrum",
		lights:
		[{
		  name: "Falcon",
		  id: 1,
		  type: DeviceTypes.WLED,
		  ip: "http://192.168.1.33"
		},
		{
		  name: "Ljusstake",
		  id: 2,
		  type: DeviceTypes.WLED,
		  ip: "http://192.168.1.251"
		},
		{
		  name: "Skrivare",
		  id: 3,
		  type: DeviceTypes.WLED,
		  ip: "http://192.168.1.196"
		},
		{
		  name: "Skrivbord",
		  id: 4,
		  type: DeviceTypes.WLED,
		  ip: "http://192.168.1.66"
		}]
	},
	{
		name: "Sovrum",
		lights: 
		[{
			name:"Taklampa",
			id: 5,
			type: DeviceTypes.HUE,
			hueName: "Sovrum-tak"
		},
		{
			name:"Ljusslinga",
			id: 6,
			type: DeviceTypes.RF_OUTLET,
			url: "http://192.168.1.98:3001/api/serial/outlet:1:",
		}]
	},
	{
		name: "Vardagsrum",
		lights: 
			[{
			  name: "Hörnlampa",
			  id: 7,
			  type: DeviceTypes.TASMOTA_OUTLET,
			  ip: "http://192.168.1.129"
			},
			{
			  name: "Trappa-Spot",
			  id: 8,
			  type: DeviceTypes.HUE,
			  hueName: "Vardagsrum-trappa-spot"
			},
			{
			  name: "Soffa-Spot",
			  id: 9,
			  type: DeviceTypes.HUE,
			  hueName: "Vardagsrum-soffa-spot"
			}],
		other: {
			name:"Kaffekokare",
			id: 11,
			type: DeviceTypes.RF_OUTLET,
			urlOn: "http://192.168.1.98:3001/api/serial/outlet:4:1",
			urlOff: "http://192.168.1.98:3001/api/serial/outlet:4:0"
		}
	}]
