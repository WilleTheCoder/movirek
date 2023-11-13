import React, { useState, useEffect } from "react";

import '../styling/addtolist.css'
import CreateList from "./CreateList";

function AddToList(data) {

    const [listView, setListView] = useState(0)
    const [list, setList] = useState(["sad"])
    const [addToList, setAddToList] = useState(0)
    const [listName, setListName] = useState(0)

    useEffect(() => {
        if (!addToList) {
            return
        }



        fetch('http://localhost:5000/addMovieToList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ movie_id: data.movie_id, listname: listName, username: localStorage.getItem('user') }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('failed to add movie to list');
                }
            })
            .then((data) => console.log(data))
            .catch((error) => console.log(error))

        // console.log(listName)
        //movie_id, listname, username

    }, [addToList])


    useEffect(() => {
        const username = localStorage.getItem('user');
        fetch(`http://localhost:5000/getUserLists?username=${username}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('failed to fetch')
                }
                return res.json()
            })
            .then((data) => {
                console.log(data);
                setList(prevList => [...prevList, ...data])
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const handleListClickEvent = (name) => {
        setAddToList(1);
        setListName(name)
    }

    return (
        <>  {listView ?
            (<CreateList></CreateList>) : (null)}

            <h3> Add to List </h3>
            <button onClick={() => setListView(1)}> Create new List </button>

            <div className="listcon">

                {list.map(name => (
                    <button key={name} onClick={() => handleListClickEvent(name)}>{name}</button>
                ))}
            </div>

        </>
    )
}

export default AddToList;