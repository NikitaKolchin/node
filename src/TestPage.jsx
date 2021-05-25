import React, { useState, useEffect } from "react";
import { backendService } from "./backend.service";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Add, Delete, CloudUpload } from "@material-ui/icons";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Fab,
  CircularProgress,
} from "@material-ui/core";
import { MyMenu } from "./MyMenu";

function TestPage() {
  const [currentUser, setCurrentUser] = useState({});
  const [matches, setMatches] = useState(0);
  const [stackes, setStackes]= useState(0);
  const [answer, setAnswer] = useState(false);

  useEffect(() => {
    let clean = false;
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    return () => (clean = true);
  }, []);

  const handleUpdateMoney = () => {
    backendService
      .calcMoney()
      .then((data) => setAnswer(JSON.parse(`{"message":"Update ${data}"}`)));
  };

  const handleZeroingMoney = () => {
    backendService
      .zeroingMoney()
      .then((data) => setAnswer(JSON.parse(`{"message":"Zeroing ${data}"}`)));
  };

  const handleChangeAddStakesData = (e) => {
    setStackes(e.target.value);  
  };

  const handleAddStakesData = () => {
    backendService.setTestStakes(stackes, false).then(data => setAnswer(JSON.parse(`{"message":"setTestStakes ${data} ${stackes}"}`)));
  };

  const handleChangeAddMatchesData = (e) => {
    setMatches(e.target.value);
  };

  const handleAddMatchesData = () => {
    backendService.setTestMatches(matches, false).then(data => setAnswer(JSON.parse(`{"message":"setTestMatches ${data} ${matches}"}`)));
  };

  const handleZeroingStakes = () => {
    backendService.setTestStakes(stackes, true).then(data => setAnswer(JSON.parse(`{"message":"zeroingTestStakes ${data} ${stackes}"}`)));
  };

  const handleZeroingMatches = () => {
    backendService.setTestMatches(matches, true).then(data => setAnswer(JSON.parse(`{"message":"zeroingTestMatches ${data} ${matches}"}`)));
  };


  //тут можно модную крутилку добавить CircularProgress или еще чего.
  if (currentUser.loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  if (currentUser.isAdmin) {
    return (
      <Grid container>
        <Grid item>
          <MyMenu currentUser={currentUser} />
        </Grid>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Test panel: {currentUser.username}
          </Typography>
        </Grid>
        <Grid container>
          <Grid item>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleUpdateMoney}
              startIcon={<CloudUpload />}
            >
              {" "}
              Обновить суммы{" "}
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="button"
              variant="contained"
              color="default"
              onClick={handleZeroingMoney}
              startIcon={<Delete />}
            >
              {" "}
              Обнулить суммы{" "}
            </Button>
          </Grid>
        </Grid>
        <br />
        <br /> 
        <br />
        <br />
        <Grid container>
          <Grid item>
            <TextField
              label="Stackes for every user"
              type="text"
              onChange={handleChangeAddStakesData}
              value={stackes}
            />
            <Fab
              color="primary"
              aria-label="add"
              onClick={handleAddStakesData}
              disabled={false}
            >
              <Add />
            </Fab>
          </Grid>
          <Grid item>
            <TextField
              label="Matches"
              type="text"
              onChange={handleChangeAddMatchesData}
              value={matches}
            />
            <Fab
              color="primary"
              aria-label="add"
              onClick={handleAddMatchesData}
              disabled={false}
            >
              <Add />
            </Fab>
          </Grid>
        </Grid>

        <br />
        <br /> 
        <br />
        <br />

        <Grid container>
          <Grid item>
            <Button
              type="button"
              variant="contained"
              color="default"
              onClick={handleZeroingStakes}
              startIcon={<Delete />}
            >
              {" "}
              Обнулить ставки{" "}
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="button"
              variant="contained"
              color="default"
              onClick={handleZeroingMatches}
              startIcon={<Delete />}
            >
              {" "}
              Обнулить матчи{" "}
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            {answer && (
              <Alert severity="success">
                <AlertTitle> {answer.message}</AlertTitle>
              </Alert>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  } else
    return (
      <div>
        <h1>Access denied</h1>
      </div>
    );
}

export { TestPage };
