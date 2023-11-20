import react, { useState, useEffect } from 'react';
import '../styling/createlist.css';

function CreateList({onClickEvent}) {

    const [listName, setList] = useState(null)

    const clickCreate = () => {
        const name = document.querySelector('.inpCreateList').value
        if (name.length > 0) {
            setList(name)
            onClickEvent()
        }
    }

    useEffect(() => {
        if (listName) {
            const username = localStorage.getItem('user');
            fetch(`http://localhost:5000/addList?list_name=${listName}&username=${username}`)
                .then((res) => res.json)
                .then((data) => {
                })
                .catch((err) => console.log(err))
        }

    }, [listName]);

    return (
        <>
            <div className='listCon'>
                <h3> Create List</h3>
                <input className='inpCreateList' placeholder='List name..'></input>
                <button className="createButton" onClick={clickCreate}> Create </button>
            </div>
        </>
    )
}

export default CreateList;