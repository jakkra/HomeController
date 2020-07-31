const constants = {
  Tabs: {
    LIGHTS: 'lights',
    TASKS: 'tasks',
    TEMPERATURE: 'temperature',
    OTHERS: 'others',
    PRINTER: 'printer',
    GARDEN: 'garden',
    CONFIG: 'CONFIG',
  },
  Actions: {
    ON: 'ON',
    OFF: 'OFF',
    TOGGLE: 'TOGGLE',
    BRIGHTNESS: 'BRIGHTNESS',
    LIGHT_EFFECT: 'LIGHT_EFFECT',
  },
  DeviceTypes: {
    WLED: 'WLED',
    WLED_CUSTOM: 'WLED_CUSTOM',
    HUE: 'HUE',
    TASMOTA_OUTLET: 'TASMOTA_OUTLET',
    RF_OUTLET: 'RF_OUTLET',
    HYPERION: 'HYPERION',
    TOGGLE: 'TOGGLE',
  },
};

module.exports = constants;
