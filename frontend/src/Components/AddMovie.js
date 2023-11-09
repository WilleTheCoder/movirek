import React, { useState } from "react";

import '../styling/addmovie.css'
import CreateList from "./CreateList";

function AddMovie() {

    const [listView, setListView] = useState(0)

    const handleListViewEvent = () => {
        setListView(1);
    }

    return (
        <>  {listView ?
            (<CreateList></CreateList>) : (null)}


            <h3> Add to List </h3>
            <button onClick={handleListViewEvent}> Create new List </button>
        </>
    )
}

export default AddMovie;