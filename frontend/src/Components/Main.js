import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCircleRight, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Box from './Box'
import Page from './Page'
import Header from './Header'
import '../styling/main.css'
import '../styling/global.css'

function Main() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [showItem, setShowItem] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/popular?page=${page}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Not good');
                }
                return res.json();
            })
            .then(newData => {
                setData(newData);
            })
            .catch(error => {
                console.log(error)
            });
    }, [page]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            const overlay = document.querySelector('.overlay');
            if (overlay && showItem) {
                if (!overlay.contains(event.target)) {
                    setShowItem(null);
                    document.body.classList.remove('no-scroll'); // Remove no-scroll class
                }
            }
        };

        window.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [showItem]);

    const incrementPage = () => {
        setPage(page => page + 1);
    };

    const deincrementPage = () => {
        if (page - 1 > 0) {
            setPage(page => page - 1)
        }
    }

    return (
        <div className='bg'>
            <Header></Header>
            <div className='main'>
                {showItem ? (
                    <div className='overlay overlay-active'>
                        <Page data={showItem} />
                    </div>) : null}

                <div className='container'>
                    <div className='box-grid'>
                        {data.results && data.results.map(item =>
                            <Box key={item.id} data={item} onBoxClick={(event) => setShowItem(item)} ></Box>
                        )}
                    </div>
                    <div className='icon-group'>
                        <FontAwesomeIcon icon={faCircleLeft} className='arrow-icon' onClick={deincrementPage} />
                        <FontAwesomeIcon icon={faCircleRight} className='arrow-icon' onClick={incrementPage} />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Main;