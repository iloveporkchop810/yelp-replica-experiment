import React from 'react';
import Passport from './Passport.jsx';
import Hover from './Hover.jsx';
import './User.css';
import buttonCool from './buttonCool.png';
import buttonFunny from './buttonFunny.png';
import buttonUseful from './buttonUseful.png';
import buttonFlag from './buttonFlag.png';


class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }
    render () {
        return (
            <div className='main-user'>
                <div className='user-section'>
                    <div className='user-parts'>
                        <Passport user={this.props.user} photo={this.props.user.PhotoLink}/>
                        <div className='HOLDER'>
                            {this.state.hover && <Hover />}
                        </div>
                        
                    </div>
                </div>
                <div className='review-parts'>
                    <div className='star-bar'>
                        <div className='stars'></div>
                        <div className='date'></div>
                    </div>
                    <div className='review-body'>{this.props.user.ReviewBody}</div>
                    <div className='bottom-bar'>
                        <div className='voter-statement'>blahdiblahblahboop</div>
                        <div className='button-wrapper'>
                            <button className='button'>
                                <img class='button-image' src={buttonUseful} />Useful</button>
                            <button className='button'>
                                <img class='button-image' src={buttonFunny} />Funny</button>
                            <button className='button'>
                                <img class='button-image' src={buttonCool} />Cool</button>
                            <button className='flag-button'>
                                <img class='flag-image' src={buttonFlag} /></button>
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}

export default User;