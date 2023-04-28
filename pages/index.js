import React,{Component} from 'react';
import factory from '../ethereum/factory';
import Campaign from '../ethereum/campaign';
import {Popup,Card , Button, Image, Icon} from 'semantic-ui-react';
import LayoutMainPage from '../components/LayoutMainPage';
import Link from 'next/Link';

class CampaignIndex extends Component{
 static async getInitialProps(){
   const campaigns = await factory.methods.getDeployedCampaigns().call();
   var names=[];
   var desc=[];
   var img=[];

  for(var i=0; i<campaigns.length; i++){
  const campaign = Campaign(campaigns[i]);
  names.push(await campaign.methods.CampaignName().call());
  desc.push(await campaign.methods.CampaignDescription().call());
  img.push(await campaign.methods.imageUrl().call());
  }


   return {campaigns,names,img,desc};
 }



 getCard(address,name,description,imgurl){
return(
  <Popup
    trigger={
      <Link href={`/campaigns/${address}`}>
      <Card  id="plc-link">
        <Image src={imgurl} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{name}</Card.Header>

          <Card.Description>
            {description}
          </Card.Description>
        </Card.Content>
      </Card>
      </Link>
    }

  >
<Popup.Header>{address}</Popup.Header>

  </Popup>

);
 }

renderCampaigns(){

  var items=[];
  for(var i=0; i<this.props.campaigns.length; i++){
     items.push(this.getCard(this.props.campaigns[i],this.props.names[i],this.props.desc[i],this.props.img[i]));
  }

   return (
     <Card.Group>
     {items}

    </Card.Group>);

  }

  render(){
    return(
    <LayoutMainPage>
    <div>
    <h1>Charity Organisations for donations</h1>

    {this.renderCampaigns()}
    </div>
    </LayoutMainPage>
  );
  }
}

export default CampaignIndex;
