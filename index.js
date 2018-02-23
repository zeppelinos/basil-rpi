#!/usr/bin/env node
require('dotenv').config()
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));

var Twitter = require('./src/twitter');
var Hue = require('./src/hue');
var Camera = require('./src/camera');

// Set hue
var hue = new Hue();
hue.set_color(244,100,12);

// Take snapshot
var camera = new Camera();
camera.take_picture();

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
