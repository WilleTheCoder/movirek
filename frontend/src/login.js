import React, { useRef, useEffect, useState } from 'react'
import './login.css'
import Header from './Components/Header'
import './global.css'
{/* <>
<Header></Header>
<Main></Main>
</> */}
function Login() {

  const [errorMsg, setErrorMsg] = useState('')

  const usernameRef = useRef()
  const passwordRef = useRef()

  const showError = false;

  function checkInput(username, password) {
    if (username.length < 3 || password.length < 6) {
      return 'Too few characters';
    }

    console.log("register user:", usernameRef.current.value, username)

    // see if username is taken
    fetch(`http://localhost:5000/getUserStatus?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("response", data)
        if(data.status){
          return "Username taken!"
        }
      })
      .catch((error) => console.log("ERROR: ", error))

    return null;
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    setErrorMsg(checkInput(usernameRef.current.value, passwordRef.current.value))

    // if (errorMsg == null) {
    //   fetch('http://localhost:5000/postNewAccount', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ username: usernameRef.current.value, password: passwordRef.current.value }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })

    // }
  }

  useEffect(() => {


  }, [])

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



