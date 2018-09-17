import React from 'react';
import './MenuItem.css';

const MenuItem = ({item, selectedDefault}) => {
    var cName = (item === selectedDefault) ? 'highlight': 'item';
    return (
        <div className={cName} value={item}>{item}</div>
    )
}

export default MenuItem;