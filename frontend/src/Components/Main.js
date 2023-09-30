import './Main.css'
import Box from './Box'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Page from './Page'
import Header from './Header'
import '../global.css'

function Main() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [showItem, setShowItem] = useState(null)

    const handleBoxClick = (item, event) => {
        console.log("in main click")
        setShowItem(item)
        console.log(item.title)
    }

    useEffect(() => {
        console.log("fetching new data..")
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

        const openOverlay = () => {
            document.body.classList.add('no-scroll'); // Add no-scroll class
        };

        window.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [showItem]);



    const incrementPage = () => {
        console.log("Incrementing page")
        console.log(page)
        setPage(page => page + 1);
    };

    const deincrementPage = () => {
        console.log("Deincrementing page");
        if (page - 1 > 0) {
            setPage(page => page - 1)
        }
    }

    return (
        <>
        <Header></Header>
        <div className='main'>
            {showItem ? (
                <div className='overlay overlay-active'>
                    <Page data={showItem} />
                </div>) : null}

            {/* <Page></Page> */}
            <div className='container'>
                <div className='box-grid'>
                    {data.results && data.results.map(item =>
                        <Box key={item.id} data={item} onBoxClick={(event) => handleBoxClick(item, event)} ></Box>
                    )}
                </div>
                <div className='icon-group'>
                    <FontAwesomeIcon icon={faArrowLeft} className='arrow-icon' onClick={deincrementPage} />
                    <FontAwesomeIcon icon={faArrowRight} className='arrow-icon' onClick={incrementPage} />
                </div>
            </div>
        </div>
        </>
    );
}

export default Main;