import { DeviceTypes } from './constants';

export const mirrorUrl = 'http://192.168.1.98:3001';

export const rooms =
[
  {
    name:"Vardagsrum",
    groups:[
      {
        groupName:"WLED",
        lights:[
          {
            name:"Ljusstake",
            id:2,
            type:DeviceTypes.WLED,
            ip:"http://192.168.1.251"
          },

        ]
      },
      {
        groupName:"HUE",
        lights:[
          {
            name:"Trappa-Spot",
            id:8,
            type:DeviceTypes.HUE,
            hueName:"Vardagsrum-trappa-spot"
          },
          {
            name:"Soffa-Spot",
            id:9,
            type:DeviceTypes.HUE,
            hueName:"Vardagsrum-soffa-spot"
          }
        ]
      },
      {
        groupName:"OTHER",
        lights:[
          {
            name:"Hörnlampa",
            id:7,
            type:DeviceTypes.TASMOTA_OUTLET,
            ip:"http://192.168.1.129"
          },
          {
            name:"Klocka",
            id:12,
            type:DeviceTypes.TASMOTA_OUTLET,
            ip:"http://192.168.1.208"
          },
          {
            name:"Jul Slinga",
            id:12,
            type:DeviceTypes.TASMOTA_OUTLET,
            ip:"http://192.168.1.188"
          }
        ]
      }
    ],
    other:{
      name:"Kaffekokare",
      id:11,
      type:DeviceTypes.RF_OUTLET,
      urlOn:"http://192.168.1.98:3001/api/serial/outlet:4:1",
      urlOff:"http://192.168.1.98:3001/api/serial/outlet:4:0"
    }
  },
  {
    name:"Sovrum",
    groups:[
      {
        groupName:"HUE",
        lights:[
          {
            name:"Taklampa",
            id:5,
            type:DeviceTypes.HUE,
            hueName:"Sovrum-tak"
          }
        ]
      },
      {
        groupName:"OTHER",
        lights:[
          {
            name:"Ljusslinga",
            id:6,
            type:DeviceTypes.RF_OUTLET,
            url:"http://192.168.1.98:3001/api/serial/outlet:1:",

          }
        ]
      }
    ]
  },
  {
    name:"Lekrum",
    groups:[
      {
        groupName:"WLED",
        lights:[
          {
            name:"Falcon",
            id:1,
            type:DeviceTypes.WLED,
            ip:"http://192.168.1.33"
          },
          {
            name:"Skrivare",
            id:3,
            type:DeviceTypes.WLED,
            ip:"http://192.168.1.196"
          },
          {
            name:"Skrivbord",
            id:4,
            type:DeviceTypes.WLED,
            ip:"http://192.168.1.66"
          }
        ]
      },
      {
        groupName:"HUE",
        lights:[
          {
            name:"Spot Skrivbord",
            id:13,
            type:DeviceTypes.HUE,
            hueName:"Lekrum-spot-right"
          },
          {
            name:"Spot Mitten",
            id:14,
            type:DeviceTypes.HUE,
            hueName:"Lekrum-spot-middle"
          },
          {
            name:"Spot Vänster",
            id:15,
            type:DeviceTypes.HUE,
            hueName:"Lekrum-spot-left"
          }
        ]
      }
    ]
  },
]