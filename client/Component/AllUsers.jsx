import React from 'react';
import Hover from 'Hover.jsx';

class AllUsers extends React.Component {
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
                        <div className='info'>
                        </div>
                        <div className='photo'>
                        </div>
                    </div>
                    {this.state.hover && <Hover />}
                </div>
                <div className='review-parts'>
                    <div className='star-bar'>
                        <div className='stars'></div>
                        <div className='date'></div>
                    </div>
                    <div className='review-body'></div>
                    <div className='bottom-bar'>
                        <div className='voter-statement'></div>
                        <button>Useful</button>
                        <button>Funny</button>
                        <button>Cool</button>
                        <button>(flag)</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AllUsers;