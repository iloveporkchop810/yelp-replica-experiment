import React from 'react';
import reactDOM from 'react-dom';
import axios from 'axios';
import Search from './Component/Search.jsx';
import MainUser from './Component/MainUser.jsx';
import User from './Component/User.jsx';
import MainPerson from '../SampleGETresponse/LoggedInUser.js';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainUser: MainPerson, //default
      userReviews: [],
      businessName: '',
      reviewPosted: false,
    }
  }
  componentWillMount() {
    this.searchBusiness();
  }

//window.location.pathname = /business/:id/ ----> for the proxy server
  searchBusiness(name) {
    // name = name || (Math.floor(Math.random() * 100));
    // axios.get(`/businesses/${name}/reviews`)
    axios.get(`/api${window.location.pathname}reviews`) //----> for proxy server
      .then(response => {
        this.setState({
          userReviews: response.data,
          businessName: response.data[0].BizName,
        })
      })
      .catch(error => {
        console.log('initial startup error: ', error);
      })
  }

  sortSelection(value) {
    // axios.get(`/businesses/${this.state.userReviews[0].Businesskey}/reviews/reviews_sort/${value}`)
    axios.get(`/api${window.location.pathname}reviews/reviews_sort/${value}`) //----> for proxy server
      .then(response => {
        this.setState({
          userReviews: response.data
        })
      })
      .catch(error => {
        console.log('axios sort error: ', error);
      })
  }

  filterSelection(value) {
    // axios.get(`/businesses/${this.state.userReviews[0].Businesskey}/reviews/reviews_filter/${value}`)
    axios.get(`/api${window.location.pathname}reviews/reviews_filter/${value}`) //----> for proxy server
      .then(response => {
        this.setState({
          userReviews: response.data
        })
      })
      .catch(error => {
        console.log('axios filter error: ', error)
      })
  }

  //this will have to be modified when not using default values (ex user id)
  postReview(reviewObj) {

    var updateUser = Object.assign(this.state.mainUser, reviewObj);
    var stateObj = {};
    stateObj.mainUser = updateUser;
    stateObj.reviewPosted = true;

    this.setState(stateObj);

    var postObj = Object.assign(reviewObj, {
      Businesskey: this.state.userReviews[0].Businesskey,
      id: 501
    })
    delete postObj.PhotoLink; //this is a default thing

    //TODO: for later, can do a SELECT for userId on businessKey first to limit only one review,
    //if error, then do the POST, or EDIT the response from a success
    //HOWEVER, ideally the users own review should already be at the top at the business, 
    //and can only EDIT at that point. 
    //right now, not posting any reviews, because main user does not exist in db. 
    //will have to set up where when 'log in' add to users table

///business/${this.state.userReviews[0].Businesskey}
    // axios.post(`/businesses/${this.state.userReviews[0].Businesskey}/reviews`, postObj)
    axios.post(`/api${window.location.pathname}reviews`, postObj) //----> for proxy server
      .then(response => {
        console.log('Review Successfully Posted')
      })
      .catch(error => {
        console.log('Post Review Failed: ', error)
      })
  }

  render() {
    return (
      <div className='review-section'>
        <Search business={this.state.businessName}
                sortSelection={this.sortSelection.bind(this)}
                filterSelection={this.filterSelection.bind(this)} />
        {this.state.reviewPosted ?
          <User user={this.state.mainUser}
                reviewBody={this.state.reviewPosted}
                isMain={true} />
          : <MainUser user={this.state.mainUser}
                      business={this.state.businessName}
                      postReview={this.postReview.bind(this)} />}
        {this.state.userReviews.map((user, i) => <User user={user} key={i}/>)}
      </div>
    )
  }
}

reactDOM.render(<App />, document.getElementById('app'));