import React from 'react';
import './DropDownMenu.css';
import buttonSpan from './images/buttonSpan.png';
import MenuItem from './MenuItem.jsx'

var sortingKey = {
    'Newest First': 'DateTime_DESC',
    'Oldest First': 'DateTime_ASC',
    'Highest Rated': 'StarRating_DESC',
    'Lowest Rated': 'StarRating_ASC',
    'Elites': 'Status_ASC'
}

class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownSelect: 'Yelp Sort',
            dropDownLanguag: 'Engrish',
            isFilter: false,
            showMenu: false
        };
        this.closeMenu = this.closeMenu.bind(this);
        this.state.isFilter = (this.props.sort === 'sort') ? false: true;
    }    
    showMenu() {    
        this.setState({
            showMenu: true
        }, () => { document.addEventListener('click', this.closeMenu)})
    }

    closeMenu() {
        this.setState({
            showMenu: false
        }, () => { document.removeEventListener('click', this.closeMenu);});
    }
    changeSelection(e) {
        var val = e.target.attributes.value.textContent;
        var stateObj = this.props.sort === 'sort' ? {dropDownSelect: val} : {dropDownLanguag: val};
        this.setState(stateObj);
        this.props.selection(sortingKey[val] || val);
    }

    render() {   
        return (
            <div className='drop-down'>
                {/* <div className={this.state.isFilter ? 'redline' : ''}> */}
                <div className='redline'>
                <span onClick={this.showMenu.bind(this)}>
                    {this.state.isFilter ? "Language " : "Sort by "}
                    <strong>{this.state.isFilter ? this.state.dropDownLanguag : this.state.dropDownSelect }</strong>
                    <img className='span-button'src={buttonSpan}/></span>
                </div>
                {this.state.showMenu &&
                <div className='menu'>
                    <div className='menu-inner'
                         onClick={(e)=>this.changeSelection(e)}>
                        {this.props.sortBy.map(item => <MenuItem item={item} 
                                                                 selectedDefault={(this.props.sort === 'sort') ? 
                                                                                   this.state.dropDownSelect :
                                                                                   this.state.dropDownLanguag}/>)}
                    </div>
                </div>}
            </div>
        );
    }
}

export default DropDown;