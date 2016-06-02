'use strict';

const route = require('iproute').route;

module.exports = {
  getVpnTunnelStatus: function () {
    return new Promise((resolve, reject) => {
      route.show({table: 'all'}, (error, routes) => {

        if (error) {
          return reject();
        }

        var gateway;
        var vpnIP;

        for (let index = 0; index < routes.length; index++) {
          if (routes[index].to === 'default') {
            gateway = routes[index].via;
            break;
          }
        }

        for (let index = 0; index < routes.length; index++) {
          if (routes[index].via == gateway && routes[index].to != 'default') {
            vpnIP = routes[index].to;
            break;
          }
        }

        if (!vpnIP) {
          return reject();
        }

        return resolve(vpnIP);
      });
    });
  }
};
