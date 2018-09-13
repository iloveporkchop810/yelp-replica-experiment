import React from 'react';
import reactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import Search from './Component/Search.jsx';
import MainUser from './Component/MainUser.jsx';
import User from './Component/User.jsx';
import SampleBiz from '../SampleGETresponse/SampleGetBusiness.js';
import MainPerson from '../SampleGETresponse/LoggedInUser.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainUser: MainPerson,
            userReviews: SampleBiz
        }
    }
    render () {
        return (
            <div className='review-section'>
                <Search />
                <MainUser user={this.state.mainUser}/>
                {this.state.userReviews.map(user => <User user={user} />)}
            </div>
        )
    }
}

reactDOM.render(<App />, document.getElementById('app'));