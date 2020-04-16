import React, {useState, useEffect} from 'react';
import {userService} from './user.service';


function User(props) {

    const [username, setUsername] = useState(props.user.username);
    const [password, setPassword] = useState(props.user.password);
    const [firstName, setFirstName] = useState(props.user.firstName);
    const [lastName, setLastName] = useState(props.user.lastName);
    const [email, setEmail] = useState(props.user.email);
    const [isAdmin, setAdmin] = useState(props.user.isAdmin);

    function handleChange(e) {
        e.preventDefault();
        setUsername(document.getElementById(`username_${e.target.id}`).value);
        setPassword(document.getElementById(`password_${e.target.id}`).value);
        setFirstName(document.getElementById(`firstName_${e.target.id}`).value);
        setLastName(document.getElementById(`lastName_${e.target.id}`).value);
        setEmail(document.getElementById(`email_${e.target.id}`).value);
        setAdmin(document.getElementById(`isAdmin_${e.target.id}`).checked);
        userService.updateOneUser(
            {'id' : e.target.id,
            'username': document.getElementById(`username_${e.target.id}`).value,
            'password':document.getElementById(`password_${e.target.id}`).value,
            'firstName': document.getElementById(`firstName_${e.target.id}`).value,
            'lastName': document.getElementById(`lastName_${e.target.id}`).value,
            'email': document.getElementById(`email_${e.target.id}`).value,
            'isAdmin': document.getElementById(`isAdmin_${e.target.id}`).checked}
            )
    }

    function handleDelete(e) {
        e.preventDefault();
        console.log(username);
    }


    return (
        <div>
            <input type="text" id={`username_${props.user._id}`} defaultValue={username}/> 
            <input type="text" id={`password_${props.user._id}`} defaultValue={password}/> 
            <input type="text" id={`firstName_${props.user._id}`} defaultValue={firstName}/> 
            <input type="text" id={`lastName_${props.user._id}`} defaultValue={lastName}/>           
            <input type="text" id={`email_${props.user._id}`} defaultValue={email}/> 
            <input type="checkbox" id={`isAdmin_${props.user._id}`} defaultChecked={isAdmin}/> 

            <input id={`${props.user._id}`} type="button" value="save" onClick={handleChange} />
            <input type="button" value="delete" onClick={handleDelete} />
        </div>)

  }
  
  export {User};