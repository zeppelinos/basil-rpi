const hue = require("node-hue-api");
const HueApi = hue.HueApi;
const lightState = hue.lightState;
const { HUE_HOST, HUE_LED_ID, HUE_USERNAME } = require('constants');

class Hue {
  constructor() {
    this.led = HUE_LED_ID;
    this.api = new HueApi(HUE_HOST, HUE_USERNAME);
  }

  setColor(red, green, blue) {
    const state = lightState.create().on().rgb(red, green, blue);
    return this.api.setLightState(this.led, state).then(this._logResult);
  }

  displayBridges(bridge) {
    console.log("Hue Bridges Found: ", JSON.stringify(bridge));
  }

  _logResult(result) {
    console.log(JSON.stringify(result, null, 2));
  }
}

module.exports = Hue;
