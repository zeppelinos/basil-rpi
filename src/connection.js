const Web3 = require('web3');
const { PROVIDER_URL } = require('./constants');

class Connection {

  connect() {
    return new Promise( (resolve, reject) => {
      
      console.log('Connection: Checking ethereum node connection...')
      const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
      const web3 = new Web3(provider);

      web3.net.getListening((err, res) => {
        if(err) {
          reject('Error connecting to web3 provider.');
          return
        }
        console.log(`Connection: Web3 provider connected: ${res}`);
        resolve(provider);
      })
    });
  } 
}
module.exports = Connection;
