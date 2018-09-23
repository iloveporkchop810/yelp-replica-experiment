import React from 'react';
import Passport from './Passport.jsx';
import Hover from './Hover.jsx';
import './User.css';
import buttonCool from './images/UserComponentImages/buttonCool.png';
import buttonFunny from './images/UserComponentImages/buttonFunny.png';
import buttonUseful from './images/UserComponentImages/buttonUseful.png';
import buttonFlag from './images/UserComponentImages/buttonFlag.png';
import buttonTrash from './images/UserComponentImages/buttonTrash.png';
import OneStar from './images/UserComponentImages/1Star.png';
import TwoStar from './images/UserComponentImages/2Star.png';
import ThreeStar from './images/UserComponentImages/3Star.png';
import FourStar from './images/UserComponentImages/4Star.png';
import FiveStar from './images/UserComponentImages/5Star.png';
import moment from 'moment';
import axios from 'axios';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      // defaultSentence: "blahdiblahblah boop",
      // changeClass: false,
      // usefulButton: [false, this.props.user.usefulButton],
      // funnyButton: [false, this.props.user.funnyButton],
      // coolButton: [false, this.props.user.coolButton],
    }
  }

  //butt is for button
  voteButton(butt) {
    var voteObj = this.props.user.userProps;
    voteObj.defaultSentence = "Thanks for your vote!";
    voteObj.changeClass = true;
    if (voteObj[butt][0]) {
      voteObj[butt] = [!voteObj[butt][0], voteObj[butt][1] - 1];
    } else {
      voteObj[butt] = [!voteObj[butt][0], voteObj[butt][1] + 1];
    }
    //made the above changes so that button 'states' persists with the specific user 

    // var voteObj = {
    //   defaultSentence: "Thanks for your vote!",
    //   changeClass: true
    // }
    // if (this.state[butt][0]) {
    //   voteObj[butt] = [!this.state[butt][0], this.state[butt][1] - 1];
    // } else {
    //   voteObj[butt] = [!this.state[butt][0], this.state[butt][1] + 1];
    // }
    // this.setState(voteObj); 
  }

  //I must apologize to who ever is reading this ugly code. I HATE CSS... sorry for the clutter of classNames
  render() {

    const stars = [OneStar, TwoStar, ThreeStar, FourStar, FiveStar];
    let dateParseFinal = moment(this.props.user.DateTime).format('l');
    let userProps = this.props.user.userProps
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
              <div className={userProps.changeClass ? 'green' : 'voter-statement'} >{userProps.defaultSentence}</div>
              <div className='button-wrapper'>
                <button className={userProps.usefulButton[0] ? 'blue' : 'button'}
                        onClick={() => this.voteButton('usefulButton')}>
                  <span className='x'><img className='button-image' src={buttonUseful} />Useful
                                <div className='number'>{userProps.usefulButton[1] > 0 ? 
                                                         userProps.usefulButton[1] : null}</div></span>
                </button>
                <button className={userProps.funnyButton[0] ? 'blue' : 'button'}
                        onClick={() => this.voteButton('funnyButton')}>
                  <span className='x'><img className='button-image' src={buttonFunny} />Funny
                                <div className='number'>{userProps.funnyButton[1] > 0 ? 
                                                         userProps.funnyButton[1] : null}</div></span>
                </button>
                <button className={userProps.coolButton[0] ? 'blue' : 'button'} 
                        onClick={() => this.voteButton('coolButton')}>
                  <span className='x'><img className='button-image' src={buttonCool} />Cool
                                <div className='number'>{userProps.coolButton[1] > 0 ? 
                                                         userProps.coolButton[1] : null}</div></span>
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