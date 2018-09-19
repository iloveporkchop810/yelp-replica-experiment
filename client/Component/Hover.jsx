import React from 'react';
import HoverShare from './images/HoverComponentImages/HoverShareIcon.png';
import HoverEmbed from './images/HoverComponentImages/HoverEmbedIcon.png';
import HoverCompliment from './images/HoverComponentImages/HoverComplimentIcon.png';
import HoverMessage from './images/HoverComponentImages/HoverMessageIcon.png';
import HoverFollow from './images/HoverComponentImages/HoverFollowIcon.png';
import HoverUpdate from './images/HoverComponentImages/HoverUpdateIcon.png';
import HoverEdit from './images/HoverComponentImages/HoverEditIcon.png';
import './Hover.css';



const Hover = ({ user, isMain }) => {
  const hoverUserItems = [[HoverShare, 'Share review'],
                          [HoverEmbed, 'Embed review'],
                          [HoverCompliment, 'Compliment'],
                          [HoverMessage, 'Send Message'],
                          [HoverFollow, user]];
  const hoverMainItems = [[HoverShare, 'Share review'],
                          [HoverEmbed, 'Embed review'],
                          [HoverUpdate, 'Write an update'],
                          [HoverEdit, 'Edit review']];

  const whichHover = isMain ? hoverMainItems : hoverUserItems;

  return (
    <div className='hover-box'>
      {whichHover.map((item, i) => (
        <div className='hover-item' key={i}>
          <img className='hover-icon' src={item[0]} />
          <a className='hover-link' href='#'>{item[1]}</a>
        </div>))}
    </div>
  )
}

export default Hover;