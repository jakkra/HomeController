import { DeviceTypes } from './constants';

export const mirrorUrl = 'http://192.168.1.98:3001';

export const smhiCoord = {
  longitude: 12.987,
  latitude: 55.61,
};

export const temperatureSources = [{ key: '4', name: 'vardagsrum' }, { key: 'inside', name: 'lekrum' }];

export const gardenSources = [{ key: '5', name: 'Tomater' }, { key: '6', name: 'Spenat' }, { key: '7', name: 'Sallad' }, ];

export const octoiApiKey = '8D3D293D2413424582B79BDE1FD108A8';

export const rooms = [
  {
    name: 'Vardagsrum',
    groups: [
      {
        groupName: 'HUE',
        devices: [
          {
            name: 'Trappa-Spot',
            id: 8,
            type: DeviceTypes.HUE,
            hueName: 'Vardagsrum-trappa-spot',
          },
          {
            name: 'Soffa-Spot',
            id: 9,
            type: DeviceTypes.HUE,
            hueName: 'Vardagsrum-soffa-spot',
          },
          {
            name: 'Matbord',
            id: 78,
            type: DeviceTypes.HUE,
            hueName: 'Vardagsrum-matbord',
          },
        ],
      },
      {
        groupName: 'OTHER',
        devices: [
          {
            name: 'Hörnlampa',
            id: 7,
            type: DeviceTypes.TASMOTA_OUTLET,
            ip: 'http://192.168.1.129',
          },
          /*{
            name:"Klocka",
            id:12,
            type:DeviceTypes.TASMOTA_OUTLET,
            ip:"http://192.168.1.208"
          },*/
          {
            name: 'Golvlampa',
            id: 13,
            type: DeviceTypes.TASMOTA_OUTLET,
            ip: 'http://192.168.1.188',
          },
          {
            name: 'TV',
            id: 98,
            type: DeviceTypes.TOGGLE,
            ip: 'http://192.168.1.180:80/msg?code=4C:RC5:12',
          },
          {
            name: 'Hyperion',
            id: 99,
            type: DeviceTypes.HYPERION,
            ip: 'http://192.168.1.30:8080',
          },
        ],
      },
    ],
  },
  {
    name: 'Kök',
    groups: [
      {
        groupName: 'WLED',
        devices: [
          {
            name: 'Slinga',
            id: 2,
            type: DeviceTypes.WLED,
            ip: 'http://192.168.1.187',
          },
        ],
      },
      {
        groupName: 'OTHER',
        devices: [
          {
            name: 'Kattskål',
            id: 2,
            type: DeviceTypes.TOGGLE,
            ip: 'http://192.168.1.26/feed',
          },
        ],
      },
    ],
    other: {
      name: 'Kaffekokare',
      id: 11,
      type: DeviceTypes.RF_OUTLET,
      urlOn: 'http://192.168.1.98:3001/api/serial/outlet:4:1',
      urlOff: 'http://192.168.1.98:3001/api/serial/outlet:4:0',
    },
  },
  {
    name: 'Sovrum',
    groups: [
      {
        groupName: 'HUE',
        devices: [
          {
            name: 'Taklampa',
            id: 5,
            type: DeviceTypes.HUE,
            hueName: 'Sovrum-tak',
          },
          {
            name: 'Spot',
            id: 16,
            type: DeviceTypes.HUE,
            hueName: 'Sovrum-spot',
          },
          {
            name: 'Spot spegel',
            id: 77,
            type: DeviceTypes.HUE,
            hueName: 'Sovrum-spot-mirror',
          },
        ],
      },
      {
        groupName: 'OTHER',
        devices: [
          {
            name: 'Ljusslinga',
            id: 6,
            type: DeviceTypes.TASMOTA_OUTLET,
            ip: 'http://192.168.1.199',
          },
        ],
      },
    ],
  },
  {
    name: 'Lekrum',
    groups: [
      {
        groupName: 'WLED',
        devices: [
          {
            name: 'Falcon',
            id: 1,
            type: DeviceTypes.WLED,
            ip: 'http://192.168.1.33',
          },
          {
            name: 'Skrivare',
            id: 3,
            type: DeviceTypes.WLED,
            ip: 'http://192.168.1.196',
          },
          {
            name: 'Skrivbord',
            id: 4,
            type: DeviceTypes.WLED,
            ip: 'http://192.168.1.62',
          },
        ],
      },
      {
        groupName: 'HUE',
        devices: [
          {
            name: 'Spot Skrivbord',
            id: 13,
            type: DeviceTypes.HUE,
            hueName: 'Lekrum-spot-right',
          },
          {
            name: 'Spot Mitten',
            id: 14,
            type: DeviceTypes.HUE,
            hueName: 'Lekrum-spot-middle',
          },
          {
            name: 'Spot Vänster',
            id: 15,
            type: DeviceTypes.HUE,
            hueName: 'Lekrum-spot-left',
          },
        ],
      },
    ],
  },
  {
    name: 'Allrum',
    groups: [
      {
        groupName: 'HUE',
        devices: [
          {
            name: 'Spot fotölj',
            id: 71,
            type: DeviceTypes.HUE,
            hueName: 'Allrum-spot-chair',
          },
          {
            name: 'Spot spegel',
            id: 70,
            type: DeviceTypes.HUE,
            hueName: 'Allrum-spot-mirror',
          },
        ],
      },
      {
        groupName: 'OTHER',
        devices: [
          {
            name: 'Bordslampa',
            id: 6,
            type: DeviceTypes.TASMOTA_OUTLET,
            ip: 'http://192.168.1.208',
          },
        ],
      },
    ],
  },
];
