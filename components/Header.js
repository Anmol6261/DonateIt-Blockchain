import React from 'react';
import {Menu} from 'semantic-ui-react';
// import {Link} from '../routes';
import Link from 'next/Link';

export default ()=>{
  return (
<div class="ui inverted segment">
  <div class="ui inverted secondary pointing menu">

      <Link href="/" className="item">
       DonateIt
      </Link>

      <div class="right item">
      
      <Link href="/tracking" className="ui inverted orange button" style={{
            width: "100px",
            height: "40px",
            marginRight: "15px"
          }}>Tracking</Link>

      <Link href="/" className="ui inverted button">
          Charity Organisations
      </Link>

      <Link href="/campaigns/new" className="ui inverted button">+</Link>

      </div>
  </div>
</div>


  // <Menu style={{marginTop:"10px"}}>
  //     <Link route="/">
  //      <a className="item"> DonateIt</a>
  //     </Link>
  //
    // <Menu.Menu position="right">
  //
  //   <Link route="/">
  //    <a className="item"> Charity Organisations</a>
  //   </Link>
  //
  //   <Link route="/campaigns/new">
  //    <a className="item">+</a>
  //   </Link>
  //
  //  </Menu.Menu>
  // </Menu>

  );
}
