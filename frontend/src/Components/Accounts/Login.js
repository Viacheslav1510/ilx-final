import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import axios from "axios";

// Contexts
import DispatchContext from "../Contexts/DispatchContext";
import StateContext from "../Contexts/StateContext";

const Login = () => {
  const paperType = {
    margin: "20px auto",
    padding: "30px 20px",
    border: "2px solid #feb55f",
  };
  const textFieldType = { marginBottom: "10px" };
  const anchor = { color: "#feb55f" };

  const navigate = useNavigate();

  const GlobalDispatch = useContext(DispatchContext);
  const GlobalState = useContext(StateContext);

  const initialState = {
    emailValue: "",
    passwordValue: "",
    sendRequest: 0,
    token: "",
    openSnack: false,
    disabledBtn: false,
    serverError: false,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchEmailChange":
        draft.emailValue = action.emailChosen;
        draft.serverError = false;
        break;
      case "catchPasswordChange":
        draft.passwordValue = action.passwordChosen;
        draft.serverError = false;
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;
      case "catchToken":
        draft.token = action.tokenValue;
        break;
      case "openTheSnack":
        draft.openSnack = true;
        break;
      case "disableTheBtn":
        draft.disabledBtn = true;
        break;
      case "catchServerError":
        draft.serverError = true;
        break;
      case "allowTheBtn":
        draft.disabledBtn = false;
        break;
      default:
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    dispatch({ type: "changeSendRequest" });
    dispatch({ type: "disableTheBtn" });
  };

  // Login

  useEffect(() => {
    if (state.sendRequest) {
      const source = axios.CancelToken.source();
      async function SignIn() {
        try {
          await axios
            .post(
              "https://ilx-final-4a1e6f3ac2ff.herokuapp.com/auth/token/login/",
              {
                email: state.emailValue,
                password: state.passwordValue,
              },
              { cancelToken: source.token }
            )
            .then((response) => {
              console.log(response);
              dispatch({
                type: "catchToken",
                tokenValue: response.data.auth_token,
              });
              GlobalDispatch({
                type: "catchToken",
                tokenValue: response.data.auth_token,
              });
              //navigate("/");
            });
        } catch (error) {
          console.log("Response data:", error.response.data);
          dispatch({ type: "allowTheBtn" });
          dispatch({ type: "catchServerError" });
        }
      }
      SignIn();
      return () => {
        source.cancel();
      };
    }
  }, [state.sendRequest]);

  //Get user info

  useEffect(() => {
    if (state.token !== "") {
      const source = axios.CancelToken.source();
      async function GetUserInfo() {
        try {
          await axios
            .get(
              "https://ilx-final-4a1e6f3ac2ff.herokuapp.com/auth/users/me/",
              {
                headers: { Authorization: "Token ".concat(state.token) },
              },
              { cancelToken: source.token }
            )
            .then((response) => {
              console.log(response);
              GlobalDispatch({
                type: "userSignedIn",
                userNameInfo: response.data.username,
                userEmailInfo: response.data.email,
                userIdInfo: response.data.id,
                userIsLoggedIn: true,
              });
              dispatch({ type: "openTheSnack" });
            });
        } catch (error) {
          console.log("Response data:", error.response.data);
        }
      }
      GetUserInfo();
      return () => {
        source.cancel();
      };
    }
  }, [state.token]);

  //success message before redirect
  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [state.openSnack]);

  return (
    <div>
      <Grid container>
        <Paper
          style={paperType}
          elevation={20}
          sx={{ width: { xs: "100%", sm: "80%", md: "40%" } }}
        >
          <Grid align="center" sx={{ marginBottom: "10px" }} item xs={12}>
            <Typography variant="h4">SignIn</Typography>
            <Typography variant="caption">
              Please enter your credentials to access the system
            </Typography>
            {state.serverError ? (
              <Alert severity="error">
                Incorrect email or password, try again!
              </Alert>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid
            item
            xs={8}
            align="center"
            sx={{ marginRight: "auto", marginLeft: "auto" }}
          >
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="filled"
                value={state.emailValue}
                placeholder="Enter a valid email"
                style={textFieldType}
                required
                onChange={(e) =>
                  dispatch({
                    type: "catchEmailChange",
                    emailChosen: e.target.value.trim(),
                  })
                }
                error={state.serverError ? true : false}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                variant="filled"
                value={state.passwordValue}
                placeholder="Enter password"
                required
                minLength="6"
                onChange={(e) =>
                  dispatch({
                    type: "catchPasswordChange",
                    passwordChosen: e.target.value.trim(),
                  })
                }
                style={textFieldType}
                error={state.serverError ? true : false}
              />
              <Button
                variant="contained"
                fullWidth
                style={textFieldType}
                type="submit"
                sx={{
                  backgroundColor: "#feb55f",
                  color: "white",
                  "&:hover": { backgroundColor: "black", color: "#feb55f" },
                }}
                disabled={state.disabledBtn}
              >
                SignIn
              </Button>
              <Box display={"flex"}>
                <Typography variant="small" flex={1}>
                  <span style={{ cursor: "pointer" }}>
                    Forgot Password?{" "}
                    <Link to="/reset-password" style={anchor}>
                      Reset
                    </Link>
                  </span>
                </Typography>
                <Typography
                  variant="small"
                  flex={1}
                  style={{ cursor: "pointer" }}
                >
                  <span>
                    No account yet?{" "}
                    <Link to="/register" style={anchor}>
                      SignUp
                    </Link>
                  </span>
                </Typography>
              </Box>
            </form>
          </Grid>
          <Grid item xs={2}></Grid>
        </Paper>
      </Grid>
      <Snackbar
        open={state.openSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">You have successfully logged in!</Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
