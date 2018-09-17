import React from 'react';
import whiteStar from './images/whiteStar.png';
import './Star.css';



//have state for index. 
//have store for class names array
//conditional in class, if value is less than index, 
    //change the class to array[index];

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
        if (e.target.attributes.value.value) {
            var starValue = e.target.attributes.value.value;
           
            var starObj = {
                hover: !this.state.hover,
                hoverValue: starValue
            }
            // starObj.hoverValue = starValue;
            console.log(starObj)
            this.setState(starObj);
        
        }
    }
    // renderHoverStars(value) {
    //     var starPopulate = [];
    //     for(var i = 1; i <= value; i ++) {
    //         const starProps = (
    //             <div className={'star '+starColorRating[value][0]} value={i} 
    //                  onMouseOver={this.hoverStar.bind(this)}
    //                  onMouseOut={this.hoverStar.bind(this)}>
    //             <img className='star-image' src={whiteStar}/></div>
    //         )
    //         starPopulate.push(starProps)
    //     }
        
    //     return starPopulate;
    // }


    //if hover true, and index same as value, render the message
    render () {
        var rating = [1, 2, 3, 4, 5];
        var starColorRating = {
            1: ['mustard', 'Eek! Methinks not.'],
            2: ['yellow', 'Meh. I\'ve experienced better.'],
            3: ['tangerine', 'A-Ok.'],
            4: ['orange', 'Yay! I\'m a fan.'], 
            5: ['red', 'Woohoo! As good as it gets!']
        }
        var starClass = this.state.hover ? starColorRating[this.state.hoverValue][0] : 'star';
        var starBanner =  this.state.hover ? starColorRating[this.state.hoverValue][1] : null;
        
        // var starBool = (2 === Number(this.state.hoverValue));
        // console.log(starBool);

        return (        
            <div className='review-star-bar'>
                {rating.map((each, i) => (
                    <div className='star-and-banner'>
                        
                        <div value={each} 
                            onMouseOver={this.hoverStar.bind(this)}
                            onMouseOut={this.hoverStar.bind(this)}>
                            <div value={each} 
                                className={each <= this.state.hoverValue ?
                                            starClass : 'star'}>
                            <img value={each} className='star-image' src={whiteStar}/></div>
                        </div>
                        {this.state.hover && each === Number(this.state.hoverValue)?<div className='star-rate-banner'> <div className='banner-letter'>{starBanner}</div></div> : null}

                    </div>
                ))}          
            </div>
        )   
    }
}


export default Star;




