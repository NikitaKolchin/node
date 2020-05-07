import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import { userService } from './user.service';

function InfoPage() {
    const info =
     [{ matchNo: 1,  home: null, away: null, homeName: 'Russia', awayName: 'Scotland', coefficient: 1, enable: true, visability: true}, 
      { matchNo: 2,  home: null, away: null, homeName: 'England', awayName: 'Spain', coefficient: 1, enable: true, visability: true} ];
    let [currentUser, setCurrentUser] = useState({});
    let [stakes, setStakes] = useState({loading: true});

    useEffect(()=>{
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
        (async () => {
            setStakes(await userService.getStakesByUserId(JSON.parse(localStorage.getItem('user'))._id));
        })();  
    },[]);

    return( 
            <div>
                <h1>Привет, {currentUser.firstName}!</h1>
                <h3>Информация ТОТО:</h3>
                {stakes.loading && <em>Loading stakes...</em>}
                {stakes.length &&
                    <ul>
                        {stakes.map((stake, index) =>
                            <li key={stake._id}> 
                                {info[index].homeName+ ' '+stake.home +' ' + info[index].awayName+' ' + stake.away}
                            </li>     
                        )}
                    </ul>
                }
                <p>
                <Link to="/">Home</Link> {currentUser.isAdmin&&<Link to="/admin">Admin</Link>} <Link to="/login">Logout</Link> 
                </p>
            </div>
    )
}
export { InfoPage };