import React, {useState, useEffect} from 'react';
import {User} from './User'
import { userService } from './user.service';


function AdminPage(){
    let [currentUser, setCurrentUser] = useState({});
    let [users, setUsers] = useState([]);
    let [renderz, setRenderz] = useState(false);
    useEffect(async ()=>{
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
        setUsers(await userService.getAll())      
    },[renderz]);

    function handleAdd(e) {
        e.preventDefault();
       // users.push({});
        setUsers(users.push({username: "sdf"}));
        setRenderz(true);
        console.log(users);
    }
    

    if (currentUser.isAdmin) {
        return (  
            <div>
                {currentUser.isAdmin?`Admin ${currentUser.username}`:`User ${currentUser.username}`}
                {users.length &&
                    <div>
                        {users.map((user, index) =>

                            <div key={user._id}>
                                <User user={user} />
                            </div>
                        )}
                    </div>
                }
            <input type="button" value="add" onClick={handleAdd} />    
            </div>)
    }
    else 
        return (  
            <div>
                <h1>Access denied</h1>
            </div>)
    
}

export {AdminPage};