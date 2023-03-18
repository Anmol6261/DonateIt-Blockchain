import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance= new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x669feB0B0BC04D991e370BA87329180a9740fB5d'
);

export default instance;
