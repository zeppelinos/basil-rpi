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
      self.setInit()
    }).done();
  }

  setInit() {
    if(!this.api) return;
    console.log(`Hue: init`)
    const state = lightState.create()
      .brightness(10)
      .xy(1, 1)
    this.setState(state)
  }

  setAlert() {
    if(!this.api) return;
    console.log(`Hue: alert`)
    const state = lightState.create()
      .brightness(50)
      .xy(1, 0)
      .alert('lselect')
    this.setState(state)
  }

  setColor(red, green, blue) {
    if(!this.api) return;
    console.log(`Hue: color`)
    const xy = converter.calculateXY(red, green, blue)
    const state = lightState.create()
      .brightness(100)
      .xy(xy)
    this.setState(state)
  }

  setState(state) {
    console.log('Hue: setState', state)
    this.api.setLightState(this.led, state, function(err, lights) {
      if(err) {
        console.log(`Hue: Error setting light: ${err}`)
      }
      else {
        console.log(`Hue: result ${lights}`);    
      }
    })
  }
}

module.exports = Hue
