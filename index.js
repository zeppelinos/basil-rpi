#!/usr/bin/env node
require('dotenv').config()
const process = require('process');
const Hue = require('./src/hue');
const Basil = require('./src/basil');
const Camera = require('./src/camera');
const Worker = require('./src/worker');
const Twitter = require('./src/twitter');

const INTERVAL = 10000;

const queue = [];
const hue = new Hue();
const camera = new Camera();
const tweety = new Twitter();

// Listen for donation events
const basil = new Basil();
basil.watchDonations((error, result) => {
  if (error) {
    console.error("Error watching events", error);
    // TODO: Do something here!
  } else {
    console.log(`Adding transaction ${result.transactionHash} to queue`);
    queue.push(result);
  }
});

// Get the worker to work!
const worker = new Worker(queue, hue, camera, tweety, basil);
const interval = setInterval(() => worker.work(), INTERVAL);

// Do any cleanup needed
process.on('SIGTERM', function () {
  console.log("Terminating on user signal");
  clearInterval(interval);
  process.exit(0);
});
