import React from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../../styles";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid, useMediaQuery } from "@mui/material";

const ProductsPageCard = ({ product }) => {
  const navigate = useNavigate();
  const isScreenSizeMatch = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {isScreenSizeMatch ? (
        <Grid container xs={10} className="offset-1">
          <Card
            sx={{
              width: "100%",
              border: "solid #252B48 1px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia
              component="img"
              height="270"
              width="100%"
              image={product.photo1}
              alt={product.name}
              sx={{
                cursor: "pointer",
                objectFit: "contain",
                maxWidth: "100%",
                paddingTop: "5px",
              }}
              onClick={() => navigate(`/products/${product.id}/`)}
            />
            <CardContent>
              <Grid container alignContent="center">
                <Grid item xs={12}>
                  <Typography variant="h5">{product.name}</Typography>
                </Grid>
                <Grid item xs={12} marginTop="5px">
                  <Typography variant="h6">
                    {`${product.description.slice(0, 50)}...`}
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
                  <Typography variant="h6" bold>
                    € {product.price}
                  </Typography>
                  <Typography marginTop="5px">{`${product.created_at.slice(
                    0,
                    10
                  )}, ${product.seller_city}`}</Typography>
                </Grid>
                <Grid item display="flex" alignItems="end">
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      ) : (
        <Grid
          container
          sx={{ padding: "5px", backgroundColor: "white" }}
          xs={10}
          className="offset-1"
        >
          <Grid item xs={2}>
            {" "}
            <CardMedia
              component="img"
              height="230"
              width="100%"
              image={product.photo1}
              alt={product.name}
              sx={{
                cursor: "pointer",
                objectFit: "contain",
                maxWidth: "100%",
                padding: "0",
              }}
              onClick={() => navigate(`/products/${product.id}/`)}
            />
          </Grid>
          <Grid
            item
            xs={9}
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "15px",
            }}
          >
            <Grid item display="flex" justifyContent="space-between">
              <Typography variant="h5" marginTop="5px">
                {product.name}
              </Typography>
              <Typography variant="h5" padding="10px">
                € {product.price}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="h6" marginTop="15px" overflow="hidden">
                {`${product.description.slice(0, 200)}`}
              </Typography>
            </Grid>

            <Grid
              item
              marginTop="auto"
              display="flex"
              justifyContent="space-between"
            >
              <Typography
                variant="h5"
                color="grey"
                marginTop="5px"
              >{`${product.created_at.slice(0, 10)}, ${
                product.seller_city
              }`}</Typography>

              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ProductsPageCard;
