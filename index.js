#!/usr/bin/env node
require('dotenv').config()
const process = require('process');
const Hue = require('./src/hue');
const Basil = require('./src/basil');
const Camera = require('./src/camera');
const Worker = require('./src/worker');
const Twitter = require('./src/twitter');
const Connection = require('./src/connection');
const Tasklog = require('./src/tasklog');

const INTERVAL = 10000;

const queue = [];
const hue = new Hue();
const camera = new Camera();
const tweety = new Twitter();
const connection = new Connection();
const tasklog = new Tasklog();

// Listen for donation events
const basil = new Basil();

// Function to be executed on each timer tick
const execute = async () => {
  connection.connect()
    .then((provider) => {
      hue.setInit()
      basil.findNewDonations(provider, (error, results) => {
        if (error) {
          console.error("Error watching events", error);
        } else {
          console.log('Index: Looking for new events...')
          for(let i = 0; i < results.length; i++) {
            const result = results[i];
            if(!tasklog.existsInLog(result.transactionHash)) {
              console.log(`Adding transaction ${result.transactionHash} to queue`);
              tasklog.writeToLog(result.transactionHash);
              queue.push(result);
            }
            else {
              // console.log(`Task ${result.transactionHash} already executed, skipping`);  
            }
          }
          worker.work() 
        }
      });
    })
    .catch((err) => {
      console.log(`${err}`); 
      hue.setAlert()
    });
}

// Get the worker to work!
const worker = new Worker(queue, hue, camera, tweety, basil);
const interval = setInterval(
  execute,
  INTERVAL
);
execute();

// Do any cleanup needed
process.on('SIGTERM', function () {
  console.log("Terminating on user signal");
  clearInterval(interval);
  process.exit(0);
});
