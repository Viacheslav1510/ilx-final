import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useImmerReducer } from "use-immer";
import StateContext from "../Contexts/StateContext";
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import userImage from "../Assets/images/userimage.webp";
import ProfileUpdate from "./ProfileUpdate";

// const baseUrl = "https://8000-dee68-ilx-m1qv6b8vv9s.ws-eu104.gitpod.io/api";
const baseUrl = "https://ilx-final-4a1e6f3ac2ff.herokuapp.com/api";

const Profile = () => {
  const initialState = {
    userProfile: {
      phoneNumber: "",
      county: "",
      city: "",
      avatar: "",
      firstName: "",
      lastName: "",
      address: "",
      postcode: "",
      applications: [],
      userID: "",
    },
    loading: true,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchUserProfileInfo":
        draft.userProfile.phoneNumber = action.profileObj.phone_number;
        draft.userProfile.county = action.profileObj.county;
        draft.userProfile.city = action.profileObj.city;
        draft.userProfile.avatar = action.profileObj.avatar;
        draft.userProfile.firstName = action.profileObj.first_name;
        draft.userProfile.lastName = action.profileObj.last_name;
        draft.userProfile.address = action.profileObj.street_address1;
        draft.userProfile.postcode = action.profileObj.postcode;
        draft.userProfile.applications = action.profileObj.user_applications;
        draft.userID = action.profileObj.user;
        break;
      case "loadingDone":
        draft.loading = false;
        break;

      default:
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  const GlobalState = useContext(StateContext);
  const navigate = useNavigate();

  const textFieldType = { marginBottom: "10px" };

  //Get user profile
  useEffect(() => {
    async function GetUserProfile() {
      try {
        const response = await axios.get(
          `https://ilx-final-4a1e6f3ac2ff.herokuapp.com/api/profiles/${GlobalState.userId}/`
        );
        console.log(response.data);
        dispatch({ type: "catchUserProfileInfo", profileObj: response.data });
        dispatch({ type: "loadingDone" });
      } catch (error) {
        console.log(error.response);
      }
    }
    GetUserProfile();
  }, []);

  const applicationsDisplay = () => {
    if (state.userProfile.applications.length === 0) {
      return (
        <Button size="small" disabled>
          No APPLICATION
        </Button>
      );
    } else if (state.userProfile.applications.length === 1) {
      return (
        <Button
          size="small"
          onClick={() => navigate(`/users/${state.userID}/`)}
        >
          One APPLICATION LISTED
        </Button>
      );
    } else {
      return (
        <Button
          size="small"
          onClick={() => navigate(`/users/${state.userID}/`)}
        >
          {state.userProfile.applications.length} APPLICATIONS LISTED
        </Button>
      );
    }
  };

  const GreetUser = () => {
    if (
      state.userProfile.city === null ||
      state.userProfile.city === "" ||
      state.userProfile.county === null ||
      state.userProfile.phoneNumber === null ||
      state.userProfile.phoneNumber === ""
    ) {
      return (
        <Typography
          sx={{ xs: { variant: "caption" }, md: { variant: "h5" } }}
          //variant="h5"
          style={{
            marginTop: "2rem",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Welcome{" "}
          <span style={{ color: "#feb55f", fontWeight: 700 }}>
            {GlobalState.userUsername}
          </span>
          , please fill the form below to update your profile.
        </Typography>
      );
    } else {
      return (
        <Grid>
          <Paper
            elevation={20}
            sx={{
              margin: "15px auto",
              width: { xs: "100%", sm: "100%", md: "60%" },
              maxHeight: "40vh",
              padding: "30px",
              border: "2px solid #feb55f",
            }}
          >
            <Grid
              container
              justifyContent={"space-between"}
              spacing={2}
              sx={{
                width: "100%",
                //marginTop: "1rem",
                marginBottom: "2rem",
                marginLeft: "auto",
                marginRight: "auto",
                //border: "2px solid #feb55f",
              }}
            >
              <Grid item xs={6}>
                {/* <Paper
                  sx={{
                    width: "80%",
                    height: "80%",
                    backgroundColor: "transparent",
                  }}
                > */}
                <img
                  src={
                    state.userProfile.avatar
                      ? state.userProfile.avatar
                      : "https://res.cloudinary.com/dyrp3aqdq/image/upload/v1688120429/userimage_mpve89.png"
                  }
                  width={"200rem"}
                  height={"200rem"}
                  //style={{ borderRadius: "70%" }}
                  alt={state.userProfile.user}
                />
                {/* </Paper> */}
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h5"
                  style={{
                    marginTop: "2rem",
                    textAlign: "center",
                    marginBottom: "2rem",
                  }}
                >
                  Welcome{" "}
                  <span style={{ color: "#feb55f", fontWeight: 700 }}>
                    {GlobalState.userUsername}
                  </span>
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    marginTop: "2rem",
                    textAlign: "center",
                    marginBottom: "2rem",
                  }}
                >
                  You have {applicationsDisplay()} listed.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      );
    }
  };

  if (state.loading === true) {
    return (
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={"50px"}
      >
        <CircularProgress sx={{ color: "#feb55f" }} />
      </Grid>
    );
  }
  //console.log('userID', state.userID, typeof state.userID);
  return (
    <>
      <div>{GreetUser()}</div>
      <ProfileUpdate userProfile={state.userProfile} />
    </>
  );
};

export default Profile;
