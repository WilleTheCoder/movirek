import React, { useRef, useEffect, useState } from 'react'
import '../styling/register.css'
import Header from './Header'
import '../styling/global.css'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const usernameRef = useRef()
  const passwordRef = useRef()

  async function getUserStatus(username) {
    let status = null;
    try {
      const res = await fetch(`http://localhost:5000/getUserStatus?username=${username}`)
      const data = await res.json()
      status = data.status
    } catch (error) {
      return false;
    }

    return status;
  }

  function checkInput(username, password) {
    if (username.length < 3 || password.length < 6) {
      return 'Too few characters';
    }

    const regex_pattern = /^[A-Za-z0-9!@#$%^&*()_+<>?-]+$/
    if (!regex_pattern.test(password) || !regex_pattern.test(username)) {
      return 'Input contains unallowed characters'
    }
    return ''
  }

  const handleSubmit = async (event) => {
    setSuccessMsg('');
    setErrorMsg('');
    event.preventDefault();

    const inputError = checkInput(usernameRef.current.value, passwordRef.current.value);
    setErrorMsg(inputError);

    if (!inputError) {
      const status = await getUserStatus(usernameRef.current.value);

      if (status) {
        setErrorMsg('Username already taken!');
      } else {
        fetch('http://localhost:5000/postNewAccount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: usernameRef.current.value, password: passwordRef.current.value }),
        })
          .then((res) => res.json())
          .then((data) => {
            setSuccessMsg(`Account '${usernameRef.current.value}' created`);
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', usernameRef.current.value)
            navigate('/')
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <>
      <Header></Header>
      <div className='main'>
        <div className='rcontainer'>
          <div className='title'>
            <h1>Create Account</h1>
          </div>

          <div className='errormsg'>
            {errorMsg &&
              <p> {errorMsg} </p>
            }
          </div>
          <div className='successmsg'>
            {successMsg &&
              <p> {successMsg} </p>
            }
          </div>
          <form onSubmit={handleSubmit} className='form' >
            <input type="text" className='inp' placeholder='username' ref={usernameRef}></input>
            <input type="password" className='inp' placeholder='password' ref={passwordRef}></input>
            <button type='submit' className='but'> Sign up </button>
          </form>
          <div className='rdescription'>
            <p> Explore, rate, and build your own collections of movies and series, with personalized recommendations.</p>
          </div>
        </div>
      </div >
    </>
  )
}

export default Register



