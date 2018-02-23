var axios = require('axios');

class Camera {
  constructor() {
  }

  takePicture() {
    return axios.get('http://localhost:8080/0/action/snapshot');
  }

}

module.exports=Camera;
