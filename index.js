#!/usr/bin/env node
require('dotenv').config()
const Twitter = require('./src/twitter');
const Hue = require('./src/hue');
const Camera = require('./src/camera');
const Basil = require('./src/contract');

// Set hue
var hue = new Hue();
hue.set_color(244,100,12);

// Take snapshot
const camera = new Camera();
// camera.take_picture();

// Tweet
const tweety = new Twitter();
//tweety.tweet('./snaps/lastsnap.jpg', 'lookin\' good!');

// Contract
const basil = new Basil();
basil.watchDonations((error, result) => {
  queue.push(result);
});

// Working queue and worker
const queue = [];
const worker = new Worker(queue, hue, camera, tweety, basil);

// Worker
setInterval(worker.work, 5000);