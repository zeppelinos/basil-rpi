const Web3 = require('web3');
const BasilAbi = require('../abi/Basil.json');
const TruffleContract = require('truffle-contract');
const BasilContract = TruffleContract(BasilAbi);
const { PROVIDER_URL, BASIL_ADDRESS } = require('constants');

const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
BasilContract.setProvider(provider);

class Basil {
  constructor() {
    this.contract = BasilContract.at(BASIL_ADDRESS);
    this.newDonationEvent = this.contract.NewDonation({}, { fromBlock: 0, toBlock: 'latest' });
  }

  watchDonations(cb) {
    this.newDonationEvent.watch(cb);
  }
}

module.exports = Basil;
