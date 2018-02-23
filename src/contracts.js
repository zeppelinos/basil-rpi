const providerUrl = 'http://ropsten.smartcontracts.xyz:8565/';
const basilAddress = "0x4103dee0e21ad2d2181a887034fe52fe446f7f25";

const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider(providerUrl);
const web3 = new Web3(provider);

const TruffleContract = require('truffle-contract');
const BasilAbi = require('../abi/Basil.json');
const Basil = TruffleContract(BasilAbi);
Basil.setProvider(provider);

const basil = Basil.at(basilAddress);
const newDonationEvent = basil.NewDonation({}, { fromBlock: 0, toBlock: 'latest' });

const watch = function(cb) {
  newDonationEvent.watch(cb);
}

module.exports = {
  watch: watch
}