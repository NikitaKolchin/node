import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Alert, AlertTitle} from '@material-ui/lab';
import { Visibility, VisibilityOff, Save, Delete, Add} from '@material-ui/icons';
import { Checkbox, Button, Grid, Typography, Input, InputLabel, IconButton, InputAdornment, TextField, FormControl, Fab, MenuItem} from '@material-ui/core';

import { backendService } from './backend.service';

function InfoPage() {
    let [currentUser, setCurrentUser] = useState({});
    let [matches, setMatches] = useState({loading: true});
    const teams = [
        {value: "Бельгия"},
        {value: "Италия"},
        {value: "Россия"},
        {value: "Польша"},
        {value: "Украина"},
        {value: "Испания"},
        {value: "Турция"},
        {value: "Франция"},
        {value: "Англия"},
        {value: "Чехия"},
        {value: "Финляндия"},
        {value: "Швеция"},
        {value: "Нидерланды"},
        {value: "Германия"},
        {value: "Хорватия"},
        {value: "Австрия"},
        {value: "Португалия"},
        {value: "Швейцария"},
        {value: "Дания"},
        {value: "Уэльс"}
    ]
    useEffect(()=>{
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
        (async () => {
            setMatches(await backendService.getAll('matches'));
        })();  
    },[]);

    function handleChange(e){
        console.log(e.target);  
    }

    if (matches.loading) return(<div>Loading information...</div>);

    if (currentUser.isAdmin) {
        return (  
            <Grid container>
                <Grid item>
                    <Typography variant='h3' gutterBottom>
                         Информация ТОТО: {currentUser.username}
                    </Typography>
                </Grid>    
                {matches.length &&
                    <Grid container>
                        {matches.map((match, index) =>
                            <Grid item key={match._id} >
                                    <TextField
                                    id="outlined-select-team"
                                    select
                                    label="Home"
                                    name = {match.matchNo}
                                    value={match.homeName}
                                    onChange={handleChange}
                                    helperText={`Матч № ${match.matchNo}`}
                                    variant="outlined"
                                    >
                                    {teams.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.value}
                                        </MenuItem>
                                    ))}
                                    </TextField>

                                    <TextField
                                    id="outlined-select-team"
                                    select
                                    label="Away"
                                    name = {match.matchNo}
                                    value={match.awayName}
                                    onChange={handleChange}
                                    helperText={`Матч № ${match.matchNo}`}
                                    variant="outlined"
                                    >
                                    {teams.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.value}
                                        </MenuItem>
                                    ))}
                                    </TextField>
                            </Grid>
                        )}
                     </Grid>   
                }
                <Grid item> 
                <p>
                <Link to="/">Home</Link> {currentUser.isAdmin&&<Link to="/admin">Admin</Link>} <Link to="/login">Logout</Link> 
                </p>
                </Grid>
            </Grid>
        )
    }
    else 
    return (  
        <div>
            <h1>Access denied</h1>
        </div>)

}
export { InfoPage };