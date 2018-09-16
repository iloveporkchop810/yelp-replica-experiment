import React from 'react';
import reactDOM from 'react-dom';
import axios from 'axios';
import Search from './Component/Search.jsx';
import MainUser from './Component/MainUser.jsx';
import User from './Component/User.jsx';
import SampleBiz from '../SampleGETresponse/SampleGetBusiness.js';
import MainPerson from '../SampleGETresponse/LoggedInUser.js';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainUser: MainPerson,
            userReviews: SampleBiz,
            businessName: ''
        }
    }
    componentDidMount() {
        this.searchBusiness();
    }

    //will have to change how to serach by name vs id later. for now just a place holder
    searchBusiness(name) {
        name = name || (Math.floor(Math.random() * 100));
        axios.get(`/business/${name}/reviews`)
            .then(response => {
                this.setState({
                    userReviews: response.data,
                    businessName: response.data[0].BizName
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

    render () {
        return (
            <div className='review-section'>
                <Search business={this.state.businessName} 
                        sortSelection={this.sortSelection.bind(this)}
                        filterSelection={this.filterSelection.bind(this)}/>
                <MainUser user={this.state.mainUser}/>
                {this.state.userReviews.map(user => <User user={user} />)}
            </div>
        )
    }
}

reactDOM.render(<App />, document.getElementById('app'));