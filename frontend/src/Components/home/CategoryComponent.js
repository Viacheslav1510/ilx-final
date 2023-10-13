import React from "react";
import Image from "mui-image";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { theme } from "../../styles";

const CategoryComponent = ({
  category,
  isCategorySelected,
  onSelectCategory,
}) => {
  const isScreenSizeMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const selectedCategoryStyle = {
    backgroundColor: isCategorySelected ? "#252B48" : "",
    color: isCategorySelected ? "white" : "black",
  };
  return (
    <>
      {isScreenSizeMatch ? (
        <Grid
          container
          display="table"
          justifyContent="center"
          onClick={() => onSelectCategory(category)}
        >
          <Image
            src={category.image}
            sx={{
              borderRadius: 40,
              backgroundColor: "#F1C376",
            }}
            width={45}
          />
          <Typography
            sx={{
              fontSize: "10px",
              width: "62px",
              height: "40px",
              borderRadius: "5px",
              marginTop: "5px",
            }}
            style={selectedCategoryStyle}
            className="text-center"
          >
            {category.title}
          </Typography>
        </Grid>
      ) : (
        <Grid
          container
          onClick={() => onSelectCategory(category)}
          justifyContent="center"
          sx={{
            cursor: "pointer",
          }}
        >
          <Image
            src={category.image}
            sx={{
              backgroundColor: "#F1C376",
              borderRadius: 100,
            }}
            width={100}
          />
          <Typography
            sx={{
              fontSize: "18px",
              width: "113px",
              height: "55px",
              borderRadius: "5px",
              marginTop: "10px",
              paddingBottom: "10px",
            }}
            style={selectedCategoryStyle}
            className="text-center"
          >
            {category.title}
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default CategoryComponent;
