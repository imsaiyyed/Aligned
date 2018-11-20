import React from 'react';
import './AddUser.css'
const AddUser=(props)=>
{
    return(
        <div className='AddUser'>
        <h5>Create new User</h5>

            Name:<br/> <input name="name" onChange={props.create} /><br/>
            Email: <br/><input name="email" onChange={props.create} /><br/>
            City: <br/><input name="city" onChange={props.create} /><br/>
            Zipcode:<br/> <input name="zip" onChange={props.create} /><br/>

            <button onClick={props.addUser}>Add User</button>

        </div>
    );
}

export default AddUser;