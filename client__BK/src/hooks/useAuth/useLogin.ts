import {useContext} from 'react';
import {AuthContext} from '../../context/auth-context/AuthContext'

const useLogin=() =>{
    const {authDetail}=useContext(AuthContext);
    return {
       authDetail
    }
    
}
export default useLogin;
