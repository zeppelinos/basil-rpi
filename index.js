#!/usr/bin/env node
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
var axios = require('axios');
var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;


//Hue helpers
var displayBridges = function(bridge) {
	console.log("Hue Bridges Found: " + JSON.stringify(bridge));
};

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

//Hue setup
var host = "192.168.1.145",
    username = "1hTTXvqyaRjI-uqhiLaPFTOA3ETJOqsX0avADHgT",
    api = new HueApi(host, username),
    state

//Hue play
state = lightState.create().on().rgb(0,255,0);

api.setLightState(5, state)
    .then(displayResult)
    .done();


// //Camera snapshot
axios.get('http://192.168.1.83:8080/0/action/snapshot');

// //Web3 listen
// var contract = web3.eth.contract(abi).at("0xe45866ac5d51067ce292bc656c790e94ddcf0766");
// var myEvent = contract.Evt({},{fromBlock: 0, toBlock: 'latest'});
// myEvent.watch(function(error, result){
//     console.log("on watch");
//     console.log(arguments);
// });
// // this call saves event data successfully!
// contract.deposit('hello there',function (res) {
//     console.log(arguments)
// });

console.log("oh!");
