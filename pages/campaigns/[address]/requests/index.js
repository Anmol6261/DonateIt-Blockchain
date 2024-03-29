import React,{Component} from 'react';
import Layout from '../../../../components/Layout';
import {Button,Table} from 'semantic-ui-react';
import Link from 'next/Link';
import Campaign from '../../../../ethereum/campaign';
import RequestRow from '../../../../components/RequestRow';

class RequestIndex extends Component{
static async getInitialProps(props){
  const {address} =props.query;
  const campaign = Campaign(address);
  const requestCount=await campaign.methods.getRequestsCount().call();
  const approversCount=await campaign.methods.approversCount().call();
  const requests=await Promise.all(
    Array(parseInt(requestCount)).fill().map((element,index)=>{
      return campaign.methods.requests(index).call();
    })
  );

  return {address,requests, requestCount, approversCount};
}

renderRows(){
  return this.props.requests.map((request,index)=>{
    return <RequestRow
    request={request}
    id={index}
    key={index}
    address={this.props.address}
    approversCount={this.props.approversCount}
    />;
  });
}

  render(){
    const {Header,Row,HeaderCell,Body}=Table;
    return(
      <Layout>
        <h3> Transactions</h3>
        <Link href={`/campaigns/${this.props.address}/requests/new`}>
           <Button primary floated="right" style={{marginBottom: 10}}>Add Transaction</Button>
        </Link>
        <Table>
          <Header>
           <Row>
           <HeaderCell>ID</HeaderCell>
           <HeaderCell>Description</HeaderCell>
           <HeaderCell>Amount</HeaderCell>
           <HeaderCell>Recipient</HeaderCell>
           <HeaderCell>Finalize</HeaderCell>
           </Row>

         </Header>
         <Body>
         {this.renderRows()}
         </Body>
        </Table>
        <div> Found {this.props.requestCount} Transaction(s).</div>
        <div id="addfoot"></div>
      </Layout>
    );
  }
}

export default RequestIndex;
