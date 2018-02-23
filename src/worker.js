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
    const { r, g, b } = task.args;
    
    // Apologies for the callback hell here, but hue works with Q promises, 
    // instead of real promises, so we can't combine them
    
    // Change light color
    this.hue.setColor(r.toNumber(), g.toNumber(), b.toNumber()).then(() => {
      // Wait 5s for the light to actually change
      setTimeout(() => {
        // Take a picture
        this.camera.takePicture().then(() => {
          // Upload tweet!
          return this.tweety.tweet('~/motion/lastsnap.jpg', `Basil updated from ${task.address}`);
        }).then(() => {
          console.log(`Worker: Finished task ${task.transactionHash}`)
        });
      }, 5000) 
    })
    .fail((err) => {
      console.error(`Worker: error running task ${task.transactionHash}`, err)
    })
    .done(); // Hue works with Q promises, so we need to call done to ensure errors are bubbled if needed
  }
}

module.exports = Worker;