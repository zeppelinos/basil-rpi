const { CAMERA_PICTURE_PATH } = require('./constants')

class Worker {

  // TODO: Store last block processed and restore it when working

  constructor(queue, hue, camera, tweety, basil) {
    this.queue = queue;
    this.hue = hue;
    this.camera = camera;
    this.tweety = tweety;
    this.basil = basil;
    this.lastBlock = 0;
  }

  // Empty the queue until we find a valid task to run or the queue is emptied
  work(event) {
    while (true) {
      const task = this.queue.shift();
      if (!task) {
        console.log("Worker: no tasks to run");
        return;
      }
      if (task.blockNumber < this.lastBlock) {
        console.log(`Worker: skipping task from block ${task.blockNumber}`);
        continue;
      }

      return this.runTask(task);
    }
  }

  // Run a task associated to a single transaction
  runTask(task) {

    const { donor, r, g, b } = task.args;
    console.log(`Worker: processing task: ${donor}, ${r.toNumber()}, ${g.toNumber()}, ${b.toNumber()}`);
    
    // Change light color
    console.log(`Worker: setting hue color...`);
    this.hue.setColor(r.toNumber(), g.toNumber(), b.toNumber())
    console.log(`Worker: hue color set`);

    // Wait 5s for the light to actually change
    console.log(`Worker: Waiting 5s...`);
    setTimeout(() => {
      
      // Take a picture
      console.log(`Worker: Taking picture...`);
      this.camera.takePicture().then(() => {
        console.log(`Worker: Picture taken`);
         
        // Upload tweet!
        console.log(`Worker: Waiting 5s...`);
        setTimeout(() => {
          console.log(`Worker: Tweeting...`)
          return this.tweety.tweet(CAMERA_PICTURE_PATH, `Basil updated from ${donor}`);
        }, 5000)

      }).then(() => {
        console.log(`Worker: Finished task ${task.transactionHash}`)
      });
    }, 5000)
  }
}

module.exports = Worker;
