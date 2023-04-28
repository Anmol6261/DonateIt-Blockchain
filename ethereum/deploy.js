const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory= require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  //'olive van clog novel uniform twist dial file depth toward tree shove'
  'flat double burst chalk wagon glide bottom amazing law proud cargo unknown',
  // remember to change this to your own phrase!
  'https://sepolia.infura.io/v3/f547f32744d74fa48ddb661bae036dc3'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  try{
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });


  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
  } catch(error){
    console.error('Error deploying contract:', error);
  }
};
deploy();
