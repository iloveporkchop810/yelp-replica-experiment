import React from 'react';
import './Search.css'
import buttonSearch from './images/buttonSearch.png';
import DropDown from './DropDownMenu.jsx';

const sortItems = ['Yelp Sort', 'Newest First', 'Oldest First', 'Highest Rated', 'Lowest Rated', 'Elites']
const filterItems = ['Engrish', 'Espana', 'Italiano', 'ChingChong']

const Search = (props) => {
    return (
        <div className='review-header'>
            <div className='title'>
                <h2>
                    Recommended Reviews   
                    <b> for {props.business}</b>
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
                    <DropDown sort='sort' sortBy={sortItems} selection={props.sortSelection}/>
                </div>
                <div className='filter-dropdown'>
                    <DropDown sort='language' sortBy={filterItems} selection={props.filterSelection}/>
                </div>
            </div>
        </div>
    )
}


export default Search;