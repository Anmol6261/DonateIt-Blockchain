import React,{Component} from 'react';
import factory from '../ethereum/factory';
import Campaign from '../ethereum/campaign';
import {Popup,Card , Button, Image, Icon} from 'semantic-ui-react';
import LayoutMainPage from '../components/LayoutMainPage';
import {Link} from '../routes';

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

  // console.log(img);

   return {campaigns,names,img,desc};
 }



 getCard(address,name,description,imgurl){
return(
  <Popup
    trigger={
      <Card  id="plc-link">
        <Image src={imgurl} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{name}</Card.Header>

          <Card.Description>
            {description}
          </Card.Description>
        </Card.Content>
      </Card>
    }

  >
<Popup.Header>{address}</Popup.Header>

  </Popup>

//   <Card class="card1" itemsPerRow = {3}>
//   <Image src={imgurl} wrapped ui={false} />
//   <Card.Content>
//     <Card.Header>{name}</Card.Header>
//     <Card.Meta ><p>{address}</p></Card.Meta>
//     <Card.Description>
//       {description}
//     </Card.Description>
//   </Card.Content>
//   <Card.Content extra>
//     <a>
//       <Icon name='search' />
//       <b>Organisation description</b>
//     </a>
//   </Card.Content>
// </Card>
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


//  renderCampaigns(){
//
//     return (
//
//       <Card.Group itemsPerRow={2} stackable={true} doubling={true}>
//         {this.props.campaigns.map(address => (
//           <Card key={address} className="fluid">
//             <Card.Content>
//               <Card.Header>orgy 1</Card.Header>
//               <p>{address}</p>
//               <p>Some more description</p>
//               <Link route={`/campaigns/${address}`}>
//               <a >View Charity Organisation</a>
//               </Link>
//             </Card.Content>
//           </Card>
//         ))}
//       </Card.Group>
//     );
// }

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
