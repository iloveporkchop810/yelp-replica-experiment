import React from 'react';
import SophiaPic from '../../SampleGETresponse/SophiaSample.jpg';
import Passport from './Passport.jsx';
import './MainUser.css';

const MainUser = ({user}) => {
    return (
        <div className='main-user'>
            <div className='user-parts'>
                <Passport user={user} photo={SophiaPic}/>
            </div>
            <div className='review-parts'>
                <div className='greybox'>
                    <div className='stars'></div>
                    <div className='review-link'></div>
                </div>
            </div>
        </div>
    )
}
//pass down main user info from App

export default MainUser;