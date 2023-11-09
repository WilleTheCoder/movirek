import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus} from '@fortawesome/free-solid-svg-icons';

import Rate from './Rate';
import '../styling/page.css'
import popcornIcon from '../assets/popcorn.png';
import Box from './Box'
import AddMovie from "./AddMovie";

function Page({ data }) {

    const user = localStorage.getItem('user');
    const [fdata, setData] = useState(data);
    const [rating, setRating] = useState(null);
    const [ratingView, setRatingView] = useState(0);
    const [addView, setAddView] = useState(0);
    const [recData, setRecData] = useState(null)

    const updateRating = (value) => {
        console.log('updating rating!')
        setRating(value);
        console.log(data.id, user)
        fetch("http://localhost:5000/ratings", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating: value, username: user, movieId: data.id }),
        })
            .then((res) => res.json)
            .then((data) => {
                console.log(data)
            })
    }


    const handleAddMovie = () => {
        console.log('clicked on addmovie')
        setAddView(1);
    }

    const handleRateEvent = (event) => {
        event.stopPropagation();
        console.log("setting rating view to true");
        setRatingView(1);
    }

    const handleClickOutside = (event) => {
        // Check if the click occurred outside the div
        const ratingcon = document.querySelector('.ratingcon');
        // console.log(
        //     'clickclick', ratingView, ratingcon.contains(event.target)
        // );

        if (ratingView === 1 && (ratingcon.contains(event.target) === false)) {
            setRatingView(0);
            event.stopPropagation();
        }
    }

    useEffect(() => {
        console.log('fetching!')

        // fetching movie page data
        fetch(`http://localhost:5000/details?movie_id=${data.id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Fail fetching");
                }
                return res.json()
            })
            .then((data) => {
                setData(data)
            })
            .catch((error) => {
                console.log(error)
            })

        // fetching recommended movies
        fetch(`http://localhost:5000/recommendedMovies?movie_id=${data.id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('failed fetch')
                }
                return res.json()
            })
            .then((data) => {
                console.log('fetched recommended movies')
                console.log(data.results)
                setRecData(data.results)
            })
            .catch((err) => console.log(err))

    }, [data]);


    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ratingView]);

    return (
        <div className="page">

            {ratingView ? (
                <div className="ratingcon">
                    <Rate onValueChange={updateRating}></Rate>
                </div>
            ) : null
            }

            {addView ? (
                      <div className="ratingcon">
                        <AddMovie></AddMovie>
                        
                         </div>
            ) : (null)}

            <div className="upper-container">
                <div className="poster">
                    <img src={'https://image.tmdb.org/t/p/original' + fdata.poster_path} alt={fdata.title} />
                </div>
                <div className="title">

                    <h1> {fdata.title} </h1>
                    <h3> {fdata.tagline} </h3>
                    <h3> {fdata.release_date}</h3>
                    <div className="title-content">
                        {fdata && fdata.genres && Object.keys(fdata.genres).map((key) => (
                            <p> {fdata.genres[key].name}</p>
                        ))}
                    </div>

                </div>
                <div className="description">
                    <h3>Description</h3>
                    <p> {fdata.overview} </p>
                </div>

                {user ? (
                    <div className="usermenu">
                        <div className="ratecon">
    
                                {rating ?
                                    (<div className="displayrating">
                                        <img src={popcornIcon} className='popcorn1'></img>
                                        <p>{rating}</p>
                                    </div>)
                                    : (<button onClick={handleRateEvent}><FontAwesomeIcon icon={farStar} className="icon"></FontAwesomeIcon> </button>)
                                }
                        </div>
                        <button onClick={handleAddMovie}>
                        <FontAwesomeIcon icon={faSquarePlus} className="icon" />
                        </button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="lower-container">
                <h1> Recommended </h1>
                <div className="recMoviesCon">
                </div>
            </div>

        </div>
    )
}

export default Page;