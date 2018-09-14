import React from 'react';
import './DropDownMenu.css';
import buttonSpan from './buttonSpan.png';

class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownSelect: "Yelp Sort",
            showMenu: false
        };
    }    
    showMenu(event) {    
        event.preventDefault();
        this.setState({
            showMenu: true
        })
        console.log(this.state.showMenu)
    }
    render() {
        return (
            <div className='drop-down'>
                <div>
                Sort by <span className='span-choice' onClick={this.showMenu.bind(this)}>{this.state.dropDownSelect}
                    <img className='span-button'src={buttonSpan}/></span>
                </div>
                {this.state.showMenu ?
                <div className='menu'>
                    <button>Yelp Sort</button>
                    <button>Newest First</button>
                    <button>Oldest First</button>
                    <button>Highest Rated</button>
                    <button>Lowest Rated</button>
                    <button>Elites</button>
                </div> : null}
            </div>
        );
    }
}

export default DropDown;