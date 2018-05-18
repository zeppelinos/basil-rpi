const LOG_PATH = './tasklog'
const fs = require('fs')

class Tasklog {

  existsInLog(tx) {
    const file = fs.readFileSync(LOG_PATH, 'utf8')
    return file.indexOf(tx) != -1
  }

  writeToLog(tx) {
    fs.appendFile(LOG_PATH, `${tx}\n`, 'utf8', function(err) {
      if(err) console.log('Tasklog: Error saving tasklog')
      else console.log('Tasklog: tasklog saved')
    })
  }
}

module.exports = Tasklog;
