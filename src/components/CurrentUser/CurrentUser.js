import React from 'react';
import './CurrentUser.css'
const CurrentUser=(props)=>
{
    return(
        <div className='CurrentUser'>
        <h4>User Information</h4>
            Name <br/><input name="name" onChange={props.changed} value={props.user.name}/><br/>
            Email<br/> <input name="email" onChange={props.changed} value={props.user.email}/><br/>
            City<br/> <input name="city" onChange={props.changed} value={props.user.address.city}/><br/>
            Zipcode <br/><input name="zip" onChange={props.changed} value={props.user.address.zipcode}/><br/>

            <button onClick={props.saveChanges} name={props.user.id}>Save Changes</button>
            <button onClick={props.deleteUser} name={props.user.id}>Delete</button>
            <br/>
        </div>
    );
}

export default CurrentUser;