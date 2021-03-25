import React, { useState, useEffect } from "react";
import { backendService } from "./backend.service";
import { Alert, AlertTitle } from "@material-ui/lab";
import {
  Visibility,
  VisibilityOff,
  Save,
  Delete,
  Add,
  CloudUpload
} from "@material-ui/icons";
import {
  Checkbox,
  Button,
  Grid,
  Typography,
  Input,
  InputLabel,
  IconButton,
  InputAdornment,
  TextField,
  FormControl,
  Fab,
  CircularProgress,
} from "@material-ui/core";
import { MyMenu } from "./MyMenu";

const crypto = require("crypto");

function AdminPage() {
  const [currentUser, setCurrentUser] = useState({});
  const [newUser, setNewUser] = useState("");
  const [users, setUsers] = useState({ loading: true });
  const [answer, setAnswer] = useState(false);

  useEffect(() => {
    let clean = false;
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    backendService.getAll("users").then((users) => {
      //это чтобы избежать рендера на не существующих объектах
      if (!clean) {
        setUsers(
          users.map((item) => ({
            ...item,
            passwordChanged: false,
            showPassword: false,
          }))
        );
      }
    });
    return () => (clean = true);
  }, []);

  const handleAddItem = () => {
    backendService
      .addOne("users", { username: newUser.username })
      .then((newUser) => {
        setUsers((users) => users.concat(newUser));
        setAnswer(
          JSON.parse(`{"message":"User ${newUser.username} has been added"}`)
        );
        setNewUser({ username: "" });
      });
  };

  const handleChangeNewUserName = (event) => {
    setNewUser({ username: event.target.value });
  };

  const handleDeleteUser = (id) => {
    backendService
      .deleteOne("users", id)
      .then(setUsers((users) => users.filter((item) => item._id !== id)))
      .then((ans) => setAnswer(ans));
  };

  const handleSaveUser = (id) => {
    const foundUser = { ...users.find((item) => item._id === id) };
    backendService
      .updateOne("users", {
        ...foundUser,
        password: foundUser.passwordChanged
          ? crypto
              .createHash("sha256")
              .update(foundUser.password)
              .digest("base64")
          : foundUser.password,
      })
      .then((data) => {
        setUsers(
          users.map((item) => (item._id === data._id ? (item = data) : item))
        );
        setAnswer(
          JSON.parse(`{"message":"User ${data.username} has been changed"}`)
        );
      });
  };

  // const handleChangeField = (event) => {
  //   let value = event.target.value
  //   const { name, id } = event.target
  //   if (name === 'isAdmin') {
  //     value = event.target.checked
  //   }
  //   setUsers(users.map((item) => ({ ...item, name: item._id === id ? value : name })))
  // }

  const handleChangeField = (e) => {
    let { name, value, id } = e.target;
    if (name === "isAdmin") {
      value = e.target.checked;
    }
    setUsers((users) =>
      users.map((item) => {
        if (item._id === id) {
          let temp = Object.assign({}, item);
          temp[name] = value;
          if (name === "password") temp.passwordChanged = true;
          return (item = temp);
        } else {
          return item;
        }
      })
    );
  };

  const handleClickShowPassword = (id) => {
    setUsers(
      users.map((item) => ({
        ...item,
        showPassword: item._id === id ? !item.showPassword : item.showPassword,
      }))
    );
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUpdateMoney= () => {
    backendService.calcMoney();
  }


  //тут можно модную крутилку добавить CircularProgress или еще чего.
  if (users.loading) return <div><CircularProgress/></div>;

  if (currentUser.isAdmin) {
    return (
      <Grid container>
        <Grid item>
          <MyMenu currentUser={currentUser} />
        </Grid>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Users control panel: {currentUser.username}
          </Typography>
        </Grid>
        {users.length && (
          <Grid container>
            {users.map((user, index) => (
              <Grid item key={user._id}>
                <TextField
                  type="text_u"
                  label="Username"
                  id={user._id}
                  name="username"
                  defaultValue={user.username}
                  onChange={handleChangeField}
                />
                <FormControl>
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    id={user._id}
                    type={user.showPassword ? "text" : "password"}
                    name="password"
                    //                    defaultValue={user.password}
                    onChange={handleChangeField}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handleClickShowPassword(user._id)}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {user.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <TextField
                  type="text_f"
                  label="First name"
                  id={user._id}
                  name="firstName"
                  defaultValue={user.firstName}
                  onChange={handleChangeField}
                />
                <TextField
                  type="text_l"
                  label="Last name"
                  id={user._id}
                  name="lastName"
                  defaultValue={user.lastName}
                  onChange={handleChangeField}
                />
                <TextField
                  type="text_e"
                  label="Email"
                  id={user._id}
                  name="email"
                  defaultValue={user.email}
                  onChange={handleChangeField}
                />
                <Checkbox
                  type="checkbox"
                  id={user._id}
                  name="isAdmin"
                  defaultChecked={user.isAdmin}
                  onClick={handleChangeField}
                />
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={() => handleSaveUser(user._id)}
                  startIcon={<Save />}
                >
                  {" "}
                  Save{" "}
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => handleDeleteUser(user._id)}
                  startIcon={<Delete />}
                >
                  {" "}
                  Delete{" "}
                </Button>
                <br />
                <br />
              </Grid>
            ))}
          </Grid>
        )}
        <Grid item>
          <TextField
            type="text_ a"
            onChange={handleChangeNewUserName}
            value={newUser.username}
          />
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleAddItem}
            disabled={!newUser}
          >
            <Add />
          </Fab>
          <br />
          <br />
          {answer && (
            <Alert severity="success">
              <AlertTitle> {answer.message}</AlertTitle>
            </Alert>
          )}
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

export { AdminPage };
