import React, { useState } from "react";
import { Drawer, Button, IconButton, Grid, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

function DrawerComponent() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "70%",
            backgroundColor: "#252B48",
          },
        }}
      >
        <Grid container justifyContent="flex-end">
          <Grid xs={12}>
            <IconButton
              sx={{ color: "#F1C376" }}
              onClick={() => setOpen(!open)}
            >
              <CloseFullscreenIcon />
            </IconButton>
          </Grid>

          <Grid item xs={8} justifyContent="flex-end">
            <Typography className="d-flex justify-content-end m-3">
              <Button variant="contained" sx={{ backgroundColor: "#F1C376" }}>
                Add Product
              </Button>
            </Typography>
            <Typography className="d-flex justify-content-end m-3">
              <IconButton sx={{ backgroundColor: "#F1C376" }}>
                <FavoriteBorderIcon />
              </IconButton>
            </Typography>
            <Typography className="d-flex justify-content-end m-3">
              <IconButton
                aria-label="profile"
                sx={{ backgroundColor: "#F1C376" }}
              >
                <AccountCircleIcon />
              </IconButton>
            </Typography>
          </Grid>
        </Grid>
      </Drawer>
      <IconButton onClick={() => setOpen(!open)} sx={{ color: "#F1C376" }}>
        <MenuRoundedIcon />
      </IconButton>
    </>
  );
}

export default DrawerComponent;
