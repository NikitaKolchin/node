import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import { userService } from './user.service';

function HomePage() {
    let [currentUser, setCurrentUser] = useState({});
    let [stakes, setStakes] = useState({loading: true});

    useEffect(()=>{
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
        (async () => {
            setStakes(await userService.getStakesByUserId(JSON.parse(localStorage.getItem('user'))._id));
        })();  //повторить в админке
    },[]);

    return( 
            <div>
                <h1>Hi {currentUser.firstName}!</h1>
                <h3>Users from secure api end point:</h3>
                {stakes.loading && <em>Loading users...</em>}
                {stakes.length &&
                    <ul>
                        {stakes.map((stake, index) =>
                            <li key={stake.id}>
                                {stake.home + ' ' + stake.away}
                            </li>
                        )}
                    </ul>
                }
                <p>
                     <Link to="/login">Logout</Link>
                </p>
            </div>
    )
}
export { HomePage };