//not used

import React, {useState, useEffect} from 'react';
import {userService} from './user.service';


function User(props) {

    let [username, setUsername] = useState(props.user.username);
    let [password, setPassword] = useState(props.user.password);
    let [firstName, setFirstName] = useState(props.user.firstName);
    let [lastName, setLastName] = useState(props.user.lastName);
    let [email, setEmail] = useState(props.user.email);
    let [isAdmin, setAdmin] = useState(props.user.isAdmin);

    function handleChange(e) {
        userService.updateOneUser(
            {'id' : e.target.id,
            'username': document.getElementById(`username_${e.target.id}`).value,
            'password':document.getElementById(`password_${e.target.id}`).value,
            'firstName': document.getElementById(`firstName_${e.target.id}`).value,
            'lastName': document.getElementById(`lastName_${e.target.id}`).value,
            'email': document.getElementById(`email_${e.target.id}`).value,
            'isAdmin': document.getElementById(`isAdmin_${e.target.id}`).checked}
            ).then(data =>   {
                setUsername(data.username);
                setPassword(data.password);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setEmail(data.email);
                setAdmin(data.isAdmin);
            });
    }


    return (
        <div style={{display: "inline-block"}}>
            <input type="text" id={`username_${props.user._id}`} defaultValue={username}/> 
            <input type="text" id={`password_${props.user._id}`} defaultValue={password}/> 
            <input type="text" id={`firstName_${props.user._id}`} defaultValue={firstName}/> 
            <input type="text" id={`lastName_${props.user._id}`} defaultValue={lastName}/>           
            <input type="text" id={`email_${props.user._id}`} defaultValue={email}/> 
            <input type="checkbox" id={`isAdmin_${props.user._id}`} defaultChecked={isAdmin}/> 
            <input id={`${props.user._id}`} type="button" value="save" onClick={handleChange} />
        </div>)

  }
  
  export {User};