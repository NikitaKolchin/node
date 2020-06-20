import React, { useState } from "react";
import { backendService } from "./backend.service";
import { Alert, AlertTitle } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";
import {
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import {
  Button,
  Grid,
  Typography,
  Input,
  InputLabel,
  IconButton,
  InputAdornment,
  FormControl,
} from "@material-ui/core";

let crypto = require("crypto");

const LoginPage = (props) => {
  backendService.logout();
  const [state, setState] = useState({
    username: "",
    password: "",
    error: "",
    loading: false,
    submitted: false,
    showPassword: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setState((state) => ({ ...state, submitted: true }));
    const { username, password } = state;

    // stop here if form is invalid
    if (!(username && password)) {
      return;
    }

    setState((state) => ({ ...state, loading: true }));
    backendService
      .login(
        username,
        crypto.createHash("sha256").update(password).digest("base64")
      )
      .then(
        () => {
          const { from } = props.location.state || {
            from: { pathname: "/" },
          };
          props.history.push(from);
        },
        (error) => {
          setState((state) => ({ ...state, error: error, loading: false }));
        }
      );
  };

  const handleClickShowPassword = (sp) => {
    setState((state) => ({ ...state, showPassword: sp }));
 };

 const handleMouseDownPassword = (event) => {
   event.preventDefault();
 };
 // добавить Alert вместо div и ShowPassword
  return (
    <Grid container>
      <Grid item>
        <Typography variant="h3" gutterBottom>
          Login:
        </Typography>
      </Grid>

        <Grid container>
          <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={state.username}
              onChange={handleChange}
            />
            {state.submitted && !state.username && (
                      <Alert severity="warning">
                      <AlertTitle>Username is required</AlertTitle>
                    </Alert>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              type={state.showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              value={state.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword(!state.showPassword)}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {state.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            {state.submitted && !state.password && (
                      <Alert severity="warning">
                      <AlertTitle>Password is required</AlertTitle>
                    </Alert>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <Button type="submit" variant="contained" disabled={state.loading} onClick={handleSubmit}>
            Login
          </Button>
          {state.loading && (
            <CircularProgress/> 
          )}
            {state.error && (
            <Alert severity="error">
              <AlertTitle> {state.error}</AlertTitle>
            </Alert>
          )}
        </Grid>
      
    </Grid>
  );
};

export { LoginPage };

// import React, { useState, useEffect } from "react";
// import { backendService } from "./backend.service";

// let crypto = require('crypto');

// class LoginPage extends React.Component {
//   constructor(props) {
//     super(props);

//     backendService.logout();

//     this.state = {
//       username: "",
//       password: "",
//       submitted: false,
//       loading: false,
//       error: "",
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(e) {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   }

//   handleSubmit(e) {
//     e.preventDefault();

//     this.setState({ submitted: true });
//     const { username, password, returnUrl } = this.state;

//     // stop here if form is invalid
//     if (!(username && password)) {
//       return;
//     }

//     this.setState({ loading: true });
//     backendService.login(username, crypto.createHash('sha256').update(password).digest('base64')).then(
//       (user) => {
//         const { from } = this.props.location.state || {
//           from: { pathname: "/" },
//         };
//         this.props.history.push(from);
//       },
//       (error) => this.setState({ error, loading: false })
//     );
//   }

//   render() {
//     const { username, password, submitted, loading, error } = this.state;
//     return (
//       <div className="col-md-6 col-md-offset-3">
//         <div className="alert alert-info">
//           Username: test
//           <br />
//           Password: test
//         </div>
//         <h2>Login</h2>
//         <form name="form" onSubmit={this.handleSubmit}>
//           <div
//             className={
//               "form-group" + (submitted && !username ? " has-error" : "")
//             }
//           >
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               className="form-control"
//               name="username"
//               value={username}
//               onChange={this.handleChange}
//             />
//             {submitted && !username && (
//               <div className="help-block">Username is required</div>
//             )}
//           </div>
//           <div
//             className={
//               "form-group" + (submitted && !password ? " has-error" : "")
//             }
//           >
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               name="password"
//               value={password}
//               onChange={this.handleChange}
//             />
//             {submitted && !password && (
//               <div className="help-block">Password is required</div>
//             )}
//           </div>
//           <div className="form-group">
//             <button className="btn btn-primary" disabled={loading}>
//               Login
//             </button>
//             {loading && (
//               <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
//             )}
//           </div>
//           {error && <div className={"alert alert-danger"}>{error}</div>}
//         </form>
//       </div>
//     );
//   }
// }

// export { LoginPage };
