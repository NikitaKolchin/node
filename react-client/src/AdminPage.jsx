import React, {useState} from 'react';
import { useEffect } from 'react';
import { userService } from './user.service';


function AdminPage(){
    let [currentUser, setCurrentUser] = useState({});
    let [users, setUsers] = useState([]);
    useEffect(async ()=>{
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
        setUsers(await userService.getAll())      
    },[]);

    function handleChange(e) {
        e.preventDefault();
        document.getElementById(`t_${e.target.id}`).textContent = "New text!";
        console.log(e.target.innerText);
      }
    

    if (currentUser.isAdmin) {
        return (  
            <div>
                {currentUser.isAdmin?`Admin ${currentUser.username}`:`User ${currentUser.username}`}
                {users.length &&
                    <div>
                        {users.map((user, index) =>

                            <div key={user._id}>
                                Имя:
                                <input type="text" id={`t_${user._id}`} defaultValue={user.username}/> <input id={`${user._id}`} type="button" value="save" onClick={handleChange} />
                            </div>
                        )}
                    </div>
                }
            </div>)
    }
    else 
        return (  
            <div>
                <h1>Access denied</h1>
            </div>)
    
}

export {AdminPage};