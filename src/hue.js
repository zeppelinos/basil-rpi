const hue = require("node-hue-api");
const converter = require("@q42philips/hue-color-converter");
const HueApi = hue.HueApi;
const lightState = hue.lightState;
const { HUE_HOST, HUE_LED_ID, HUE_USERNAME } = require('./constants');

class Hue {
  constructor() {
    this.led = HUE_LED_ID;
    this.api = new HueApi(HUE_HOST, HUE_USERNAME);
  }

  setColor(red, green, blue) {
    return new Promise((resolve, reject) => {
      const xy = converter.calculateXY(red, green, blue)
      const state = lightState.create()
        .xy(xy)
      // console.log(`Hue: setting color ${JSON.stringify(state, null, 2)}`)
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
