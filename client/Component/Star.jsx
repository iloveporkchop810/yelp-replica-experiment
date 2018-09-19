import React from 'react';
import whiteStar from './images/whiteStar.png';
import './Star.css';

class Star extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      hoverValue: '',
      click: false
    }
  }

  hoverStar(e) {
    if (e.target.attributes.value.value) {
      var starValue = e.target.attributes.value.value;
      this.setState({
        hover: true,
        hoverValue: starValue,
        click: false
      });
    }
  }

  hoverOut() {
    this.setState({
      hover: false
    })
  }

  render() {
    var rating = [1, 2, 3, 4, 5];
    var starColorRating = {
      1: ['mustard', 'Eek! Methinks not.'],
      2: ['yellow', 'Meh. I\'ve experienced better.'],
      3: ['tangerine', 'A-Ok.'],
      4: ['orange', 'Yay! I\'m a fan.'],
      5: ['red', 'Woohoo! As good as it gets!']
    }
    var starClass = this.state.hover ? starColorRating[this.state.hoverValue][0] : 'star';
    var starBanner = this.state.hover ? starColorRating[this.state.hoverValue][1] : null;

    return (
      <div className='review-star-bar'>
        {rating.map((each, i) => (
          <div className='star-and-banner' key={i}>
            <div value={each}
                 onMouseOver={this.hoverStar.bind(this)} 
                 onMouseOut={this.state.click ? null : this.hoverOut.bind(this)}
                 onClick={(e) => {
                 this.setState({ click: true })
                 this.props.grabStarValue(e)
              }}>
              <div value={each}
                   className={each <= this.state.hoverValue ? starClass : 'star'}>
                <img value={each} className='star-image' src={whiteStar} />
              </div>
            </div>
            {this.state.hover && each === Number(this.state.hoverValue) && !this.state.click ?
              <div className='star-rate-banner'> <div className='banner-letter'>{starBanner}</div></div>
              : null}
          </div>
        ))}
      </div>
    )
  }
}


export default Star;




