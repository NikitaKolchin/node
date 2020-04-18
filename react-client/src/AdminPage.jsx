import React, {useState, useEffect} from 'react';
import {User} from './User'
import { userService } from './user.service';


function AdminPage(){
    let [currentUser, setCurrentUser] = useState({});
    let [newUser, setNewUser] =useState('');
    let [users, setUsers] = useState([]);
    useEffect(async ()=>{
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
        setUsers(await userService.getAll())      
    },[]);

    useEffect(() => {
        console.log('useeffect1 username '+newUser.username);
        console.log('useeffect2 users '+users.length);
    });

     function handleAddItem(e) {
       userService.addOneUser({'username': newUser.username}).then(newUser1 => setUsers(users => users.concat(newUser1)));
         
        console.log('handleAdd '+ users.length);
    }

    function handleChangeNewUserName(e){
        setNewUser({'username': e.target.value});
        console.log('handleChange '+ users.length);    
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
            <input type="text" onClick={handleChangeNewUserName} />    
            <input type="button" value="add" onClick={handleAddItem}  disabled={!newUser} />  
             
             
            </div>)
    }
    else 
        return (  
            <div>
                <h1>Access denied</h1>
            </div>)
    
}

export {AdminPage};