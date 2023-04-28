import React,{useState,useEffect} from 'react';
import Header from './Header';
import Head from 'next/head';
import {Container} from 'semantic-ui-react';
//import {Link} from '../routes';
import Link from 'next/Link';
import {Menu} from 'semantic-ui-react';
export default (props) =>{

    const [visible, setVisible] = useState(true);

    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 0){
        setVisible(false)
      }
      else if (scrolled <= 0){
        setVisible(true)
      }
    };

//     const scrollToBottom = () =>{
//     window.scrollTo({
//     top: document.documentElement.scrollHeight,
//     behavior: 'smooth'
//   });
// };

const scrollToBottom=()=>{
  // var e;
  // useEffect(() => {
  //    e = document.getElementById("mera-container").scrollIntoView({
  //   behavior: 'smooth'
  // });
  //  e.scrollIntoView(false);
  // }, []);

  window.scrollTo({
    top: 680,
    behavior: 'smooth'
  })

}



useEffect(() => {
  window.addEventListener('scrolls', toggleVisible);
}, []);




return(
  <div>
  <Head>
  <link async rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/semantic-ui-react/dist/umd/semantic-ui-react.min.js"></script>

  </Head>
  <div class="ui inverted vertical masthead center aligned segment" id="div1">
  <div id="leaves">
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </div>
      <div class="ui container">
        <div class="ui large secondary inverted pointing menu">
          <a class="toc item">
            <i class="sidebar icon"></i>
          </a>
          <Link href="/" className="active item" >DonateIt
          </Link>

          

          <div class="right item">
          
          <Link href="/tracking" className="ui inverted orange button" style={{
            width: "100px",
            height: "40px",
            marginRight: "15px"
          }}>Tracking</Link>

          <Link href="/campaigns/new" className="ui inverted button">
             New Charity Registration
          </Link>

          <Link href="/campaigns/new" className="ui inverted button">+
          </Link>

          </div>
        </div>
      </div>

      <div class="ui text container" id="textContainer">
        <h1 class="ui inverted header">
          “No act of kindness, no matter how small, is ever wasted.”
        </h1>
        <h2>– Aesop</h2>
        <button onClick={scrollToBottom} class="ui inverted huge button" >Get Started <i class="right arrow icon"></i></button>
      </div>
    </div>
    <div class="ui hidden divider"></div>

  <Container id="parent-container">

  {props.children}

  </Container>
  <div class="ui hidden divider"></div>

  <div class="ui inverted vertical footer segment form-page">
    <div class="ui container">
      DonateIt 2022. All Rights Reserved
    </div>
  </div>

  </div>
);

};

  // <Header/> on line number 13
