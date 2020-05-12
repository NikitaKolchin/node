import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import { backendService } from './backend.service';

function HomePage() {
    let [currentUser, setCurrentUser] = useState({});
    let [stakes, setStakes] = useState({loading: true});
    let [matches, setMatches] = useState({loading: true});

    const columns = [
        { title: '_id', field: '_id', hidden: true },
        { title: '№', field: 'matchNo',  editable: 'never' },
        { title: 'Home', field: 'homeName', lookup: backendService.teams, editable: 'never' },
        { title: 'Score', field: 'home', type: 'numeric' },
        { title: 'Away', field: 'awayName', lookup: backendService.teams,  editable: 'never' },
        { title: 'Score', field: 'away',  type: 'numeric'},
        { title: 'Coefficient', field: 'coefficient', type: 'numeric',  editable: 'never'},
        { title: 'Enable', field: 'enable', type: 'boolean', editable: 'never'}
      ];

    useEffect(()=>{
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
        (async () => {
            setStakes(await backendService.getStakesByUserId(JSON.parse(localStorage.getItem('user'))._id));
        })();  
        (async () => {
            setMatches(await backendService.getAll('matches'));
        })(); 
    },[]); 

    const getMergedArray = (stakesArr, matchesArr) => {
        return matchesArr.map((match) => {
            let stake = stakesArr.find(item => item.matchNo === match.matchNo);
            if ((stake!==undefined)&&(match.matchNo === stake.matchNo)) {
                let temp = Object.assign({}, match); //может можно без копирования объекта
                temp.home = stake.home;
                temp.away = stake.away;
                return match = temp;    
              } else {
                return match;
              }
        } );
    }
    if (matches.loading||stakes.loading) return(<div>Loading information...</div>);

    return( 
            <div>
                <MaterialTable
                options={{
                    pageSize: 10,
                    pageSizeOptions : [10, 60]
                }}  
                title={`Set stakes, ${currentUser.username}`}
                columns={columns}    
                data = {getMergedArray(stakes, matches)} 
                editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                        //   backendService.updateOne('matches',
                        //   { "_id": newData._id,
                        //     "matchNo": newData.matchNo, 
                        //     "home":newData.home, 
                        //     "away": newData.away,
                        //     "homeName":newData.homeName, 
                        //     "awayName": newData.awayName, 
                        //     "coefficient": newData.coefficient, 
                        //     "enable": newData.enable,
                        //     "visability": newData.visability
                        //  })
                        // .then(data => { 
                        //       setMatches(matches => matches.map((item) =>{
                        //           if (item._id === data._id) {
                        //               return item=data;
                        //             } else {
                        //               return item;
                        //             }
                        //       } ));
                        //   });
                        }, 600);
                      }),
                  }} 
                />
                {/* <h1>Привет, {currentUser.firstName}!</h1>
                <h3>Сделать ставки можно здесь:</h3>
                {stakes.loading && <em>Loading stakes...</em>}
                {stakes.length && matches.length &&
                    <ul>
                        {getMergedArray(stakes, matches).map((stake, index) =>
                            <li key={stake._id}> 
                                {stake.homeName+ ' '+stake.home +' ' + stake.awayName+' ' + stake.away}
                            </li>   
                        )}
                    </ul>
                } */}
                <p>
                    <Link to="/info">Info</Link> {currentUser.isAdmin&&<Link to="/admin">Admin</Link>} <Link to="/login">Logout</Link>
                </p>
            </div>
    )
}
export { HomePage };