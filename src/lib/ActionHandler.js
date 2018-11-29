import { Actions, DeviceTypes } from '../constants';

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

export function handleLightAction(light, action) {
  switch (light.type) {
    case DeviceTypes.WLED:
      return handleWled(light, action);
    case DeviceTypes.HUE:
      return handleHue(light, action);
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

function handleHue(light, action) {
  return new Promise((resolve, reject) => {
    return resolve();
  });
}

function handleWled(light, action) {
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
      default:
        return reject(new Error(`Action ${action} not implemented/supported for wled`));
    }
    console.log(url);
    return fetch(url, { mode: 'no-cors' })
    .then(checkStatus);
  });
}
