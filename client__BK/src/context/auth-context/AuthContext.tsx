import {createContext,useState,useEffect,FC,useCallback} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContextState,IAuth } from './types'

const contextDefaultValues: AuthContextState={
  authDetail:{
    token: "",
    userId: "",
    tokenExpiration:0
  },
  login: () => { },
  register:()=>{},
  logout:()=>{},
}

export const AuthContext = createContext<AuthContextState>(
  contextDefaultValues,
)

const AuthProvider: FC=({children}) =>
{
  const navigate=useNavigate();
  const [authDetail,setAuthDetail]=useState<IAuth>(contextDefaultValues?.authDetail)
  const login=useCallback(async (requestBody: object) =>
  {
    const res=await fetch('http://localhost:4000/graphql',{
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const resBody=await res.json();
    let obj={
      userId: resBody?.data?.login?.userId,
      token: resBody?.data?.login?.token,
      tokenExpiration: resBody?.data?.login?.tokenExpiration
    };
    setAuthDetail(obj);
     const authDetailLocal: IAuth=JSON.parse(localStorage.getItem('authDetailLocal')||"{}")
    if (!!authDetailLocal) {
      localStorage.setItem('authDetailLocal', JSON.stringify(obj))
    }
    // localStorage.setItem('authDetailLocal', JSON.stringify(obj))
  },[]);
  const register=useCallback(async (requestBody:object) =>
  {
      // const res=await fetch('http://localhost:4000/graphql',{
      //       method: "POST",
      //       body: JSON.stringify(requestBody),
      //       headers: {
      //           "Content-Type": "application/json"
      //       }
      //   });
        // const resBody=await res.json();
  },[])
  const logout=() => {
    localStorage.removeItem('authDetailLocal');    
    setAuthDetail(contextDefaultValues?.authDetail)
    navigate('/auth')
  }

  useEffect(() => {
    const authDetailLocal: IAuth=JSON.parse(localStorage.getItem('authDetailLocal')||"{}")
    if(!!!authDetail?.token?.length && Object.values(authDetailLocal)?.length ) {
      setAuthDetail(authDetailLocal)
    }
  }, [authDetail])

  return (
    <AuthContext.Provider
      value={{
        authDetail,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
