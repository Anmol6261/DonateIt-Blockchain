import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance= new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x8A6680c235f1148Ae2428bD0Ec6ce6e1fd0C54C9'
);

export default instance;
