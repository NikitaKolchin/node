import React, {useState} from 'react';
import { useEffect } from 'react';
import { userService } from './user.service';
// class AdminPage extends React.Component{
//     constructor(props) {
//         super(props);
  
//         this.state = {
//             user: {}
//         };
//     } 
  
//     componentDidMount() {
//         this.setState({ 
//             user: JSON.parse(localStorage.getItem('user')),
//         });
//     }
  
//     render(){  
//         const { user } = this.state;
//         return user.isAdmin? <h2>Привет Админ {user.username}</h2>:<h2>Привет юзер {user.username}</h2>;
//     }
// }

function AdminPage(){
    let [user, setUser] = useState({});
    let [users, setUsers] = useState([]);
    useEffect(async ()=>{
        setUser(JSON.parse(localStorage.getItem('user')));
        setUsers(await userService.getAll())      
    },[]);

    return (
    
        <div>
            {user.firstName}
            {users.length}
        
                     {users.loading && <em>Loading users...</em>}
                     {users.length &&
                         <ul>
                             {users.map((user, index) =>
                                 <li key={user.id}>
                                     {user.firstName + ' ' + user.lastName}
                                 </li>
                             )}
                         </ul>
                     }
        
    </div>)
}

export {AdminPage};