import { FC, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth-context'
const Auth: FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { authDetail, login } = useContext(AuthContext)
  const [inputs, setInputs] = useState<{ email: string; pwd: string }>({
    email: '',
    pwd: '',
  })
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: value })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { email, pwd } = inputs

    if (email?.trim()?.length === 0 || pwd?.trim()?.length === 0) {
      return
    }
    let requestBody = {
      query: `query login($email:String!,$pwd:String!) {
                                login(email: $email, password: $pwd) {
                                    userId
                                    token
                                    tokenExpiration
                                }
                            }`,
      variables: {
        email,
        pwd,
      },
    }
    if (!isLogin) {
      requestBody = {
        query: `mutation createUser($email:String!,$pwd:String!) {
                                createUser(email: $email, password: $pwd) {
                                    email
                                }
                            }`,
        variables: {
          email,
          pwd,
        },
      }
    }
    login(requestBody)
  }
  const handleSwitch = () => {
    setIsLogin((prevState) => !prevState)
  }
  useEffect(() => {
    if (authDetail?.token) {
      navigate('/')
    }
  }, [authDetail, navigate])
  return (
    <>
      <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div className="form-control">
          <label htmlFor="pwd">Password</label>
          <input type="password" name="pwd" onChange={handleChange} />
        </div>
        <div className="form-actions ">
          <button type="submit" className="ui button violet">
            {' '}
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
          <button
            type="button"
            className="ui button violet"
            onClick={handleSwitch}
          >
            Switch to {!isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </form>
    </>
  )
}
export default Auth
