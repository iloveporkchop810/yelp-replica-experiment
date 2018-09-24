import React from 'react';
import SophiaPic from '../../SampleGETresponse/SophiaSample.jpg';
import Passport from './Passport.jsx';
import Star from './Star.jsx';
import './MainUser.css';


const defaultInput = 'Your review helps others learn about great local businesses. \n\nPlease Dont review this business if you received a freebie for writing this review, or if you\'re connected in any way to the owner or employees.';

class MainUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInputBox: false,
      textValue: '',
      userStarRate: ''
    };
  
    this.changeValue = this.changeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showInputBox() {
    console.log('pew pew pew pewwwww')
    this.setState({
      showInputBox: true
    });
  }

  changeValue(e) {
    this.setState({
      textValue: e.target.value
    });
  }

  grabStarValue(e) {
    if (e.target.attributes.value.value) {
      this.setState({
        userStarRate: e.target.attributes.value.value
      });
      setTimeout(()=>console.log(this.state.userStarRate), 1000)
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.userStarRate) {
      alert('Please leave a star rating!')
    } else {
      this.setState({
        showInputBox: false
      })

      //couldnt get the right moment.js thing to make this work, in time...
      var timeStamp = new Date().toLocaleString()
      var timeStampParse = timeStamp.split(' ');
      var timeShuffle = timeStampParse[0].split('/');
      var timeRejoin = [timeShuffle[2].slice(0, 4), timeShuffle[0], timeShuffle[1]].join('-');
      var objTime = [timeRejoin, timeStampParse[1]].join(' ');

      this.props.postReview({
        StarRating: this.state.userStarRate,
        ReviewBody: this.state.textValue,
        DateTime: objTime,
        Language: 'English',
        //the photoLink is unneccessary, only use because dummy data. 
        PhotoLink: SophiaPic
      });
    };
  }


  render() {
    const inputField = (
      <div className='input-box'>
        <form onSubmit={this.handleSubmit}>
          <textarea className='review-input' 
                    placeholder={defaultInput} 
                    value={this.state.value} 
                    onChange={(e) => this.changeValue(e)}></textarea>
          <input className='submit-input' type='submit' value='Post Review'></input>
        </form>
      </div>
    )

    return (
      <div className='main-user'>
        <div className='user-parts'>
          <Passport user={this.props.user} photo={SophiaPic} />
        </div>
        <div className='review-parts'>
          <div className='greybox'>
            <div className='stars-user-review'>
              <Star grabStarValue={this.grabStarValue.bind(this)} />
            </div>
            <div>
              <span className='review-link' href='#'
                    onClick={() => this.showInputBox()}>Start your review of <strong>{this.props.business}</strong></span>
            </div>
            {this.state.showInputBox ? inputField : null}
          </div>
        </div>
      </div>
    )
  }
}

export default MainUser;