import { Link } from 'react-router-dom'
import '../styling/header.css'
import '../styling/global.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {

    const user = localStorage.getItem('user')

    return (
        <header className="header">

            <div className='search'>
                <input className='inp' type='text' placeholder="Search.."></input>
            </div>

            <div className="logo">

                <Link to='/'>
                    <img src={'/assets/movireclogo.png'}></img>
                </Link>
                <p className='slogan'>
                    <span className="blue-text">Rate.   </span>
                    <span className="red-text">Discover.   </span>
                    <span className="blue-text">Enjoy.   </span>
                </p>
            </div>

            {user ? (
                <div className='login'>
                    <Link to='/profile'>
                        <p>
                            <FontAwesomeIcon icon={faUser} />{"  " + user}
                        </p>
                    </Link>
                </div>
            ) : (

                <div className='login'>
                    <Link to='/login'>
                        <button className='but'>  Login </button>
                    </Link>
                    <Link to='/register'>
                        <button className='but'>  Sign up </button>
                    </Link>
                </div>
            )
            }

        </header>
    );
}

export default Header;
