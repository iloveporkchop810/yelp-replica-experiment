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
                    <div className='stars'>
                        {/* <input class="star-selector_input js-star-selector_input" id="rating-5" name="rating" type="radio" value="5"></input>
                        <label class="star-selector_label" for="rating-5">5 (Woohoo! As good as it gets!)</label> */}
                    </div>
                    <div className='review-link'></div>
                </div>
            </div>
        </div>
    )
}

export default MainUser;