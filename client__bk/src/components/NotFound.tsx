import {FC} from 'react';
import {NavLink} from 'react-router-dom'
const NotFound: FC=():JSX.Element => <h1>Page you are looking is not found, <NavLink to='/'>click here</NavLink> to redirect to Home</h1>;
export default NotFound;
