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
            hover: false
        }
    }
    render () {
        return (
            <div className='main-user'
                 onMouseOver={() => this.setState({hover: true})}
                 onMouseOut={() => this.setState({hover: false})} >
                <div className='user-section'>
                    <div className='user-parts'>
                        <Passport user={this.props.user} photo={this.props.user.PhotoLink}/>
                        {/* <div className='holder'> */}
                            {this.state.hover && <Hover user={this.props.user.UserName}/>}
                        {/* </div> */}
                    </div>
                </div>
                <div className='review-parts'>
                    <div className='star-bar'>
                        <div className='star-rating'></div>
                        <div className='date'></div>
                    </div>
                    <div className='review-body'>{this.props.user.ReviewBody}</div>
                    <div className='bottom-bar'>
                        <div className='voter-statement'>blahdiblahblah boop</div>
                        <div className='button-wrapper'>
                            <button className='button'>
                                <img className='button-image' src={buttonUseful} />Useful</button>
                            <button className='button'>
                                <img className='button-image' src={buttonFunny} />Funny</button>
                            <button className='button'>
                                <img className='button-image' src={buttonCool} />Cool</button>
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