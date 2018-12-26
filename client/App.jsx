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
      mainUser: MainPerson, //default dummy data
      userReviews: [],
      userReviewsHolder: [],
      businessName: '',
      reviewPosted: false,
    }
    this.voteButtonPost = this.voteButtonPost.bind(this);
  }

  componentWillMount() {
    this.searchBusiness();
  }
  
  //User can toggle infinitely the vote buttons, votes are collected
  //and only the final voting counts before exit are posted and saved to database. 
  componentDidMount() {
    window.addEventListener('beforeunload', this.voteButtonPost);
  }

  componentWillUnmount() {
    this.voteButtonPost();     
    window.removeEventListener('beforeunload', this.voteButtonPost);
  }

  //userProps contains vote button information: [<toggled?(bool)>, count]
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
//                         = /reviews-service/:id ----> for module
  searchBusiness(name) {
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

  //Client side sorting and filtering
  //Since there arent that many reviews, client side sorting will do. 
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
    this.setState({userReviews: sortedUsers});
  }

  filterSelection(value) {
    var filteredUsers = this.state.userReviewsHolder.filter(each => each.Language === value)
    this.setState({userReviews: filteredUsers});
  }

  //BELOW = Server Side sort and filter
    //No longer makes sense for this specific experiment, because chose to collect vote counts on
    //componentWillUnmount. If get data back from db will earase vote collection counts. 
      //Future consideration = set up time interval for posting vote counts intermittenly

  /*sortSelection(value) {     
    axios.get(`/api${window.location.pathname}reviews/reviews_sort/${value}`)
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
    axios.get(`/api${window.location.pathname}reviews/reviews_filter/${value}`) 
      .then(response => {
        this.setState({
          userReviews: response.data
        })
      })
      .catch(error => {
        console.log('axios filter error: ', error)
      })
  }*/

  //MainUser not set up to exist in DB yet. For now postReview is only temporary to each session.
  postReview(reviewObj) {
    var updateUser = Object.assign({}, this.state.mainUser, reviewObj);
    var stateObj = {};
    stateObj.mainUser = updateUser;
    stateObj.reviewPosted = true;

    this.setState(stateObj);
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