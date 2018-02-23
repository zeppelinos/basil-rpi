var hue = require("node-hue-api"),
  HueApi = hue.HueApi,
  lightState = hue.lightState;


class Hue {
  constructor() {
    const host = "192.168.1.145";
    const username = "1hTTXvqyaRjI-uqhiLaPFTOA3ETJOqsX0avADHgT";
    this.api = new HueApi(host, username);
    var state;
  }

  displayBridges(bridge) {
    console.log("Hue Bridges Found: " + JSON.stringify(bridge));
  };

  displayResult(result) {
    console.log(JSON.stringify(result, null, 2));
  };

  setColor(red, green, blue) {
    var state = lightState.create().on().rgb(red, green, blue);

    this.api.setLightState(5, state) //5 is our particular LED ID in the hub
      .then(this.displayResult)
      .done();
  }
}

module.exports = Hue;
