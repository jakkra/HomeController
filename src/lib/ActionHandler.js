import { Actions, DeviceTypes } from '../constants';
import { mirrorUrl } from '../config';

console.log('Mirror', mirrorUrl);

const checkStatus = res => {
  return new Promise((resolve, reject) => {
    if (res.status >= 200 || res.status === 409 || res.status === 0) { // no-cors 
      return resolve(res);
    } else {
      const error = new Error(`StatusCode: ${res.status}, message: ${res.statusText}`);
      return reject(error);
    }
  });
};

export function handleLightAction(light, action, options) {
  switch (light.type) {
    case DeviceTypes.WLED:
      return handleWled(light, action, options);
    case DeviceTypes.HUE:
      return handleHue(light, action, options);
    case DeviceTypes.TASMOTA_OUTLET:
      return handleSonoffTasmotaOutletAction(light.ip, action);
    case DeviceTypes.RF_OUTLET:
      return handleRfOutlet(light.url, action);
    default:
      return new Promise.reject(new Error(`Light type ${light.type} not implemented/supported`));
  }
}

export function handleRfOutlet(url, action) {
  return new Promise((resolve, reject) => {

    switch (action) {
      case Actions.ON:
        url += '1';
        break;
      case Actions.OFF:
        url += '0';
        break;
      default:
        return reject(new Error(`Action ${action} not implemented/supported for wled`));
    }
    console.log(url)
    return fetch(url, { mode: 'no-cors' })
    .then(checkStatus);
  });
}

export function handleSonoffTasmotaOutletAction(ip, action) {
  return new Promise((resolve, reject) => {
    let url = ip;

    switch (action) {
      case Actions.ON:
        url += '/cm?cmnd=Power%20On';
        break;
      case Actions.OFF:
        url += '/cm?cmnd=Power%20off';
        break;
      case Actions.TOGGLE:
        url += '/cm?cmnd=Power%20TOGGLE';
        break;
      default:
        return reject(new Error(`Action ${action} not implemented/supported for sonoff-tasmota-outlet`));
    }
    return fetch(url)
    .then(checkStatus);
  });
}

function handleHue(light, action, params) {
  return new Promise((resolve, reject) => {
    let options;
    const url = mirrorUrl + '/api/hue';

    switch (action) {
      case Actions.ON:
        options = {
          on: true,
        }
        break;
      case Actions.OFF:
        options = {
          on: false,
        }
        break;
      case Actions.BRIGHTNESS:
        if (params && params.brightness) {
          options = {
            on: true,
            bri: params.brightness,
          }
        } else {
          return reject(new Error(`Action ${action} requires params with brightness set for hue-light`));
        }
        break;
      case Actions.TOGGLE:
      default:
        return reject(new Error(`Action ${action} not implemented/supported for hue-light`));
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: light.hueName,
        options: options,
      })
    })
  });
}

function handleWled(light, action, options) {
  return new Promise((resolve, reject) => {
    let url = light.ip;

    switch (action) {
      case Actions.ON:
        url += '/win&T=1';
        break;
      case Actions.OFF:
        url += '/win&T=0';
        break;
      case Actions.TOGGLE:
        url += '/win&T=2';
        break;
      case Actions.LIGHT_EFFECT:
        url += '/win&FX=' + options.effect;
        break;
      default:
        return reject(new Error(`Action ${action} not implemented/supported for wled`));
    }
    console.log(url);
    return fetch(url, { mode: 'no-cors' })
    .then(checkStatus);
  });
}
