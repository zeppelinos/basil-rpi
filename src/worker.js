class Worker {
  constructor(queue, hue, camera, tweety, basil) {
    this.queue = queue;
    this.hue = hue;
    this.camera = camera;
    this.tweety = tweety;
    this.basil = basil;
  }

  work(event) {
    const task = queue.shift();
    if (!task) {
      console.log("Worker: no tasks to run");
      return;
    }
    this.runTask(task);
  }

  runTask(task) {

  }
}