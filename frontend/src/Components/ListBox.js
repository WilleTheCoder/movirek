import React, { useState, useEffect } from "react";
import '../styling/listbox.css'
import { config } from '../config'
import CreateList from "./CreateList";

function ListBox(data) {
    const [lists, setLists] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(1);
    const [listView, setListView] = useState(0)

    useEffect(() => {
        if (shouldFetch) {
            const username = localStorage.getItem('user');

            fetch(`${config.backend_url}/getUserLists?username=${username}`)
                .then((res) => {
                    if (!res.ok) {
                        throw Error('failed fetching user lists');
                    }
                    return res.json();
                })
                .then((data) => {
                    if (JSON.stringify(data) !== JSON.stringify(lists)) {
                        setLists(data);
                    }
                    setShouldFetch(0); // Prevent further fetches until 'shouldFetch' is set to true again
                })
                .catch((err) => {
                    console.log(err);
                    setShouldFetch(0); // Handle errors and prevent further fetches
                });
        }
    }, [shouldFetch]);

    useEffect(() => {
        const updateListsWithPosterPaths = async () => {
            const updatedLists = await Promise.all(lists.map(async (list) => {
                console.log("fetching movie detail");
                const movieId = list.movies.length > 0 ? list.movies[list.movies.length - 1].movieId : null;

                if (movieId) {
                    try {
                        const res = await fetch(`${config.backend_url}/details?movie_id=${movieId}`);
                        if (!res.ok) {
                            throw new Error("Fail fetching movie details");
                        }
                        const data = await res.json();
                        return { ...list, poster_path: data.poster_path };
                    } catch (error) {
                        console.log(error);
                        return list;
                    }
                } else {
                    // If the list has no movies, return the original list
                    return list;
                }
            }));

            if (JSON.stringify(updatedLists) !== JSON.stringify(lists)) {
                setLists(updatedLists);
            }
        };

        updateListsWithPosterPaths();
    }, [lists]); // Only run the effect when lists changes


    const handleCreateEvent = () => {
        console.log('in here');
        setTimeout(() => {
            setShouldFetch(1);
        }, 1000)
    }

    const handleOpenList = (event) => {
        event.stopPropagation();
        setListView(1)
    }


    const handleClickOutside = (event) => {
        // Check if the click occurred outside the div
        const list = document.querySelector('.listBoxCon');
        if (listView === 1 && (list.contains(event.target) === false)) {
            setListView(0)
            event.stopPropagation();
        }
    }


    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [listView]);

    return (
        <>
            {listView ? (
                <>
                    <div className="listBoxCon">
                        <CreateList onClickEvent={handleCreateEvent}></CreateList>
                    </div>
                </>) : (null)}

            <button onClick={handleOpenList}> Create new List </button>

                <p>{lists.length} Lists </p>
            <div className="listBoxCon">
                <div className="boxContainer">
                    {lists.map((value, index) => (
                        <div key={index} className="boxCon">
                            <div className="textCon">
                                <h2>{value.listname}</h2>
                                <p>Contains {value.movies.length} movies</p>
                            </div>
                            <div className='listbg'>
                                {value.poster_path && <img src={'https://image.tmdb.org/t/p/original' + value.poster_path} alt={data.title} />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default ListBox;
