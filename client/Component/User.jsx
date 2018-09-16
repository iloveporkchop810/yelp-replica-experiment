import React from 'react';
import Passport from './Passport.jsx';
import Hover from './Hover.jsx';
import './User.css';
import buttonCool from './images/buttonCool.png';
import buttonFunny from './images/buttonFunny.png';
import buttonUseful from './images/buttonUseful.png';
import buttonFlag from './images/buttonFlag.png';


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

    voteButton(butt) {
        var voteObj = {
            defaultSentence: "Thanks for your vote!",
            changeClass: true
        }
 
        if (this.state[butt][0]) {
            voteObj[butt] = [!this.state[butt][0], this.state[butt][1]-1];
        } else {
            voteObj[butt] = [!this.state[butt][0], this.state[butt][1]+1];
            //send post to update count. but want to wait until certain, as users are allowed to toggle vote
            // setTimeout(() => {
            //     if(this.state[butt][0]) {

            //     }
            // }, 10000)
        }
        this.setState(voteObj);
    }

    //I must apologize to who ever is reading this ugly code. I HATE CSS... sorry for the clutter of classNames
    render () {
        var dateTime = this.props.user.DateTime;
        var date = dateTime.split('T');
        var dateParse = date[0].split('-');
        var dateParseFinal = dateParse[1] + '/' + dateParse[2] + '/' + dateParse[0];

        return (
            <div className='other-user'
                 onMouseOver={() => this.setState({hover: true})}
                 onMouseOut={() => this.setState({hover: false})} >
                <div className='user-section'>
                    <div className='user-parts'>
                        <Passport user={this.props.user} photo={this.props.user.PhotoLink}/>
                        <div className='holder'>
                            {this.state.hover && <Hover user={this.props.user.UserName}/>}
                        </div>
                    </div>
                </div>
                <div className='review-parts'>
                    <div className='star-bar'>
                        <div className='star-rating'></div>
                        <div className='date'>{dateParseFinal}</div>
                    </div>
                    <div className='review-body'>{this.props.user.ReviewBody}</div>
                    <div className='bottom-bar'>
                        <div className={this.state.changeClass? 'green':'voter-statement'} >{this.state.defaultSentence}</div>
                        <div className='button-wrapper'>
                            <button className={this.state.usefulButton[0]? 'blue': 'button'} 
                                    onClick={() => this.voteButton('usefulButton')}>
                                <span className='x'><img className='button-image' src={buttonUseful}/>Useful 
                                <div className='number'>{this.state.usefulButton[1] > 0 ? this.state.usefulButton[1]: null}
                                </div></span></button>
                            <button className={this.state.funnyButton[0]? 'blue': 'button'}  
                                    onClick={() => this.voteButton('funnyButton')}>
                                <span className='x'><img className='button-image' src={buttonFunny}/>Funny
                                <div className='number'>{this.state.funnyButton[1] > 0 ? this.state.funnyButton[1]: null}
                                </div></span></button>
                            <button className={this.state.coolButton[0]? 'blue': 'button'}   onClick={() => this.voteButton('coolButton')}>
                                <span className='x'><img className='button-image' src={buttonCool}/>Cool
                                <div className='number'>{this.state.coolButton[1] > 0 ? this.state.coolButton[1]: null}
                                </div></span></button>
                            <button className='flag-button'>
                                <img className='flag-image' src={buttonFlag} /></button>
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}

export default User;