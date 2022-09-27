import {FC,useContext} from 'react';
import {NavLink} from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
const NavigationComp: FC=(): JSX.Element =>
{
  const {authDetail,logout}=useContext(AuthContext);
  return <header>
    <div className="ui inverted menu">
      <div className="header item">EasyEvent</div>
      <div className='top-menu'>
          <NavLink className="item" to='/'>
            Home
          </NavLink>      
          {authDetail?.token&&<NavLink className="item" to='/bookings'>
            Bookings
          </NavLink>}
          <NavLink className="item" to='/events'>
            Events
          </NavLink>
      </div>
      <div className="bottom-menu">     
        {authDetail?.token? <span className="ui item" onClick={logout}>Logout</span>:<NavLink className="ui item" to='/auth' >Register /  Login
        </NavLink>}
      </div>
    </div>    
  </header>;
}
export default NavigationComp;