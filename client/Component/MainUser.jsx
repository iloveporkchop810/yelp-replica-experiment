import React from 'react';
import SophiaPic from '../../SampleGETresponse/SophiaSample.jpg';
import Passport from './Passport.jsx';
import Star from './Star.jsx';
import './MainUser.css';



const MainUser = ({user, business}) => {
    return (
        <div className='main-user'>
            <div className='user-parts'>
                <Passport user={user} photo={SophiaPic}/>
            </div>
            <div className='review-parts'>
                <div className='greybox'>
                    <div className='stars'>
                        <Star />
                    </div>
                    <div>
                    <a className='review-link' href='#'>Start your review of <strong>{business}</strong></a> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainUser;