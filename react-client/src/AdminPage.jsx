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

    function handleDeleteUser(e){
        const del_id = e.target.id;
        userService.deleteOneUser(del_id).then(setUsers(users => users.filter(item => item._id !== del_id)));
    }
    
    function handleSaveUser(e) {
        let id = e.target.id;
        userService.updateOneUser(
            {'id' : id,
           // 'username': document.getElementById(`username_${e.target.id}`).value,
            'username': users.find(item => item._id === id).username, 
            'password':users.find(item => item._id === id).password,
            'firstName': users.find(item => item._id === id).firstName,
            'lastName': users.find(item => item._id === id).lastName,
            'email': users.find(item => item._id === id).email,
            'isAdmin': users.find(item => item._id === id).isAdmin}
            ).then(data => { 
                setUsers(users => users.map((item) =>{
                    if (item._id === data._id) {
                        return item=data;
                      } else {
                        return item;
                      }
                } ))
            });
    }

    function handleChangeField(e){
        let field = e.target.id.split('_')[0];
        let id = e.target.id.split('_')[1];
        let value = e.target.value;
        if (field ==='isAdmin') {
            value =e.target.checked;
        }
        setUsers(users => users.map((item) =>{
            if (item._id === id) {
                let temp = Object.assign({}, item);
                temp[field] = value;
                return item = temp;    
              } else {
                return item;
              }
        } ))
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
                                <input type="text" id={`username_${user._id}`} defaultValue={user.username} onChange={handleChangeField}/> 
                                <input type="text" id={`password_${user._id}`} defaultValue={user.password} onChange={handleChangeField}/> 
                                <input type="text" id={`firstName_${user._id}`} defaultValue={user.firstName} onChange={handleChangeField}/> 
                                <input type="text" id={`lastName_${user._id}`} defaultValue={user.lastName} onChange={handleChangeField}/>           
                                <input type="text" id={`email_${user._id}`} defaultValue={user.email} onChange={handleChangeField}/> 
                                <input type="checkbox" id={`isAdmin_${user._id}`} defaultChecked={user.isAdmin} onClick={handleChangeField}/> 
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