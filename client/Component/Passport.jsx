import React from 'react';
import './Passport.css';
import zelpFriends from './zelpFriends.png';
import zelpReviews from './zelpReviews.png';
import zelpPhotos from './zelpPhotos.png';

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
                        <div className='friends-count letters'>
                                <img className='icon' src={zelpFriends}/>       
                                <b>{user.FriendsCount}</b>
                                friends
                        </div>
                        <div className='reviews-count letters'>
                                <img className='icon' src={zelpReviews}/>  
                                <b>{user.ReviewsCount}</b>
                                reviews
                        </div>
                        {user.PhotosCount !== 0 && 
                            <div className='photo-count letters'>
                                <img className='icon' src={zelpPhotos}/>  
                                <b>{user.PhotosCount}</b>
                                photos
                            </div>}
                        {user.Status !== 'null' && 
                            <div className='status'>
                                <b>{user.Status}</b>
                            </div>}
                    
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Passport;