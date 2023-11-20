import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import '../styling/header.css'
import '../styling/global.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import config from '../config';
import main from './Main';
import { useNavigate } from 'react-router-dom'
import Select from "react-select";


function Header({ callbackFun }) {
    const searchRef = useRef()
    const user = localStorage.getItem('user')
    const navigate = useNavigate()

    const loginOptions = [
        { value: 'login', label: 'Login' },
        { value: 'register', label: 'Register' },
    ];

    const logoutOptions = [
        { value: 'profile', label: 'Profile' },
        { value: 'logout', label: 'Log Out' },
    ];

    const handleSelectInChange = (values) => {
        console.log(values);
        if (values) {
            if (values.value === 'profile') {
                navigate('/profile')
            } else if (values.value === 'logout') {
                localStorage.removeItem('user')
                localStorage.removeItem('token')
                navigate('/')
            }
        }
    };
    const handleSelectOutChange = (values) => {
        console.log(values);
        if (values) {
            if (values.value === 'login') {
                navigate('/login')
            } else if (values.value === 'register') {
                navigate('/register')
            }
        }
    };


    const handleSearchEvent = (event) => {
        event.preventDefault();
        const search_query = searchRef.current.value
        // if (search_query.length > 0) {
        // navigate('/')
        callbackFun(search_query)

        // }

    }

    const handleHomeEvent = (event) => {
        event.preventDefault();
        navigate('/')
    }


    return (
        <header className="header">

            <div className='searchcon'>
                <div className='searchwrapper'>
                    <form onSubmit={handleSearchEvent}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input ref={searchRef} type='text' placeholder="Search.."></input>
                    </form>
                </div>
            </div>

            <div className="logo">

                <Link to='/'>
                    <img onClick={handleHomeEvent} src={'/assets/movireclogo.png'}></img>
                </Link>
                {/* <p className='slogan'>
                    <span>Rate.   </span>
                    <span>Discover.   </span>
                    <span>Enjoy.   </span>
                </p> */}
            </div>

            {user ? (
                <div className='login'>
                    <Select
                        options={logoutOptions}
                        onChange={handleSelectInChange}
                        placeholder={<>
                            <FontAwesomeIcon icon={faUser} />
                            {' ' + user}
                        </>}
                        multi={false}
                        className='selectUser'
                    />


                    {/* <Link to='/profile'>
                    </Link> */}
                </div>
            ) : (

                <div className='login'>

                    <Select
                        options={loginOptions}
                        onChange={handleSelectOutChange}
                        placeholder={<>
                            Account
                            {/* <FontAwesomeIcon icon={faUser} />
                            {' ' + user} */}
                        </>}
                        multi={false}
                        className='selectUser'
                    />


                    {/* <Link to='/login'>
                        <button className='but'>  Login </button>
                    </Link>
                    <Link to='/register'>
                        <button className='but'>  Sign up </button>
                    </Link> */}
                </div>
            )
            }

        </header>
    );
}

export default Header;
