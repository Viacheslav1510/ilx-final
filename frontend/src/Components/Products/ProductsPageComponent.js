import React, { useState, useEffect } from "react";
import Axios from "axios";
import { theme } from "../../styles";

import {
  Grid,
  Typography,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import ProductsPageCard from "./ProductsPageCard";

function ProductsPageComponent({ product }) {
  const isScreenSizeMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const allProducts = product;
  // const [allProducts, setAllProducts] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);

  // useEffect(() => {
  //   const source = Axios.CancelToken.source();
  //   async function GetAllProducts() {
  //     try {
  //       const response = await Axios.get(
  //         "https://ilx-3022db9b1ed6.herokuapp.com/api/products/",
  //         { cancelToken: source.token }
  //       );
  //       setAllProducts(response.data);
  //       setDataIsLoading(false);
  //     } catch (error) {
  //       console.log(error.response);
  //     }
  //   }
  //   GetAllProducts();
  //   return () => {
  //     source.cancel();
  //   };
  // }, []);

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
    <>
      {isScreenSizeMatch ? (
        <Grid
          container
          sx={{ padding: "25px", backgroundColor: "#F4EEEE" }}
          display="flex"
          justifyContent="center"
        >
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h2">Products</Typography>
          </Grid>
          {allProducts.map((product) => (
            <Grid
              item
              xs={12}
              key={product.id}
              margin="10px 0"
              minHeight="300px"
            >
              <ProductsPageCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid
          container
          sx={{ padding: "45px", backgroundColor: "#F4EEEE" }}
          display="flex"
          justifyContent="center"
        >
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h2">Products</Typography>
          </Grid>
          {allProducts.map((product) => (
            <Grid
              item
              xs={10}
              key={product.id}
              margin="10px 0"
              minHeight="300px"
            >
              <ProductsPageCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default ProductsPageComponent;
