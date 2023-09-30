import './Header.css'
import { Link } from 'react-router-dom'
import '../global.css'

function Header() {
    return (
        <header className="header">

            <div className='search'>
                <input className='inp' type='text' placeholder="Search.."></input>
            </div>

            <div className="logo">

                <Link to='/'>
                    <img src={'/assets/logo.png'}></img>
                </Link>
                <p className='slogan'>
                    <span className="blue-text">Rate.   </span>
                    <span className="red-text">Discover.   </span>
                    <span className="blue-text">Enjoy.   </span>
                </p>
            </div>

            <div className='login'>
                <Link to='/login'>
                    <button className='but'>  Login </button>
                </Link>
                <Link to='/register'>
                    <button className='but'>  Sign up </button>
                </Link>
            </div>

        </header>


    );
}

export default Header;
