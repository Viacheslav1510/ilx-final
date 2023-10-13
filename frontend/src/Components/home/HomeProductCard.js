import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Axios from "axios";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid } from "@mui/material";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        minWidth: "300px",
        maxWidth: "300px",
        minHeight: "380px",
        maxHeight: "380px",
        border: "solid #252B48 1px",
        display: "flex",
        flexDirection: "column",
        padding: "3px",
        "&:hover": {
          boxShadow: "0px 4px 8px #252B48",
          transform: "translateY(-5px)",
          transition: "transform 1s cubic-bezier(.46, 1.48, .18, .81)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="260"
        image={product.photo1}
        alt={product.name}
        sx={{
          cursor: "pointer",
          objectFit: "contain",
        }}
        onClick={() => navigate(`/products/${product.id}/`)}
      />
      <CardContent sx={{ padding: "0.5rem" }}>
        <Grid container alignContent="center">
          {/* <Grid item xs={12}>
            <Typography sx={{ fontSize: "0.9rem" }}>{product.name}</Typography>
          </Grid> */}
          <Grid item xs={12}>
            <Typography sx={{ fontSize: "0.9rem" }}>
              {product.description.length > 80
                ? `${product.description.slice(0, 80)}...`
                : `${product.description}`}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing sx={{ marginTop: "auto" }}>
        <Grid
          container
          display="flex"
          justifyContent="space-between"
          alignContent="center"
        >
          <Grid item>
            <Typography bold sx={{ fontSize: "0.9rem" }}>
              € {product.price}
            </Typography>
            <Typography
              sx={{ fontSize: "0.7rem" }}
            >{`${product.created_at.slice(0, 10)}, ${
              product.seller_city
            }`}</Typography>
          </Grid>
          <Grid item display="flex" alignItems="end">
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default HomeProductCard;
