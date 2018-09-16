import React from 'react';
import whiteStar from './images/whiteStar.png';
import './Star.css';

const Star = () => {
    //base on input, push into array how many? 
    //base on hover index = how many colors replaced. 

    return (
        <div className='star-bar'>
            <div className='star' type='radio' value='1'><img className='star-image' src={whiteStar}/></div>
            <div className='star' type='radio' value='2'><img className='star-image' src={whiteStar}/></div>
            <div className='star' type='radio' value='3'><img className='star-image' src={whiteStar}/></div>
            <div className='star' type='radio' value='4'><img className='star-image' src={whiteStar}/></div>
            <div className='star' type='radio' value='5'><img className='star-image' src={whiteStar}/></div>
        </div>
    )
}

export default Star;


// <label>1 (Eek! Methinks not.)</label>
// <label>2 (Meh. I've experienced better.)</label>
// <label>3 (A-Ok.)</label>
// <label>4 (Yay! I'm a fan.)</label>
// <label>5 (Woohoo! As good as it gets!)</label>