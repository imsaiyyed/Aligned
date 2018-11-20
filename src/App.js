import React, { Component } from 'react';
import './App.css';
import User from './components/User/User'
import CurrentUser from './components/CurrentUser/CurrentUser'
import AddUser from './components/AddUser/AddUser'

class App extends Component {

  jsxCurrentUser=null;
  newUser={
    "name":'',
    "email":'',
    address:{
      "city":'',
      "zipcode":''
    }
  };
  state={
    Users:[],
    currentUser:null,
    showUser:false
  }

  componentDidMount()
  {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
      this.setState(
        {
          Users:json
        }
      );
      console.log('Here 2',...this.state.Users);

    });
  }
  updated=(event)=>{
    const choice=event.target.name;
    let user={...this.state.currentUser};

    switch(choice)
    {
        case 'name':
        user.name=event.target.value;
        break;
        case 'email':
        user.email=event.target.value;
        break;
        case 'city':
        user.address.city=event.target.value;
        break;
        case 'zip':
        user.address.zipcode=event.target.value;
        break;
    }
    this.setState(
      {
        currentUser:user
      }
    );
  }
 
  creation=(event)=>
  {
    const choice=event.target.name;
    switch(choice)
    {
        case 'name':
        this.newUser.name=event.target.value;
        break;
        case 'email':
        this.newUser.email=event.target.value;
        break;
        case 'city':
        this.newUser.address.city=event.target.value;
        break;
        case 'zip':
        this.newUser.address.zipcode=event.target.value;
        break;
    }  
    console.log("New:",this.newUser)
  }

  addUser=()=>{
    let users=[...this.state.Users];

    fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify(this.newUser),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => 
    {
      users.push(json);
      this.setState({
        Users:users
      });
      alert("User created successfully..");
      console.log(json)

    })
  }
  updateUser=(event)=>
  {
    console.log(this.state.Users)

      let id=event.target.name;
      let user={...this.state.currentUser};
      let users=[...this.state.Users];
      console.log(event.target.name);
      fetch('https://jsonplaceholder.typicode.com/users/'+id, {
      method: 'PUT',
      body: JSON.stringify({
      ...user
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => 
    {
      console.log(json)
      users.forEach((oldUser,index)=>{
        if(oldUser.id==id)
        {
    
          users[index]=user;
        }
      })
      this.setState({
        Users:users
      });
      alert("User updated successfully..");

    })
  }
  deleteUser=(event)=>
  {
    let id=event.target.name;
    let users=[...this.state.Users];

    fetch('https://jsonplaceholder.typicode.com/users/'+id, {
    method: 'DELETE'
    }).then(response=>{
      console.log(response);
      users.forEach((oldUser,index)=>{
        if(oldUser.id==id)
        {
          users.splice(index,1);
        }
      })
      this.setState({
        Users:users,
        currentUser:null,
        showUser:false
      });
      alert("User deleted successfully..");

    }).catch(reason=>console.log(reason))
  }
  showThisUser=(id)=>
  {
    this.state.Users.forEach((user,index)=>{
      
      if(user.id===id)
      {
        console.log(user.name);
        this.setState({
          currentUser:user
        })
        this.setState({
          showUser:true
        })
        
      }
    });
  }

  render() {

    let jsxSource=null;

    jsxSource=(
    <div className="Group">{
    this.state.Users.map(user=>{
      return <User name={user.name} key={user.id} click={this.showThisUser.bind(this,user.id)} />
    })}
    </div>)
  
    return (
      <div className="App">
      <div className="AllDiv1">
      <h3>All Users</h3>
      <div className="Scroll">
        {jsxSource}<br/>
      </div>
      </div>
      <div className="AllDiv">

      {
        this.state.showUser?
          <CurrentUser saveChanges={this.updateUser} deleteUser={this.deleteUser} changed={this.updated} user={{...this.state.currentUser}}/>  
        :
        <label>Select user</label>
      }
      </div>
       <div className="AllDiv">
      <AddUser addUser={this.addUser} create={this.creation}/>

      </div>
      </div>
    );
  }
}

export default App;
