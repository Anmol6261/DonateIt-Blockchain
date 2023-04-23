import React,{Component} from 'react';
import Layout from '../../components/Layout';
import {Button, Form, Input, Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import Router from 'next/router';

class CampaignNew extends Component{
  state ={
    minimumContribution: '',
    name:'',
    desc:'',
    img:'',
    errorMessage:'',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({loading: true, errorMessage:''});
    try{
    const accounts= await web3.eth.getAccounts();
    await factory.methods.createCampaign(this.state.minimumContribution,this.state.name,this.state.desc,this.state.img)
     .send({
       from: accounts[0]
     });
     Router.pushRoute('/');
   }
   catch(err){
     this.setState({errorMessage: err.message});
   }
   this.setState({loading: false});
  }

  render(){

    return (
    <Layout>
    <div class="ui hidden divider"></div>
     <h3 >Register a Charity Organisation</h3>
     <div class="ui hidden divider"></div>

     <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
      <Form.Field>
       <label>Minimum donation</label>
       <Input
       label="wei"
       labelPosition="right"
       value={this.state.minimumContribution}
       onChange={event=>this.setState({minimumContribution: event.target.value})}
       />
       <label>Name of the Charity Organisation</label>
       <Input
       value={this.state.name}
       onChange={event=>this.setState({name: event.target.value})}
       />
       <label>Description of the Charity Organisation</label>
       <Input
       value={this.state.desc}
       onChange={event=>this.setState({desc: event.target.value})}
       />
       <label>Img Url</label>
       <Input
       value={this.state.img}
       onChange={event=>this.setState({img: event.target.value})}
       />
      </Form.Field>
      <Message error header="Oops!" content={this.state.errorMessage} />
      <div class="ui hidden divider"></div>

      <Button loading={this.state.loading} primary>Register</Button>

     </Form>
     <div id="regisfoot"></div>
    </Layout>
    );
  }
}

export default CampaignNew;
