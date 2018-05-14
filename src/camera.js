const axios = require('axios');
const { CAMERA_ID, CAMERA_IP } = require('./constants');

class Camera {
  constructor() {
    this.baseURL = `${CAMERA_IP}/${CAMERA_ID}`
  }

  takePicture() {
    return axios.get(`${this.baseURL}/action/snapshot`);
  }
}

module.exports=Camera;
