import React, {useState, useEffect} from 'react';
import {userService} from './user.service';


function User(props) {

    const [username, setUsername] = useState(props.user.username);

    function handleChange(e) {
        e.preventDefault();
        setUsername(document.getElementById(`t_${e.target.id}`).value);
        userService.updateOneUser(
            {'id' : e.target.id,
            'username': document.getElementById(`t_${e.target.id}`).value,
            'password':"test",
            'firstName': "firDDstName1",
            'lastName': "lasDFtName1",
            'isAdmin': false}
            )
    }

    function handleRead(e) {
        e.preventDefault();
        console.log(username);
    }


    return (
        <div>
            <input type="text" id={`t_${props.user._id}`} defaultValue={username}/> <input id={`${props.user._id}`} type="button" value="save" onClick={handleChange} />
            <input type="button" value="read" onClick={handleRead} />
        </div>)

  }
  
  export {User};