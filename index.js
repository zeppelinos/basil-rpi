#!/usr/bin/env node
require('dotenv').config()
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
var axios = require('axios');
// var hue = require("node-hue-api"),
//     HueApi = hue.HueApi,
//     lightState = hue.lightState;
var Twitter = require('./src/twitter');

var Hue = require('./src/hue');

var hue = new Hue();
hue.set_color(0,244,0);


// Camera snapshot
axios.get('http://192.168.1.83:8080/0/action/snapshot');

// Tweet
var tweety = new Twitter();
//tweety.tweet('./snaps/lastsnap.jpg', 'lookin\' good!');


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
