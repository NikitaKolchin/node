import React, {useState, useEffect} from 'react';
import { userService } from './user.service';
import TextField from '@material-ui/core/TextField';
import { Alert, AlertTitle} from '@material-ui/lab'
import { Checkbox, Button, Grid, Typography, } from '@material-ui/core';


function AdminPage(){
    let [currentUser, setCurrentUser] = useState({});
    let [newUser, setNewUser] =useState('');
    let [users, setUsers] = useState({loading: true});
    let [answer, setAnswer] = useState(false);

    useEffect(async ()=>{
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
        setUsers(await userService.getAll())      
    },[]);

    function handleAddItem() {
       userService.addOneUser({'username': newUser.username}).then(
           newUser => {
               setUsers(users => users.concat(newUser));
               setAnswer( JSON.parse(`{"message":"User ${newUser.username} has been added"}`));
            });
    }

    function handleChangeNewUserName(e){
        setNewUser({'username': e.target.value});  
    }

    function handleDeleteUser(id){
        userService.deleteOneUser(id).then(setUsers(users => users.filter(item => item._id !== id))).then(ans => setAnswer(ans));
        
    }
    
    function handleSaveUser(id) {
        let foundUser = users.find(item => item._id === id);
        userService.updateOneUser(
            {'id' : foundUser._id,
           // 'username': document.getElementById(`username_${e.target.id}`).value,
            'username': foundUser.username, 
            'password':foundUser.password,
            'firstName': foundUser.firstName,
            'lastName': foundUser.lastName,
            'email': foundUser.email,
            'isAdmin': foundUser.isAdmin}
            ).then(data => { 
                setUsers(users => users.map((item) =>{
                    if (item._id === data._id) {
                        return item=data;
                      } else {
                        return item;
                      }
                } ));
                setAnswer( JSON.parse(`{"message":"User ${data.username} has been changed"}`));
            });
    }

    function handleChangeField(e){
        let { name, value, id } = e.target;
        // let field = e.target.id.split('_')[0];
        // let id = e.target.id.split('_')[1];
        // let value = e.target.value;
        if (name ==='isAdmin') {
            value =e.target.checked;
        }
        setUsers(users => users.map((item) =>{
            if (item._id === id) {
                let temp = Object.assign({}, item);
                temp[name] = value;
                return item = temp;    
              } else {
                return item;
              }
        } ))
    }


    if (users.loading) return(<div>Loading information...</div>);

    if (currentUser.isAdmin) {
        return (  
            <Grid container>
                <Grid item>
                    <Typography variant='h3' gutterBottom>
                    Control Panel: {currentUser.username}
                    </Typography>
                </Grid>
                    {users.length &&
                    <Grid container>
                        {users.map((user, index) =>

                            <Grid item key={user._id} >
                                <TextField type="text_u"  label="Username"    id={user._id} name="username"   defaultValue={user.username}   onChange={handleChangeField}/> 
                                <TextField type="text_p"  label="Password"    id={user._id} name="password"  defaultValue={user.password}  onChange={handleChangeField}/> 
                                <TextField type="text_f"  label="First name"  id={user._id} name="firstName" defaultValue={user.firstName} onChange={handleChangeField}/> 
                                <TextField type="text_l"  label="Last name" id={user._id} name="lastName" defaultValue={user.lastName}  onChange={handleChangeField}/>           
                                <TextField type="text_e"  label="Email" id={user._id} name="email"     defaultValue={user.email}     onChange={handleChangeField}/> 
                                <Checkbox type="checkbox" id={user._id} name="isAdmin" defaultChecked={user.isAdmin} onClick={handleChangeField}/> 
                                <Button type="button" variant="contained" color="primary"   onClick={()=>handleSaveUser(user._id)} > Save </Button>
                                <Button type="button" variant="contained" onClick={()=>handleDeleteUser(user._id)}> Delete </Button>
                                <br /><br />
                            </Grid>
                        )}
                    </Grid>
                }
                <Grid item> 
                    <TextField type="text_ a" onChange={handleChangeNewUserName} />    
                    <Button variant="contained" color="primary" onClick={handleAddItem} disabled={!newUser} >Add</Button> <br /><br />
                    {answer&& <Alert severity="success"><AlertTitle> {answer.message}</AlertTitle></Alert>}  
                 </Grid>
            </Grid>)
    }
    else 
        return (  
            <div>
                <h1>Access denied</h1>
            </div>)
    
}

export {AdminPage};