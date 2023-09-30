import React, { useEffect, useState } from "react";
import './Page.css'

function Page({ data }) {

    const [fdata, setData] = useState(data)

    useEffect(() => {
        console.log('fetching!')
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
    }, [data]);

    return (
        <div className="page">

            <div className="upper-container">
                <div className="poster">
                    <img src={'https://image.tmdb.org/t/p/original' + fdata.poster_path} alt={fdata.title} />
                </div>
                <div className="title">

                    <h1> {fdata.title} </h1>
                    <h3> {fdata.tagline} </h3>
                    {/* <p> {fdata.release_date}</p> */}
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
            </div>
            <div className="lower-container">
            </div>

        </div>
    )
}

export default Page;