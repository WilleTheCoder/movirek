import React, { useState, useEffect } from "react";
import Header from './Header'
import '../styling/profile.css'
import '../styling/addtolist.css'
import ListBox from './ListBox';
import { useNavigate } from 'react-router-dom'

function Profile() {
  const user = localStorage.getItem('user')
  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/')
  }



  return (
    <div className='bg'>
      <Header></Header>
      <div className='main'>

        <div className='profilecon'>

          <div className='uppercon'>
          </div>

          <div className='midcon'>
            <h1> {user} </h1>
            <h2> Rank: Newbie </h2>
            <h3> 0 Ratings </h3>
            <h3> Overall Rating: NaN </h3>
          </div>

          <div className='lowcon'>
            <h1> Lists </h1>
            <ListBox></ListBox>
          </div>
        </div>
      </div >
    </div>
  )

}

export default Profile;