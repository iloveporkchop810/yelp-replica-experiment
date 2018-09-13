import React from 'react';
import './Passport.css';
import zelpFriends from './zelpFriends.png';
import zelpReviews from './zelpReviews.png';

const Passport = ({user, photo}) => {
    return (
        <div className='user-part'>
            <div className='photo-container'>
                <img className='photo' src={photo}/>
            </div>
            <div className='info'>
                <div>
                    <ul className="no-bullet">
                        <li className='user-name'>
                            <a className='user-name-link' href=''>{user.Name}</a>
                        </li>
                        <li className='location'>
                            <b>{user.Location}</b>
                        </li>
                    </ul>
                    <div className="no-bullet">
                        <div className='friends-count'>
                            <div className='letters'>
                                
                                <img className='icon' src={zelpFriends}/>       
                                <b>{user.FriendsCount}</b>
                                friends
                                
                            </div>
                        </div>
                        <div className='reviews-count'>
                            <span className='letters'>
                                <img className='icon' src={zelpReviews}/>  
                                <b>{user.ReviewsCount}</b>
                                reviews
                            </span>
                        </div>
                        {user.PhotosCount && <div className='photo-count'>
                            <span>(camera image)</span>
                            <b>{user.PhotosCount}</b>
                            photos
                        </div>}
                        {user.Status !== 'null' && <div className='status'>
                            <b>{user.Status}</b>
                        </div>}
                    
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Passport;