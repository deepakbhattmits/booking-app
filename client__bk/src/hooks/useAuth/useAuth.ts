import {useContext} from 'react';
import {AuthContext} from '../../context/auth-context/AuthContext'

const useAuth=() =>{
    const {authDetail}=useContext(AuthContext);
    return {
       authDetail
    }
    
}
export default useAuth;
