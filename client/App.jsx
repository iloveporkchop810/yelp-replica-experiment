import React from 'react';
import reactDOM from 'react-dom';
import axios from 'axios';
import Search from './Component/Search.jsx';
import MainUser from './Component/MainUser.jsx';
import User from './Component/User.jsx';
import MainPerson from '../SampleGETresponse/LoggedInUser.js';
import './App.css';
var holder;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainUser: MainPerson, //default
      userReviews: [],
      userReviewsHolder: holder,
      businessName: '',
      reviewPosted: false,
    }
    this.voteButtonPost = this.voteButtonPost.bind(this);
  }

  componentWillMount() {
    this.searchBusiness();
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.voteButtonPost);
  }
  
  componentWillUnmount() {
    this.voteButtonPost();     
    window.removeEventListener('beforeunload', this.voteButtonPost);
  }

  voteButtonPost() {
    let buttonVoteCollection = this.state.userReviewsHolder.reduce((acc, user) => {
      for (var buttonArr in user.userProps) {
        if (user.userProps[buttonArr][0]) {
          acc.push([user.UserKey, buttonArr, user.userProps[buttonArr][1]]);
        }
      }
      return acc;
    }, []);  
    axios.post(`/api${window.location.pathname}reviews/vote`, buttonVoteCollection) 
  }

//window.location.pathname = /business/:id/ ----> for the proxy server
//                         = /reviews-service/:id ----> for component
  searchBusiness(name) {
    // name = name || (Math.floor(Math.random() * 100));
    axios.get(`/api${window.location.pathname}reviews`) 
      .then(response => {
        response.data.forEach(obj => obj.userProps = 
          {
            usefulButton: [false, obj.usefulButton],
            funnyButton: [false, obj.funnyButton],
            coolButton: [false, obj.coolButton],
          }
        )
        this.setState({
          userReviews: response.data,
          userReviewsHolder: response.data,
          businessName: response.data[0].BizName,
        })
      })
      .catch(error => {
        console.log('initial startup error: ', error);
      })
  }

  sortSelection(value) {
    var sortParam = value.split('_');
    var sortedUsers;
    if (sortParam[1] === 'DESC') {
      sortedUsers = this.state.userReviewsHolder.sort((a, b) => 
        sortParam[0] === 'DateTime' ? 
        new Date(b[sortParam[0]]).getTime() - new Date(a[sortParam[0]]).getTime():
        b[sortParam[0]] - a[sortParam[0]]
      );
    } else {
      sortedUsers = this.state.userReviewsHolder.sort((a, b) => 
        sortParam[0] === 'DateTime' ? 
        new Date(a[sortParam[0]]).getTime() - new Date(b[sortParam[0]]).getTime():
        a[sortParam[0]] - b[sortParam[0]]
      );
    }
    this.setState({userReviews: sortedUsers})
  }

  filterSelection(value) {
    var filteredUsers = this.state.userReviewsHolder.filter(each => each.Language === value)
    this.setState({userReviews: filteredUsers})
  }

  //BELOW = for when doing GET requests with each sort/filter

  // sortSelection(value) {     
  //   // axios.get(`/businesses/${this.state.userReviews[0].Businesskey}/reviews/reviews_sort/${value}`)
  //   axios.get(`/api${window.location.pathname}reviews/reviews_sort/${value}`) //----> for proxy server
  //     .then(response => {
  //       this.setState({
  //         userReviews: response.data
  //       })
  //     })
  //     .catch(error => {
  //       console.log('axios sort error: ', error);
  //     })
  // }

  // filterSelection(value) {
  //   // axios.get(`/businesses/${this.state.userReviews[0].Businesskey}/reviews/reviews_filter/${value}`)
  //   axios.get(`/api${window.location.pathname}reviews/reviews_filter/${value}`) //----> for proxy server
  //     .then(response => {
  //       this.setState({
  //         userReviews: response.data
  //       })
  //     })
  //     .catch(error => {
  //       console.log('axios filter error: ', error)
  //     })
  // }

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

    axios.post(`/api${window.location.pathname}reviews`, postObj)
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
        {this.state.userReviews.map((user, i) => <User user={user} key={i} tie={user.id}/>)}
      </div>
    )
  }
}

reactDOM.render(<App />, document.getElementById('app'));