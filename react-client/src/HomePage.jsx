import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import { backendService } from './backend.service';

function HomePage() {
    const info =
     [{ matchNo: 1,  home: null, away: null, homeName: 'Russia', awayName: 'Scotland', coefficient: 1, enable: true, visability: true}, 
      { matchNo: 2,  home: null, away: null, homeName: 'England', awayName: 'Spain', coefficient: 1, enable: true, visability: true} ];
    let [currentUser, setCurrentUser] = useState({});
    let [stakes, setStakes] = useState({loading: true});

    useEffect(()=>{
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
        (async () => {
            setStakes(await backendService.getStakesByUserId(JSON.parse(localStorage.getItem('user'))._id));
        })();  
    },[]);

    return( 
            <div>
                <h1>Привет, {currentUser.firstName}!</h1>
                <h3>Сделать ставки можно здесь:</h3>
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
                    <Link to="/info">Info</Link> {currentUser.isAdmin&&<Link to="/admin">Admin</Link>} <Link to="/login">Logout</Link>
                </p>
            </div>
    )
}
export { HomePage };