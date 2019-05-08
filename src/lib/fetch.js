import { mirrorUrl, octoiApiKey } from '../config';

const checkStatus = res => {
  return new Promise((resolve, reject) => {
    if (res.status >= 200 || res.status === 409) {
      return resolve(res);
    } else {
      const error = new Error(`StatusCode: ${res.status}, message: ${res.statusText}`);
      return reject(error);
    }
  });
};

export function getTasks(callback) {
  const url = mirrorUrl + '/api/tasks';

  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .then(res => res.tasks);
}

export function createTask(title) {
  const url = mirrorUrl + '/api/tasks';

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ title: title }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(res => res.json())
    .then(json => {
      if (json.success !== true) {
        throw new Error();
      }
    });
}

export function getPlantMoistureLevel(callback) {
  const url = mirrorUrl + '/api/moisture/latest';

  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .then(res => (res.moisture.length > 0 ? res.moisture[0] : null));
}

export function getForecast(callback) {
  const url = mirrorUrl + '/api/forecast';

  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .then(res => res.forecast);
}

export function getJourney(callback) {
  const url = mirrorUrl + '/api/journey';
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .then(res => res.routes);
}

export function getTemperaturesSevenDays(source, callback) {
  const url = mirrorUrl + '/api/temperatures7days/' + source;

  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .then(res => res.temperatures);
}

export function getCurrentPlaying(callback) {
  const url = mirrorUrl + '/api/spotify/current';

  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .then(res => res.currentPlaying);
}


export function get3DPrinterState(callback) {
  const url = 'http://octopi.local/api/printer';
  const urlJob = 'http://octopi.local/api/job';

  var options = {
    method: "GET",
    headers: {
      'X-Api-Key': octoiApiKey,
    },
  };

  let state = null;
  return fetch(url, options)
    .then(checkStatus)
    .then(res => res.json())
    .then(json => {
      state = json;
      return fetch(urlJob, options)
    })
    .then(checkStatus)
    .then(res => res.json())
    .then(jobStatus => {
      return {
        state: state,
        job: jobStatus
      }
    });
}

