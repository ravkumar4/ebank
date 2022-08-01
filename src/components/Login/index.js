import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const Login = props => {
  const {history} = props
  const [userId, setUserId] = useState('')
  const [pin, setPin] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [showErrMsg, setShowErrMsg] = useState(false)

  const submitLoginForm = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/ebank/login'
    const userDetails = {userId, pin}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    console.log(responseData)
    if (response.ok) {
      Cookies.set('jwt_token', JSON.stringify(responseData.jwt_token), {
        expires: 1,
      })
      history.replace('/')
    } else {
      setShowErrMsg(true)
      setErrMsg(responseData.error_msg)
    }
  }

  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Redirect to="/ebank/login" />
  }

  const onChangeUserId = event => setUserId(event.target.value)

  const onChangePin = event => setPin(event.target.value)

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="left-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-image"
          />
        </div>
        <form className="form" onSubmit={submitLoginForm}>
          <h1 className="login-heading">Welcome Back!</h1>
          <label className="user-id-label" htmlFor="userId">
            User Id
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            placeholder="Enter User ID"
            className="user-id-input"
            onChange={onChangeUserId}
          />
          <label htmlFor="pin" className="label-pin">
            PIN
          </label>
          <input
            type="password"
            id="pin"
            value={pin}
            placeholder="Enter PIN"
            className="user-id-pin"
            onChange={onChangePin}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrMsg && <p className="error-message">{errMsg}</p>}
        </form>
      </div>
    </div>
  )
}
export default Login
