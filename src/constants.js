const constants = {
  Tabs: {
	  LIGHTS: 'lights',
	  OUTLETS: 'outlets',
	  TASKS: 'tasks',
	  TEMPERATURE: 'temperature',
	  OTHERS: 'others',
	},
	Actions: {
		ON: 'ON',
		OFF: 'OFF',
		TOGGLE: 'TOGGLE',
		BRIGHTNESS: 'BRIGHTNESS',
		LIGHT_EFFECT: 'LIGHT_EFFECT'
	},
	DeviceTypes: {
		WLED: 'WLED',
		HUE: 'HUE',
		TASMOTA_OUTLET: 'TASMOTA_OUTLET',
		RF_OUTLET: 'RF_OUTLET',
		HYPERION: 'HYPERION',
		IR_SENDER_TOGGLE: 'IR_SENDER_TOGGLE',
	}
};

module.exports = constants;
