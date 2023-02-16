import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance= new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xDc75d91A6Eb5e9195b789C0f9f94FeCe9F2D6cE8'
);

export default instance;
