import React from "react";
import { Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import { theme } from "../../styles";

function SubcategoryComponent({ selectedCategory }) {
  const isScreenSizeMatch = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid container alignItems="center" justifyContent="center">
      {isScreenSizeMatch ? (
        <>
          <Grid item xs={12} textAlign="center">
            <Typography justifyContent="center">
              {selectedCategory.title}
            </Typography>
            <Divider
              sx={{ border: "solid grey 1px", borderRadius: "10px" }}
              variant="middle"
            />
          </Grid>
          {selectedCategory.children.map((child) => (
            <Grid item xs={3}>
              <Typography
                key={child.id}
                minHeight={100}
                sx={{ fontSize: "12px" }}
                className="text-center"
              >
                {child.title}
              </Typography>
            </Grid>
          ))}
        </>
      ) : (
        <>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4" justifyContent="center">
              {selectedCategory.title}
            </Typography>
            <Divider
              sx={{ border: "solid grey 1px", borderRadius: "10px" }}
              variant="middle"
            />
          </Grid>
          {selectedCategory.children.map((child) => (
            <Grid item xs={4}>
              <Typography
                key={child.id}
                sx={{ width: "100%", height: "3.5vh", alignContent: "center" }}
                className="d-flex align-items-center justify-content-center"
              >
                {child.title}
              </Typography>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}

export default SubcategoryComponent;
