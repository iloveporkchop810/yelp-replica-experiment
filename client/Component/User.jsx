import React from 'react';
import Passport from './Passport.jsx';
import Hover from './Hover.jsx';
import './User.css';
import buttonCool from './images/buttonCool.png';
import buttonFunny from './images/buttonFunny.png';
import buttonUseful from './images/buttonUseful.png';
import buttonFlag from './images/buttonFlag.png';
import buttonTrash from './images/buttonTrash.png';
import OneStar from './images/1Star.png';
import TwoStar from './images/2Star.png';
import ThreeStar from './images/3Star.png';
import FourStar from './images/4Star.png';
import FiveStar from './images/5Star.png';
import moment from 'moment';



class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      defaultSentence: "blahdiblahblah boop",
      changeClass: false,
      usefulButton: [false, this.props.user.usefulButton],
      funnyButton: [false, this.props.user.funnyButton],
      coolButton: [false, this.props.user.coolButton]
    }
  }

  //butt is for button
  voteButton(butt) {
    var voteObj = {
      defaultSentence: "Thanks for your vote!",
      changeClass: true
    }
    //dont want to send so many POST request... must find way to do a promise perhaps, 
    //for the state at refresh?
    if (this.state[butt][0]) {
      voteObj[butt] = [!this.state[butt][0], this.state[butt][1] - 1];
    } else {
      voteObj[butt] = [!this.state[butt][0], this.state[butt][1] + 1];

    }
    this.setState(voteObj);
  }

  //I must apologize to who ever is reading this ugly code. I HATE CSS... sorry for the clutter of classNames
  render() {

    const stars = [OneStar, TwoStar, ThreeStar, FourStar, FiveStar];
    let dateParseFinal = moment(this.props.user.DateTime).format('l');

    return (
      <div className='other-user'
           onMouseOver={() => this.setState({ hover: true })}
           onMouseLeave={() => this.setState({ hover: false })} >
        <div className='user-section'>
          <div className='user-parts'>
            <Passport user={this.props.user} photo={this.props.user.PhotoLink} />
            <div className='holder'>
              {this.state.hover && <Hover user={this.props.user.UserName}
                                          isMain={this.props.isMain} />}
            </div>
          </div>
        </div>
        <div className='user-review-parts'>
          <div className='star-bar'>
            <img className='star-img' src={stars[this.props.user.StarRating - 1]} />
            <div className='date'>{dateParseFinal}</div>
          </div>
          <div className='review-body'>{this.props.user.ReviewBody}</div>
          {!this.props.isMain ? (
            <div className='bottom-bar'>
              <div className={this.state.changeClass ? 'green' : 'voter-statement'} >{this.state.defaultSentence}</div>
              <div className='button-wrapper'>
                <button className={this.state.usefulButton[0] ? 'blue' : 'button'}
                        onClick={() => this.voteButton('usefulButton')}>
                  <span className='x'><img className='button-image' src={buttonUseful} />Useful
                                <div className='number'>{this.state.usefulButton[1] > 0 ? 
                                                         this.state.usefulButton[1] : null}</div></span>
                </button>
                <button className={this.state.funnyButton[0] ? 'blue' : 'button'}
                        onClick={() => this.voteButton('funnyButton')}>
                  <span className='x'><img className='button-image' src={buttonFunny} />Funny
                                <div className='number'>{this.state.funnyButton[1] > 0 ? 
                                                         this.state.funnyButton[1] : null}</div></span>
                </button>
                <button className={this.state.coolButton[0] ? 'blue' : 'button'} onClick={() => this.voteButton('coolButton')}>
                  <span className='x'><img className='button-image' src={buttonCool} />Cool
                                <div className='number'>{this.state.coolButton[1] > 0 ? 
                                                         this.state.coolButton[1] : null}</div></span>
                </button>
                <button className='flag-button'><img className='flag-image' src={buttonFlag} /></button>
              </div>
            </div>) :
            <div className='bottom-bar'>
              <div className='button-wrapper'>
                <button className='flag-button'>
                  <img className='flag-image' src={buttonTrash} /></button>
              </div>
            </div>}
        </div>
      </div>
    )
  }
}

export default User;