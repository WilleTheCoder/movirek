import React from 'react';
import '../styling/box.css';

function Box({ data, onBoxClick }) {
  const boxClickHandler = (event) => {
    event.preventDefault()
    event.stopPropagation();
    onBoxClick(data)
  };

  return (
    <div className='box'>
      <a href='' onClick={boxClickHandler} className="box-link">
        <div className='inner'>
          <div className='front'>
            <div className='logo'>
              <img src={'https://image.tmdb.org/t/p/original' + data.poster_path} alt={data.title} />
            </div>
          </div>
          <div className='back'>
            <div className='content'>
              {/* <h3>{data.title}</h3> */}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Box;
