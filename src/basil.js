const BasilAbi = require('../abi/Basil.json');
const TruffleContract = require('truffle-contract');
const BasilContract = TruffleContract(BasilAbi);
const { BASIL_ADDRESS } = require('./constants');

class Basil {

  findNewDonations(provider, cb) {

    BasilContract.setProvider(provider);
    this.contract = BasilContract.at(BASIL_ADDRESS);

    this.newDonationEvent = this.contract.NewDonation({}, { fromBlock: 0, toBlock: 'latest' });
    this.newDonationEvent.get(cb);
  }
}

module.exports = Basil;
