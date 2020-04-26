import React, {useState, useEffect} from 'react';
import {User} from './User'
import { userService } from './user.service';


function AdminPage(){
    let [currentUser, setCurrentUser] = useState({});
    let [newUser, setNewUser] =useState('');
    let [users, setUsers] = useState({loading: true});

    // let [username, setUsername] = useState('');
    // let [password, setPassword] = useState('');
    // let [firstName, setFirstName] = useState('');
    // let [lastName, setLastName] = useState('');
    // let [email, setEmail] = useState('');
    // let [isAdmin, setAdmin] = useState('');

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

    function handleDeleteUser(e){
        const del_id = e.target.id;
        userService.deleteOneUser(del_id).then(setUsers(users => users.filter(item => item._id !== del_id)));
    }
    
    function handleSaveUser(e) {
        userService.updateOneUser(
            {'id' : e.target.id,
            'username': document.getElementById(`username_${e.target.id}`).value,
            'password':document.getElementById(`password_${e.target.id}`).value,
            'firstName': document.getElementById(`firstName_${e.target.id}`).value,
            'lastName': document.getElementById(`lastName_${e.target.id}`).value,
            'email': document.getElementById(`email_${e.target.id}`).value,
            'isAdmin': document.getElementById(`isAdmin_${e.target.id}`).checked}
            ).then(data =>   {
                // придумать как хранить состояние каждого пользователя
                // setUsername(data.username);
                // setPassword(data.password);
                // setFirstName(data.firstName);
                // setLastName(data.lastName);
                // setEmail(data.email);
                // setAdmin(data.isAdmin);
                setUsers(users => users.map((item) =>{
                    if (item._id === data._id) {
                        return item=data;
                      } else {
                        return item;
                      }
                } ))
            });
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
                               {/* <User user={user} /> */}
                                <input type="text" id={`username_${user._id}`} defaultValue={user.username}/> 
                                <input type="text" id={`password_${user._id}`} defaultValue={user.password}/> 
                                <input type="text" id={`firstName_${user._id}`} defaultValue={user.firstName}/> 
                                <input type="text" id={`lastName_${user._id}`} defaultValue={user.lastName}/>           
                                <input type="text" id={`email_${user._id}`} defaultValue={user.email}/> 
                                <input type="checkbox" id={`isAdmin_${user._id}`} defaultChecked={user.isAdmin}/> 
                                <input type="button" value="save"   id={user._id} onClick={handleSaveUser} />
                                <input type="button" value="delete" id={user._id} onClick={handleDeleteUser} /><br /><br />
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