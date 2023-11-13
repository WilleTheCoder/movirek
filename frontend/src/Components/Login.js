import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styling/login.css'
import Header from './Header'
import '../styling/global.css'

function Login() {

  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const showError = false;

  function checkInput(username, password) {
    if (username.length < 3 || password.length < 6) {
      return 'Too few characters';
    }

    return '';
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrorMsg(checkInput(usernameRef.current.value, passwordRef.current.value))

    if (errorMsg === '') {
      fetch('http://localhost:5000/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameRef.current.value, password: passwordRef.current.value }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.login_status) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', usernameRef.current.value)
            navigate('/')
          } else {
            setErrorMsg('Invalid login')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <>
      <Header></Header>
      <div className='main'>
        <div className='rcontainer'>
          <div className='title'>
            <h1>Welcome Back!</h1>
          </div>

          <div className='errormsg'>
            {errorMsg &&
              <p> {errorMsg} </p>
            }
          </div>
          <form onSubmit={handleSubmit} className='form' >
            <input type="text" className='inp' placeholder='username' ref={usernameRef}></input>
            <input type="password" className='inp' placeholder='password' ref={passwordRef}></input>
            <button type='submit' className='but'> Login </button>
          </form>
        </div>
      </div >
    </>
  )
}

export default Login



