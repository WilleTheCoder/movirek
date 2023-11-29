import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCircleRight, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Box from './Box'
import Page from './Page'
import Header from './Header'
import '../styling/main.css'
import '../styling/global.css'
import { config } from '../config'
import Select from "react-select";

function Main() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [url, setUrl] = useState('/popular?x=0')
    const [showItem, setShowItem] = useState(null)
    const [rightArr, setRightArr] = useState(1)
    const [leftArr, setLeftArr] = useState(1)
    const [genreOptions, setGenreOptions] = useState([])

    const handleHeaderCallBack = (search_query) => {

        if (search_query) {
            console.log('you called me, child?');
            console.log(data);
            reset()
            setUrl(`/search?search_query=${search_query}`)
        } else {
            reset()
            setUrl(('/popular?x=0'))
        }
    }

    const reset = () => {
        setPage(1)
        setRightArr(1)
        setLeftArr(1)
    }

    useEffect(() => {
        //fetch genres
        const f_url = `${config.backend_url}/genres`
        fetch(f_url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed fetching genres');
                }
                return res.json();
            })
            .then(data => {
                console.log(data.genres.map(k => genreOptions.push({ value: k.name, label: k.name })))
                console.log(genreOptions);

            })
            .catch(error => {
                console.log(error)
            });
    }, [])

    useEffect(() => {
        setRightArr(1)
        setLeftArr(1)
        console.log('fetching main page movies');
        const f_url = `${config.backend_url}${url}&page=${page}`
        console.log(f_url);
        fetch(f_url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed fetching movies');
                }
                return res.json();
            })
            .then(newData => {
                setData(newData);
                if (newData.results.length < 20) {
                    setRightArr(0)
                }

                if (page === 1) {
                    setLeftArr(0)
                } else {
                    setLeftArr(1)
                }

            })
            .catch(error => {
                console.log(error)
            });
    }, [page, url]);

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

    const showItemCallBack = (item) => {
        console.log('in callback show item', item);
        setShowItem(item)
    }


    return (
        <div className='bg'>
            {showItem ? (
                <div className='overlay overlay-active'>
                    <Page data={showItem} showPage={showItemCallBack} />
                </div>) : null}

            <Header callbackFun={handleHeaderCallBack}></Header>
            <div className='filterCon'>

                <Select
                    // defaultValue={[config.options[0], config.options[1]]}
                    isMulti
                    name="genre"
                    options={genreOptions}
                    className="genreItem"
                    classNamePrefix="select"
                    placeholder="Genre"
                />

                <button className='filterButton'>Filter </button>
            </div>
            <div className='main'>

                <div className='container'>
                    <div className='box-grid'>
                        {data.results && data.results.map(item =>
                            <Box key={item.id} data={item} onBoxClick={(event) => setShowItem(item)} ></Box>
                        )}
                    </div>
                    <div className='icon-group'>
                        {leftArr ? (<FontAwesomeIcon icon={faCircleLeft} className='arrow-icon' onClick={deincrementPage} />) : (null)}

                        {rightArr ? (<FontAwesomeIcon icon={faCircleRight} className='arrow-icon' onClick={incrementPage} />) : (null)}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Main;