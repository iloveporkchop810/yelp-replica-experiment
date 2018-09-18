import React from 'react';
import reactDOM from 'react-dom';
import axios from 'axios';
import Search from './Component/Search.jsx';
import MainUser from './Component/MainUser.jsx';
import User from './Component/User.jsx';
// import SampleBiz from '../SampleGETresponse/SampleGetBusiness.js';  //Sample data
import MainPerson from '../SampleGETresponse/LoggedInUser.js';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainUser: MainPerson,
            // userReviews: SampleBiz,
            userReviews: [],
            businessName: '',
            reviewPosted: false,
        }
    }
    componentWillMount() {
        this.searchBusiness(3);
    }

    //will have to change how to serach by name vs id later. for now just a place holder
    searchBusiness(name) {
        name = name || (Math.floor(Math.random() * 100));
        axios.get(`/business/${name}/reviews`)
            .then(response => {
                this.setState({
                    userReviews: response.data,
                    businessName: response.data[0].BizName,
                })
            })
            .catch(error => {
                console.log('initial startup error')
            })
    }
    sortSelection(value) {
        axios.get(`/business/${this.state.userReviews[0].Businesskey}/reviews_sort/${value}`)
            .then(response => {
                this.setState({
                    userReviews: response.data
                })
            })
            .catch(error => {
                console.log('axios sort error')
            })
    }

    filterSelection(value) {
        axios.get(`/business/${this.state.userReviews[0].Businesskey}/reviews_filter/${value}`)
            .then(response => {
                this.setState({
                    userReviews: response.data
                })
            })     
            .catch(error => {
                console.log('axios filter error')
            })   
    }

    //this will have to modified when not using default values (ex user id)
    postReview(reviewObj) {
       
        var updateUser = Object.assign(this.state.mainUser, reviewObj)
        var stateObj = {}
        stateObj.mainUser = updateUser;
        stateObj.reviewPosted = true;

        this.setState(stateObj);

        var postObj = Object.assign(reviewObj, {
            Businesskey: this.state.userReviews[0].Businesskey,
            id: 501
        })
        delete postObj.PhotoLink;
   
        console.log(postObj)
        //TODO: for later, can do a SELECT for userId on businessKey first to limit only one review,
        //if error, then do the POST, or EDIT the response from a success
        //HOWEVER, ideally the users own review should already be at the top at the business, 
        //and can only EDIT at that point. 
        axios.post(`/business/${this.state.userReviews[0].Businesskey}/reviews`, postObj)
            .then(response => {
                console.log('Review Successfully Posted')
            })
            .catch(error => {
                console.log('Post Review Failed')
            })
    }

    render () {
        return (
            <div className='review-section'>
                <Search business={this.state.businessName} 
                        sortSelection={this.sortSelection.bind(this)}
                        filterSelection={this.filterSelection.bind(this)}/>
                {this.state.reviewPosted ?
                    <User user={this.state.mainUser} 
                          reviewBody={this.state.reviewPosted}
                          isMain={true}/>
                    : <MainUser user={this.state.mainUser} 
                                business={this.state.businessName} 
                                postReview={this.postReview.bind(this)}/>}
                {this.state.userReviews.map(user => <User user={user} />)}
            </div>
        )
    }
}

reactDOM.render(<App />, document.getElementById('app'));