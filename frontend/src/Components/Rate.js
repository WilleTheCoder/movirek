import React, { useState, useEffect } from "react";
import '../styling/rate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import popcornIcon from '../assets/popcorn.png';

function Rate(props) {
    const [rating, setRating] = useState(null);

    const handleRateClick = (selectedRating) => {
        setRating(selectedRating);
    }

    useEffect(() => {
        if (rating) {
            props.onValueChange(rating)
        }
    }, [rating])

    return (
        <div className="rateycon">
            <h1 className="ratetitle">
                <FontAwesomeIcon icon={faStarHalfStroke}></FontAwesomeIcon> Rate
            </h1>
            <div className="rating-icons">
                {[...Array(100).keys()].map((x) => (
                    <img
                        key={x}
                        src={popcornIcon}
                        className={`popcorn ${x <= rating ? 'selected' : ''}`}
                        onClick={() => handleRateClick(x + 1)}
                        title={`Score: ${x + 1}`} // Add the tooltip content
                    />
                ))}
            </div>
            {rating && <p>You rated {rating} out of 100</p>}
        </div>
    );
}

export default Rate;
