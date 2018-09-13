import React from 'react';
import reactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import Search from './Component/Search.jsx';
import MainUser from './Component/MainUser.jsx';
import AllUsers from './Component/AllUsers.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainUser: [],
            userReviews: []
        }
    }
    render () {
        return (
            <div className='review-section'>
                <Search />
                <MainUser />
                {this.state.userReviews.map(user => <AllUsers user={user} />)}
            </div>
        )
    }
}

reactDOM.render(<App />, document.getElementsById('app'));