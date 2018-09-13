import React from 'react';


const MainUser = ({}) => {
    return (
        <div className='main-user'>
            <div className='user-parts'>
                <div className='info'>
                </div>
                <div className='photo'>
                </div>
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