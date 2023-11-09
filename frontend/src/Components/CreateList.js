import react, { useState, useEffect } from 'react';
import '../styling/createlist.css';

function CreateList() {

    const [listName, setList] = useState(null)


    const clickCreate = () => {
        console.log('clicked on button');
        const name = document.querySelector('.inpCreateList').value
        console.log(name);
        if(name.length > 0){
            setList(name)
        }
    }

    useEffect(() => {
        if(listName){

            const username = localStorage.getItem('user');
            console.log(username);
            console.log("creating list", listName);
            fetch(`http://localhost:5000/addList?list_name=${listName}&username=${username}`)
            .then((res) => res.json)
            .then((data) => {
                console.log(data)
            })
            .catch((err) => console.log(err))
        }

    }, [listName]);

    return (
        <>
            <div className='listCon'>
                <h3> Create List</h3>
                <input className='inpCreateList' placeholder='List name..'></input>
                <button onClick={clickCreate}> Create </button>
            </div>
        </>
    )
}

export default CreateList;