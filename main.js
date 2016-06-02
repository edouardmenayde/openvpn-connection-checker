'use strict';

const electron      = require('electron');
const app           = electron.app;
const Tray          = electron.Tray;
const Menu          = electron.Menu;

const path = app.getPath('exe').slice(0, -26) + 'resources/app/';

const utilities = require(path + 'utilities');

const unlockedImage = path + 'unlocked.png';
const lockedImage   = path + 'locked.png';
const noVpnMessage  = 'No vpn connected';

class Application {

  setTrayIcon () {
    utilities.getVpnTunnelStatus()
      .then(vpnIP => {
        this.appTray.setImage(lockedImage);
        this.appTray.setToolTip(vpnIP);
      })
      .catch(() => {
        this.appTray.setImage(unlockedImage);
        this.appTray.setToolTip(noVpnMessage);
      });
  }

  createTray () {

    var contextMenu = Menu.buildFromTemplate([
      {
        label: 'Quit',
        type : 'normal',
        click: function () {
          app.quit();
        }
      }
    ]);

    this.appTray    = new Tray(unlockedImage);
    this.appTray.setContextMenu(contextMenu);
    this.appTray.setToolTip(noVpnMessage);

    setInterval(() => {
      this.setTrayIcon();
    }, 1000);
  }

  constructor () {
    app.on('ready', () => {
      this.createTray();
    });
  }
}

new Application();
