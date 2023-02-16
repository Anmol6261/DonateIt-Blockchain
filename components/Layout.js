import React from 'react';
import Header from './Header';
import Head from 'next/head';
import {Container} from 'semantic-ui-react';

export default (props) =>{
return(
  <div>
  <Head>
  <link async rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/semantic-ui-react/dist/umd/semantic-ui-react.min.js"></script>
  </Head>
  <Header/>
  <Container>

  {props.children}

  </Container>
  <div class="ui inverted vertical footer segment form-page" id="footerr">
    <div class="ui container">
      DonateIt 2022. All Rights Reserved
    </div>
  </div>
  </div>

);

};

  // <Header/> on line number 13
