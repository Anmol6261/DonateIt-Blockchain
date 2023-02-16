import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';

export default ()=>{
  return (
<div class="ui inverted segment">
  <div class="ui inverted secondary pointing menu">

      <Link route="/">
       <a className="item"> DonateIt</a>
      </Link>

      <div class="right item">
      <Link route="/">
         <a className="ui inverted button"> Charity Organisations</a>
      </Link>

      <Link route="/campaigns/new">
         <a className="ui inverted button">+</a>
      </Link>

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
