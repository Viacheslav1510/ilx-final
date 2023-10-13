import React from "react";
import { Grid, Typography } from "@mui/material";

function Footer() {
  return (
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      display="flex"
      sx={{ backgroundColor: "#FFC26F", minHeight: "100px", marginTop: "auto" }}
    >
      <Grid
        item
        xs={4}
        className="d-flex align-items-center justify-content-center"
      >
        <Typography sx={{ textTransform: "uppercase" }}>Sitemap</Typography>
      </Grid>
      <Grid
        item
        xs={4}
        className="d-flex align-items-center justify-content-center"
      >
        <Typography sx={{ textTransform: "uppercase" }}>Contacts</Typography>
      </Grid>
      <Grid
        item
        xs={4}
        className="d-flex align-items-center justify-content-center"
      >
        <Typography sx={{ textTransform: "uppercase" }}>
          {" "}
          Privacy policy{" "}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Footer;
