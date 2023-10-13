import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  CircularProgress,
  TextField,
  InputAdornment,
  Button,
  //   Paper,
  //   Divider,
  Container,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import map from "../Assets/images/map.png";
import searchBtn from "../Assets/images/search.png";
import Product from "../Products/ProductsPageComponent";

// const baseUrl = "http://127.0.0.1:8000/api";
const baseUrl = "http://127.0.0.1:8000/api";

const SearchItem = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  //get categories from endpoint
  //   useEffect(() => {
  //     const source = axios.CancelToken.source();
  //     async function GetAllcats() {
  //       try {
  //         await axios
  //           .get(baseUrl + "/categories/", { cancelToken: source.token })
  //           .then((response) => {
  //             console.log(response.data);
  //             setCats(response.data);
  //             setLoading(false);
  //           });
  //       } catch (error) {
  //         console.log("Response data:", error.response);
  //       }
  //     }
  //     GetAllcats();
  //     return () => {
  //       source.cancel();
  //     };
  //   }, []);

  //get all products from endpoint
  useEffect(() => {
    const source = axios.CancelToken.source();
    async function GetAllproducts() {
      try {
        await axios
          .get(`${baseUrl}/products/`, { cancelToken: source.token })
          .then((response) => {
            console.log(response.data);
            setProducts(response.data);
            setLoading(false);
          });
      } catch (error) {
        console.log("Response data:", error.response);
      }
    }
    GetAllproducts();
    return () => {
      source.cancel();
    };
  }, []);

  // const results = products.filter(
  //   (product) => product.seller_county === params.county.toUpperCase() &&
  //     (params.item.toLowerCase().includes(product.name) || params.item.toLowerCase().includes(product.description))
  // );

  function getResults() {
    let results = "";
    if (params.county !== "" && params.item !== "") {
      results = products.filter(
        (product) =>
          product.seller_county === params.county.toUpperCase() &&
          params.item.toLowerCase() === product.name.toLowerCase()
      );
      //return
    }
    if (params.item === "" || params.item === "item") {
      results = products.filter(
        (product) =>
          product.seller_county.toLowerCase() === params.county.toLowerCase()
      );
      console.log(results);
      //return results;
    }
    if (params.county === "" || params.county === "counties") {
      results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(params.item.toLowerCase()) ||
          params.item.toLowerCase() === product.name.toLowerCase()
      );
      console.log(results);
      //return results;
    }

    return results;
  }
  const rresults = getResults();
  //console.log(rresults);

  if (loading === true) {
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

  return (
    <>
      <div className="gridline">
        <Grid container direction={"row"} justifyContent={"center"} spacing={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="filled"
              placeholder="13576 applications"
              //value={params.item.toUpperCase()}
              sx={{ backgroundColor: "#fff" }}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="end">
              //       <Button variant="text">
              //         <img
              //           src={searchBtn}
              //           alt="search button"
              //           style={{
              //             width: 40,
              //             height: 40,
              //             backgroundColor: "transparent",
              //           }}
              //         />
              //       </Button>
              //     </InputAdornment>
              //   ),
              // }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="filled"
              placeholder="All of Ireland"
              name="county"
              sx={{ backgroundColor: "#fff" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={map}
                      alt="map icon"
                      style={{ width: 40, height: 40 }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button variant="text" disabled>
                      <img
                        src={searchBtn}
                        alt="search button"
                        style={{ width: 40, height: 40 }}
                      />
                    </Button>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
        </Grid>
      </div>
      <Grid container>
        <Grid item xs={12} align="center">
          {rresults.length === 0 ? (
            <Typography
              variant="h5"
              sx={{
                marginTop: "1.5rem",
                marginBottom: "1.5rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              No results
            </Typography>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
      <div
        style={{
          backgroundColor: "#c2c2c2",
          width: "100%",
          // height: "40vh",
          marginTop: "30px",
        }}
      >
        <Grid container>
          <Grid item align="center" xs={12}>
            <Typography
              variant="h3"
              sx={{
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "25px",
                marginBottom: "25px",
              }}
            >
              {params.county === "counties"
                ? params.item.toUpperCase()
                : params.county.toUpperCase()}{" "}
              - APPLICATIONS
            </Typography>
          </Grid>
          {rresults ? (
            <Container>
              <Grid
                container
                align="center"
                spacing={1}
                sx={{
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginBottom: "100px",
                  justifyContent: "center",
                }}
              >
                {rresults.map((product) => (
                  <Grid item xs={6} md={3} sm={4} key={product.id}>
                    <Product product={product} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          ) : (
            <Container>
              <Grid
                container
                align="center"
                spacing={1}
                sx={{
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginBottom: "100px",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h5">No Results</Typography>
              </Grid>
            </Container>
          )}
        </Grid>
      </div>
    </>
  );
};

export default SearchItem;
