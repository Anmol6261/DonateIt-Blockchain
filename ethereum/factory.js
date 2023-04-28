import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance= new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xff044c8031C0bfAd822E919cE8baf22D509C8460'
);

export default instance;
