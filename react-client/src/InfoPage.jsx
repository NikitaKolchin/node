import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
// import { Alert, AlertTitle} from '@material-ui/lab';
// import { Visibility, VisibilityOff, Save, Delete, Add} from '@material-ui/icons';
// import { Checkbox, Button, Grid, Typography, Input, InputLabel, IconButton, InputAdornment, TextField, FormControl, Fab, MenuItem} from '@material-ui/core';
import MaterialTable from 'material-table';

import { backendService } from './backend.service';

function InfoPage() {
    let [currentUser, setCurrentUser] = useState({});
    let [matches, setMatches] = useState({loading: true});
    const teams = {"Бельгия":"Бельгия", 
                   "Италия":"Италия",
                   "Россия": "Россия",
                   "Финляндия": "Финляндия",
                   "Франция":"Франция",
                   "Польша": "Польша",
                   "Украина":  "Украина",
                   "Испания": "Испания",
                   "Турция" : "Турция",
                   "Англия": "Англия",
                   "Чехия": "Чехия",
                   "Швеция": "Швеция",
                   "Нидерланды": "Нидерланды",
                   "Германия":  "Германия",
                   "Хорватия": "Хорватия",
                   "Австрия": "Австрия",
                   "Португалия": "Португалия",
                   "Швейцария": "Швейцария",
                   "Дания": "Дания",
                   "Уэльс": "Уэльс"
                };
    const columns = [
                    { title: '_id', field: '_id', hidden: true },
                    { title: '№', field: 'matchNo' },
                    { title: 'Home', field: 'homeName', lookup: teams },
                    { title: 'Score', field: 'home', type: 'numeric' },
                    { title: 'Away', field: 'awayName', lookup: teams },
                    { title: 'Score', field: 'away',  type: 'numeric'},
                    { title: 'Coefficient', field: 'coefficient', type: 'numeric'},
                    { title: 'Enable', field: 'enable', type: 'boolean'},
                    { title: 'Visability', field: 'visability', type: 'boolean'}
                    ];
    
    useEffect(()=>{
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
        (async () => {
            setMatches(await backendService.getAll('matches'));
        })();  
    },[]);


    if (matches.loading) return(<div>Loading information...</div>);

    if (currentUser.isAdmin) {
        return (  
            <MaterialTable
 
            options={{
                pageSize: 10,
                pageSizeOptions : [10, 60]
            }}  
            title="Matches Information"
            columns={columns}    
            data = {matches} 
            editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      backendService.addOne('matches',
                      { "matchNo": newData.matchNo, 
                        "home":newData.home, 
                        "away": newData.away,
                        "homeName":newData.homeName, 
                        "awayName": newData.awayName, 
                        "coefficient": newData.coefficient, 
                        "enable": newData.enable,
                        "visability": newData.visability
                       })
                      .then(setMatches(matches => matches.concat(newData)))
                    }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      backendService.updateOne('matches',
                      { "_id": newData._id,
                        "matchNo": newData.matchNo, 
                        "home":newData.home, 
                        "away": newData.away,
                        "homeName":newData.homeName, 
                        "awayName": newData.awayName, 
                        "coefficient": newData.coefficient, 
                        "enable": newData.enable,
                        "visability": newData.visability
                     })
                     .then(data => { 
                          setMatches(matches => matches.map((item) =>{
                              if (item._id === data._id) {
                                  return item=data;
                                } else {
                                  return item;
                                }
                          } ));
                      });
                    //   if (oldData) {
                    //     setState((prevState) => {
                    //       const data = [...prevState.data];
                    //       data[data.indexOf(oldData)] = newData;
                    //       return { ...prevState, data };
                    //     });
                    //   }
                    }, 600);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      backendService.deleteOne('matches', oldData._id).then(setMatches(matches => matches.filter(item => item._id !== oldData._id)));
                    //   setState((prevState) => {
                    //     const data = [...prevState.data];
                    //     data.splice(data.indexOf(oldData), 1);
                    //     return { ...prevState, data };
                    //   });
                    }, 600);
                  }),
              }}
            
            />
            // <Grid container>
            //     <Grid item>
            //         <Typography variant='h3' gutterBottom>
            //              Информация ТОТО: {currentUser.username}
            //         </Typography>
            //     </Grid>    
               
                  
            //             {matches.map((match, index) =>
            //                 <Grid container spacing={2} key={match._id} >
            //                      <Grid item  xs={1}>
            //                         <TextField
            //                         id="outlined-number"
            //                         label="Match №"
            //                         type="number"
            //                         InputLabelProps={{
            //                             shrink: true,
            //                         }}
            //                         variant="outlined"
            //                         size = "small"
            //                         /> 
            //                      </Grid>   
            //                      <Grid item  xs={1}>
            //                         <TextField
            //                         id="outlined-select-team"
            //                         select
            //                         label="Home"
            //                         name = {match.matchNo}
            //                         value={match.homeName}
            //                         onChange={handleChange}
            //                         variant="outlined"
            //                         size = "small"
            //                         >
            //                         {teams.map((option) => (
            //                             <MenuItem key={option.value} value={option.value}>
            //                             {option.value}
            //                             </MenuItem>
            //                         ))}
            //                         </TextField>
            //                     </Grid>   
            //                     <Grid item  xs={1}> 
            //                         <TextField
            //                         id="outlined-number"
            //                         label="Home"
            //                         type="number"
            //                         InputLabelProps={{
            //                             shrink: true,
            //                         }}
            //                         variant="outlined"
            //                         size = "small"
            //                         />   
            //                     </Grid>  
            //                     <Grid item  xs={1}>            
            //                         <TextField
            //                         id="outlined-select-team"
            //                         select
            //                         label="Away"
            //                         name = {match.matchNo}
            //                         value={match.awayName}
            //                         onChange={handleChange}
            //                         variant="outlined"
            //                         size = "small"
            //                         >
            //                         {teams.map((option) => (
            //                             <MenuItem key={option.value} value={option.value}>
            //                             {option.value}
            //                             </MenuItem>
            //                         ))}
            //                         </TextField>
            //                     </Grid>
            //                     <Grid item  xs={1}>   
            //                         <TextField
            //                         id="outlined-number"
            //                         label="Away"
            //                         type="number"
            //                         InputLabelProps={{
            //                             shrink: true,
            //                         }}
            //                         variant="outlined"
            //                         size = "small"
            //                         />  
            //                     </Grid>    
            //                     <Grid item  xs={1}>      
            //                         <TextField
            //                         id="outlined-number"
            //                         label="Coefficient"
            //                         type="number"
            //                         InputLabelProps={{
            //                             shrink: true,
            //                         }}
            //                         variant="outlined"
            //                         size = "small"
            //                         />  
            //                     </Grid>    
            //                     <br/><br/>  <br/><br/>
            //                 </Grid>
            //             )}  
            //     <Grid item> 
            //     <p>
            //     <Link to="/">Home</Link> {currentUser.isAdmin&&<Link to="/admin">Admin</Link>} <Link to="/login">Logout</Link> 
            //     </p>
            //     </Grid>
            // </Grid>
        )
    }
    else 
    return (  
        <div>
            <h1>Access denied</h1>
        </div>)

}
export { InfoPage };