import React from 'react';
import whiteStar from './images/whiteStar.png';
import './Star.css';

var rating = [1, 2, 3, 4, 5];
var starColorRating = {
    1: ['mustard', 'Eek! Methinks not.'],
    2: ['yellow', 'Meh. I\'ve experienced better.'],
    3: ['tangerine', 'A-Ok.'],
    4: ['orange', 'Yay! I\'m a fan.'], 
    5: ['red', 'Woohoo! As good as it gets!']
}


class Star extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            hoverValue: ''
        }
        console.log(this.state)
    }

    hoverStar(e) {
        var starValue = e.target.attributes.value.value;
        if (starValue) {
            var starObj = {
                hover: !this.state.hover,
            }
            starObj.hoverValue = starValue;
            console.log(starObj)
            this.setState(starObj);
        }
    }
    renderHoverStars(value) {
        var starPopulate = [];
        for(var i = 1; i <= value; i ++) {
            const starProps = (
                <div className={'star '+starColorRating[value][0]} value={i} 
                     onMouseOver={this.hoverStar.bind(this)}
                     onMouseOut={this.hoverStar.bind(this)}>
                <img className='star-image' src={whiteStar}/></div>
            )
            starPopulate.push(starProps)
        }
        
        return starPopulate;
    }

    render () {
        if(this.state.hover) {
            return (
                <div className='star-bar'>
                    {this.renderHoverStars(this.state.hoverValue)}
                </div>
            )
        } else {
            return (
                <div className='star-bar'>
                    {rating.map((each, i) => (
                        <div>
                            <div className='star' value={each} 
                                 onMouseOver={this.hoverStar.bind(this)}
                                 onMouseOut={this.hoverStar.bind(this)}>
                            <img className='star-image' src={whiteStar}/></div>
                        </div>
                    ))}          
                </div>
            )
        }  
    }
}


export default Star;

// {this.state.hover ? <span>{starColorRating[this.state.hoverValue][1]}</span> : null}
// <label>1 (Eek! Methinks not.)</label>
// <label>2 (Meh. I've experienced better.)</label>
// <label>3 (A-Ok.)</label>
// <label>4 (Yay! I'm a fan.)</label>
// <label>5 (Woohoo! As good as it gets!)</label>

