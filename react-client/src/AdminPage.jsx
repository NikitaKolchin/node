import React from 'react';

class AdminPage extends React.Component{
    constructor(props) {
        super(props);
  
        this.state = {
            user: {}
        };
    } 
  
    componentDidMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
        });
    }
  
    render(){  
        const { user } = this.state;
        return user.isAdmin? <h2>Привет Админ {user.username}</h2>:<h2>Привет юзер {user.username}</h2>;
    }
}
  
export  {AdminPage};