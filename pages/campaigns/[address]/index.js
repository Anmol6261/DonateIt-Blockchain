import React,{Component} from 'react';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import {Card, Grid, Button} from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import ContributeForm from '../../../components/ContributeForm';
import Link from 'next/Link';

class CampaignShow extends Component{
 static async getInitialProps(props){
   const campaign= Campaign(props.query.address);
   const name= await campaign.methods.CampaignName().call();
    const des= await campaign.methods.CampaignDescription().call();
  const summary= await campaign.methods.getSummary().call();

   return  {
     address: props.query.address,
     minimumContribution: summary[0],
     balance: summary[1],
     requestsCount: summary[2],
     approversCount: summary[3],
     manager: summary[4],
     name: name,
     description: des
   };

 }

 renederCards(){
   const{
     balance,
     minimumContribution,
     manager,
     requestsCount,
     approversCount,
     name,
     description
   }=this.props;

   const items = [
     {
       header:name,
       meta: 'Name of the Organisation',
       description: description,
       style:{overflowWrap: 'break-word'}
     },
     {
       header:manager,
       meta: 'Address of the Organisation',
       description: 'This is the address of the Charity Organisation. Charity Organisations can make transactions to spend the collected money to a recipient from this address to buy supplies for the organisation. Only this address can make a spending transaction.',
       style:{overflowWrap: 'break-word'}
     },

     {
       header: minimumContribution,
       meta: 'Minimum Contribution (wei)',
       description:'The amount of donation should be greater than this amount.',
     },
     {
       header: requestsCount,
       meta: 'Transactions till date',
       description:'A transaction is made by the organisation to withdraw money from the contract'
     },
     {
       header: approversCount,
       meta: 'Number of Donors',
       description: 'Number of people who have already donated to this Charity organisation.'
     },
     {
       header: web3.utils.fromWei(balance,'ether'),
       meta: 'Organisation Balance (ether)',
       description: 'The balance is how much money this organisation has left to spend.'
     }
   ];
return <Card.Group items={items} />
 }

  render(){
    return (
      <Layout>
      <h3>Charity Details</h3>
      <Grid>
        <Grid.Row>

        <Grid.Column width={10}>
          {this.renederCards()}
         </Grid.Column>

         <Grid.Column width={6}>
          <ContributeForm address={this.props.address}/>
        </Grid.Column>

        </Grid.Row>

        <Grid.Row>
         <Grid.Column>
         <Link href={`/campaigns/${this.props.address}/requests`}>
           <Button primary>View Transactions</Button>
         </Link>
          </Grid.Column>
        </Grid.Row>


       </Grid>
       <div id="showfoot"></div>
      </Layout>

    );
  }
}

export default CampaignShow;
