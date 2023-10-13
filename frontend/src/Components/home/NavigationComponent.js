import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Grid,
  Toolbar,
  Button,
  IconButton,
  useMediaQuery,
  Link,
  Grow,
  Paper,
  Popper,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
// import { Link } from "react-router-dom";
import { theme } from "../../styles";

// Contexts
import StateContext from "../Contexts/StateContext";
import DispatchContext from "../Contexts/DispatchContext";

//Components

import DrawerComponent from "./DrawerComponent";

function NavigationBar() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  const GlobalDispatch = useContext(DispatchContext);

  async function handleLogout(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);

    try {
      const response = await axios.post(
        "https://ilx-final-4a1e6f3ac2ff.herokuapp.com/auth/token/logout/",
        GlobalState.userToken,
        { headers: { Authorization: "Token ".concat(GlobalState.userToken) } }
      );
      console.log(response);
      GlobalDispatch({ type: "userLogOut" });
      navigate("/");
    } catch (e) {
      console.log(e.response);
    }
  }

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }
  console.log(GlobalState);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const isScreenSizeMatch = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <AppBar sx={{ backgroundColor: "#252B48" }} position="sticky">
      <Toolbar>
        <Grid sx={{ placeItems: "center" }} container>
          <Grid item xs={1}>
            <Link
              variant="h6"
              letterSpacing={3}
              sx={{ color: "#F1C376", textDecoration: "none" }}
              href="/"
            >
              ILX
            </Link>
          </Grid>
          <Grid item xs={4} className="d-flex justify-content-end"></Grid>

          {isScreenSizeMatch ? (
            <Grid item xs={6} className="d-flex justify-content-end">
              <DrawerComponent />
            </Grid>
          ) : (
            <>
              <Grid
                item
                xs={4}
                display="flex"
                justifyContent="end"
                alignContent="center"
              >
                <Grid display="flex" justifyContent="end" alignContent="center">
                  <IconButton
                    className="ms-2 me-2"
                    sx={{ color: "#F1C376" }}
                    onClick={() =>
                      navigate(`/user/${GlobalState.userId}/wishlist/`)
                    }
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                </Grid>

                {GlobalState.userIsLoggedIn ? (
                  <Grid item>
                    <IconButton
                      sx={{ color: "#F1C376" }}
                      ref={anchorRef}
                      id="composition-button"
                      aria-controls={open ? "composition-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}
                    >
                      <AccountCircleIcon sx={{ marginRight: "5px" }} />
                      <Typography variant="h6">
                        Hi, {GlobalState.userUsername}
                      </Typography>
                    </IconButton>
                    <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      placement="bottom-start"
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === "bottom-start"
                                ? "left top"
                                : "left bottom",
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList
                                autoFocusItem={open}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
                              >
                                <MenuItem onClick={() => navigate("/profile")}>
                                  Profile
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                  My account
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                  Logout
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </Grid>
                ) : (
                  <Grid container display="flex">
                    <Grid>
                      <IconButton
                        onClick={() => navigate("/login")}
                        sx={{ color: "#F1C376" }}
                      >
                        <LoginIcon sx={{ marginRight: "5px" }} />{" "}
                        <Typography>Login/Register</Typography>
                      </IconButton>
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={3} className="d-flex justify-content-center">
                <Button
                  sx={{ backgroundColor: "#F1C376", color: "black" }}
                  variant="contained"
                  onClick={() => navigate("/add-product")}
                >
                  Add Product
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
