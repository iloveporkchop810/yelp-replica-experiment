import React from 'react';
import './Search.css'
import buttonSearch from './buttonSearch.png';
import DropDown from './DropDownMenu.jsx';


class Search extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            dropDownSelect: 'Yelp Sort'
        }
    }
   
    dropDownSelection (e) {
        this.setState = {
            searchBar: '',
            dropDownSelect: e.target.value
        }
    }
    render () {

        return (
            <div className='review-header'>
                <div className='title'>
                    <h2>
                        Recommended Reviews   
                        <b> for {this.props.business}</b>
                    </h2>   
                </div>
                <div className='search-section'>
                    <div className='search-bar'>
                        <form className='form-bar'>
                            <div className='search-it'>
                                <input className='input' 
                                       placeholder='Search within the reviews'></input></div>
                            <div className='search-it'>
                                <button className='search-button'>
                                <img className='search-img' src={buttonSearch}/>
                                </button></div>
                        </form>
                    </div>
                    <div className='sort-dropdown'>
                        <DropDown />
                    </div>
                    <div className='filter-dropdown'></div>
                </div>
            </div>
        )
    }
}

//pass down sort function and filter function

export default Search;