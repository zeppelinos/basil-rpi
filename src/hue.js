const hue = require("node-hue-api");
const converter = require("@q42philips/hue-color-converter");
const HueApi = hue.HueApi;
const lightState = hue.lightState;
const { HUE_LED_ID, HUE_USERNAME } = require('./constants');

class Hue {
  constructor() {
    this.led = HUE_LED_ID;
    this.checkBridge()
  }

  checkBridge() {
    const self = this
    hue.nupnpSearch().then(function(bridges) {
      console.log("Hue Bridges Found: " + JSON.stringify(bridges));
      self.api = new HueApi(bridges[0].ipaddress, HUE_USERNAME)
      self.setColor(0, 255, 0)
    }).done();
  }

  setColor(red, green, blue) {
    return new Promise((resolve, reject) => {
      const xy = converter.calculateXY(red, green, blue)
      const state = lightState.create()
        .xy(xy)
      this.api.setLightState(this.led, state, function(err, lights) {
        if(err) {
          console.log(`Hue: Error setting light: ${err}`)
          reject()
        }
        else {
          console.log(`Hue: result ${lights}`);    
          resolve()
        }
      })
      resolve()
    })
  }
}

module.exports = Hue
