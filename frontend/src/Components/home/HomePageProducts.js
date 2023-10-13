import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Grid, CircularProgress, Typography } from "@mui/material";
import HomeProductCard from "../home/HomeProductCard";

function HomePageProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetAllProducts() {
      try {
        const response = await Axios.get(
          "http://127.0.0.1:8000/api/products/",
          { cancelToken: source.token }
        );
        setAllProducts(response.data);
        setDataIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    }
    GetAllProducts();
    return () => {
      source.cancel();
    };
  }, []);

  if (dataIsLoading === true) {
    return (
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ padding: "50px", backgroundColor: "#F4EEEE" }}
    >
      <Grid item xs={12} textAlign="center">
        <Typography variant="h2">VIP</Typography>
      </Grid>
      {allProducts.map((product) => (
        <Grid
          item
          xs
          display="flex"
          justifyContent="center"
          key={product.id}
          margin="15px 2px"
        >
          <HomeProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default HomePageProducts;
