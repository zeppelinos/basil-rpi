const LOG_PATH = './tasklog'

class Tasklog {

  existsInLog(tx) {
    const file = fs.readFileSync(LOG_PATH, 'utf8')
    return file.indexOf(tx) != -1
  }

  writeToLog(tx) {
    fs.appendFile(LOG_PATH, `${tx}\n`, 'utf8', function(err) {
      if(err) console.log('Worker: Error saving tasklog')
      else console.log('Worker: tasklog saved')
    })
  }

}
