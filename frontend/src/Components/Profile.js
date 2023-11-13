import Header from './Header'
import '../styling/profile.css'
import '../styling/global.css'
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
            <p className='profile-text'>PROFILE</p>
            <button className='profile-text' onClick={handleClick}>Log Out</button>
          </div>

          <div className='midcon'>
            <div className='mcon'>
              <button className='genMovie'>Generate Movies</button>
              <div className='profileImageCon'>
                <div className='profileImage'></div>
                <div className='dataCon'>
                  <p>45 RATED | 3 LISTS </p>
                  <p>7.31 OVERALL RATING </p>
                </div>
              </div>
              <div className='favMovie'></div>
            </div>
          </div>

          <div className='lowcon'>

          </div>
        </div>
      </div >
    </div>
  )

}

export default Profile;