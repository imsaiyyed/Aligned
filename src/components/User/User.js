import React from 'react';
import './User.css'
const User=(props)=>
{
    return(
        <div className='User'>
            <h5 onClick={props.click}>{props.name}</h5>
        </div>
    );
}

export default User;