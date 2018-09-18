import React from 'react';
import './Passport.css';
import zelpFriends from './images/zelpFriends.png';
import zelpReviews from './images/zelpReviews.png';
import zelpPhotos from './images/zelpPhotos.png';

const Passport = ({ user, photo }) => {
  return (
    <div className='user-part'>
      <div className='photo-container'>
        <a href='#'><img className='photo' src={photo} /></a>
      </div>
      <div className='info'>
        <div>
          <div className="no-bullet">
            <div className='user-name'>
              <a className='user-name-link' href='#'>{user.UserName}</a>
            </div>
            <div className='location'>
              {user.Location}
            </div>
          </div>
          <div className="no-bullet">
            <div className='friends-count letters'>
              <img className='icon' src={zelpFriends} />
              <div className='num'>{user.FriendsCount}</div>
              friends
            </div>
            <div className='reviews-count letters'>
              <img className='icon' src={zelpReviews} />
              <div className='num'>{user.ReviewsCount}</div>
              reviews
            </div>
            {user.PhotosCount !== 0 &&
              <div className='photo-count letters'>
                <img className='icon' src={zelpPhotos} />
                <div className='num'>{user.PhotosCount}</div>
                photos
              </div>}
            {user.Status !== 'null' &&
              <div className='status'>
                {user.Status}
              </div>}
          </div>
        </div>
      </div>
    </div>
  )
}


export default Passport;