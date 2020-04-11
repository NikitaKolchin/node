import React, {useState} from 'react';
import { useEffect } from 'react';

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
    useEffect(()=> setUser(JSON.parse(localStorage.getItem('user'))),{});
    return user.isAdmin? <h2>Привет Админ {user.username}</h2>:<h2>Привет юзер {user.username}</h2>;
}

export {AdminPage};