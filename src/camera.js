var axios = require('axios');

class Camera {
  constructor() {
  }

  take_picture() {
    axios.get('http://192.168.1.83:8080/0/action/snapshot');
  }

}

module.exports=Camera;
