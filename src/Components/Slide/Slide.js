import React from 'react';
import './Slide.css';

const Slide = ({property,onClick}) => {
  const {index, picture} = property;
  return (
      <div id={`slide-${index}`} className="slide"> 
      <img className="picture" src={picture} alt="slide" onClick={onClick}/>
      <div className="overlay"></div>
      </div>
  );
}

export default Slide;