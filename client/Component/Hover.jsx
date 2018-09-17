import React from 'react';
import HoverShare from './images/HoverShareIcon.png';
import HoverEmbed from './images/HoverEmbedIcon.png'
import HoverCompliment from './images/HoverComplimentIcon.png';
import HoverMessage from './images/HoverMessageIcon.png';
import HoverFollow from './images/HoverFollowIcon.png';
import './Hover.css';


const Hover = ({user}) => {
    const hoverItems = [[HoverShare, 'Share review'],
                    [HoverEmbed, 'Embed review'],
                    [HoverCompliment, 'Compliment'],
                    [HoverMessage, 'Send Message'],
                    [HoverFollow, user]]
    return (
        <div className='hover-box'>
            {hoverItems.map(item => (
            <div className='hover-item'>
                <img className='hover-icon' src={item[0]} />
                <a className='hover-link' href='#'>{item[1]}</a>
            </div>))}
        </div>
    )
}

export default Hover;