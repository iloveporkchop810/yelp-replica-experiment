import React from 'react';

import './Passport.css';

const Passport = ({user, photo}) => {
    return (
        <div className='user-part'>
            <div className='photo'>
                <img className='photo' src={photo}/>
            </div>
            <div className='info'>
                <div>
                    <ul>
                        <li className='userName'>
                            <a href=''>{user.Name}</a>
                        </li>
                        <li className='location'>
                            <b>{user.Location}</b>
                        </li>
                    </ul>
                    <ul>
                        <li className='friends-count'>
                            <span>(friend image)</span>
                            <b>{user.FriendsCount}</b>
                            friends
                        </li>
                        <li className='reviews-count'>
                            <span>(review image)</span>
                            <b>{user.ReviewsCount}</b>
                            reviews
                        </li>
                        {user.PhotoCount && <li className='photo-count'>
                            <span>(camera image)</span>
                            <b>{user.PhotoCount}</b>
                            photos
                        </li>}
                        {user.Status !== 'null' && <li className='status'>
                            <b>{user.Status}</b>
                        </li>}
                    
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default Passport;