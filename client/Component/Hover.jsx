import React from 'react';
import HoverShare from './images/HoverShareIcon.png';
import HoverEmbed from './images/HoverEmbedIcon.png'
import HoverCompliment from './images/HoverComplimentIcon.png';
import HoverMessage from './images/HoverMessageIcon.png';
import HoverFollow from './images/HoverFollowIcon.png';
import HoverUpdate from './images/HoverUpdateIcon.png';
import HoverEdit from './images/HoverEditIcon.png';
import './Hover.css';



const Hover = ({user, isMain}) => {
    const hoverUserItems = [[HoverShare, 'Share review'],
                        [HoverEmbed, 'Embed review'],
                        [HoverCompliment, 'Compliment'],
                        [HoverMessage, 'Send Message'],
                        [HoverFollow, user]]
    const hoverMainItems = [[HoverShare, 'Share review'],
                            [HoverEmbed, 'Embed review'],
                            [HoverUpdate, 'Write an update'],
                            [HoverEdit, 'Edit review']]   

    const whichHover = isMain ? hoverMainItems : hoverUserItems         
        
    return (
        <div className='hover-box'>
            {whichHover.map(item => (
            <div className='hover-item'>
                <img className='hover-icon' src={item[0]} />
                <a className='hover-link' href='#'>{item[1]}</a>
            </div>))}
        </div>
    )
}

export default Hover;