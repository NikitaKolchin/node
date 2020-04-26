import React, {useState, useEffect} from 'react';
import {User} from './User'
import { userService } from './user.service';


function AdminPage(){
    let [currentUser, setCurrentUser] = useState({});
    let [newUser, setNewUser] =useState('');
    let [users, setUsers] = useState({loading: true});
    useEffect(async ()=>{
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
        setUsers(await userService.getAll())      
    },[]);

    function handleAddItem(index) {
       userService.addOneUser({'username': newUser.username}).then(newUser => setUsers(users => users.concat(newUser)));
    }

    function handleChangeNewUserName(e){
        setNewUser({'username': e.target.value});  
    }

    function handleDeleteItem(e){
        const del_id = e.target.id;
        userService.deleteOneUser(del_id).then(setUsers(users => users.filter(item => item._id !== del_id)));
    }
    

    if (users.loading) return(<div>Loading information...</div>);

    if (currentUser.isAdmin) {
        return (  
            <div>
                {currentUser.isAdmin?`Admin ${currentUser.username}`:`User ${currentUser.username}`}
                {users.length &&
                    <div>
                        {users.map((user, index) =>

                            <div key={user._id} >
                                <User user={user} />
                                <input type="button" value="delete" id={user._id} onClick={handleDeleteItem} /><br /><br />
                            </div>
                        )}
                    </div>
                }
                <input type="text" onChange={handleChangeNewUserName} />    
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