import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { TextField, Button, Link, Typography } from "@mui/material";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

function Register() {
  const navigate = useNavigate();

  const initialState = {
    usernameValue: "",
    emailValue: "",
    passwordValue: "",
    password2Value: "",
    sendRequest: 0,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchUsernameChange":
        draft.usernameValue = action.usernameChoice;
        break;
      case "catchEmailChange":
        draft.emailValue = action.emailChoice;
        break;
      case "catchPasswordChange":
        draft.passwordValue = action.passwordChoice;
        break;
      case "catchPassword2Change":
        draft.password2Value = action.password2Choice;
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  function RegisterSubmit(e) {
    e.preventDefault();
    console.log("Submitted");
    dispatch({ type: "changeSendRequest" });
  }

  useEffect(() => {
    if (state.sendRequest) {
      const source = Axios.CancelToken.source();
      async function SignUp() {
        try {
          const response = await Axios.post(
            "http://ilx-final-4a1e6f3ac2ff.herokuapp.com/auth/users/",
            {
              username: state.usernameValue,
              email: state.emailValue,
              password: state.passwordValue,
              re_password: state.password2Value,
            },
            {
              cancelToken: source.token,
            }
          );
          console.log(response);
          navigate("/");
        } catch (error) {
          console.log(error.response);
        }
      }
      SignUp();
      return () => {
        source.cancel();
      };
    }
  }, [state.sendRequest]);

  return (
    <Container>
      <Row>
        <Col xs={8} className="mt-5 offset-2 border border-1 text-center">
          <div>
            <Typography variant="h4">SIGN UP</Typography>
          </div>
          <form onSubmit={RegisterSubmit}>
            <div className="m-3">
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                className="w-100"
                value={state.usernameValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchUsernameChange",
                    usernameChoice: e.target.value,
                  })
                }
              />
            </div>
            <div className="m-3">
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                className="w-100"
                value={state.emailValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchEmailChange",
                    emailChoice: e.target.value,
                  })
                }
              />
            </div>
            <div className="m-3">
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                className="w-100"
                value={state.passwordValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchPasswordChange",
                    passwordChoice: e.target.value,
                  })
                }
              />
            </div>
            <div className="m-3">
              <TextField
                id="password-confirm"
                label="Password Confirm"
                variant="outlined"
                className="w-100"
                value={state.password2Value}
                onChange={(e) =>
                  dispatch({
                    type: "catchPassword2Change",
                    password2Choice: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-2">
              <Button
                variant="contained"
                type="submit"
                sx={{
                  color: "black",
                  backgroundColor: "orange",
                  borderColor: "green",

                  ":hover": {
                    bgcolor: "#AF5",
                    color: "white",
                  },
                }}
                className="mt-2 mb-2"
              >
                Sign Up
              </Button>
            </div>
            <div>
              <Typography variant="small">
                Already have an account? {""}
                <span>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </Link>
                </span>
              </Typography>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
