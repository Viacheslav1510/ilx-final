import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import searchBtn from "../Assets/images/search.png";
import map from "../Assets/images/map.png";
import {
  CircularProgress,
  Grid,
  useMediaQuery,
  TextField,
  InputAdornment,
  Button,
  Paper,
  Divider,
  Container,
  Typography,
} from "@mui/material";
import { theme } from "../../styles";

import SearchItem from "./SearchItem";
import CategoryComponent from "./CategoryComponent";
import SubcategoryComponent from "./SubcategoryComponent";
import HomePageProducts from "./HomePageProducts";

function Home() {
  const navigate = useNavigate();

  const isScreenSizeMatchLg = useMediaQuery(theme.breakpoints.up("lg"));

  const [allCategories, setAllCategories] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(-1);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  // Search
  const [county, setCounty] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetAllCategories() {
      try {
        const response = await Axios.get(
          "https://ilx-final-4a1e6f3ac2ff.herokuapp.com/api/categories/",
          { cancelToken: source.token }
        );
        setAllCategories(response.data);
        setDataIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    }
    GetAllCategories();
    return () => {
      source.cancel();
    };
  }, []);

  // Search
  const counties = [
    { name: "CORK" },
    { name: "GALWAY" },
    { name: "DONEGAL" },
    { name: "MAYO" },
    { name: "KERRY" },
    { name: "TIPPERARY" },
    { name: "CLARE" },
    { name: "TYRONE" },
    { name: "ANTRIM" },
    { name: "LIMERICK" },
    { name: "ROSCOMMON" },
    { name: "DOWN" },
    { name: "WEXFORD" },
    { name: "MEATH" },
    { name: "LONDONDERRY" },
    { name: "KILKENNY" },
    { name: "WICKLOW" },
    { name: "OFFALY" },
    { name: "CAVAN" },
    { name: "WATERFORD" },
    { name: "WESTMEATH" },
    { name: "SLIGO" },
    { name: "LAOIS" },
    { name: "KILDARE" },
    { name: "FERMANAGH" },
    { name: "LEITRIM" },
    { name: "ARMAGH" },
    { name: "MONOGHAN" },
    { name: "LONGFORD" },
    { name: "DUBLIN" },
    { name: "CARLOW" },
    { name: "LOUTH" },
  ];

  const handleChange = (e) => {
    setCounty(e.target.firstChild);
  };
  const handleClick = (e) => {
    setIsOpen(!isOpen);
  };

  const handleSearch = () => {
    if (searchItem !== "") {
      navigate(`/search/${county.toLowerCase()}/${searchItem}`);
    } else {
      navigate(`/search/${county.toLowerCase()}/item`);
    }
    if (county === "") {
      navigate(`/search/counties/${searchItem}`);
    }
    if (searchItem === "" && county === "") {
      navigate("/");
    }
  };

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
      <Grid container className="offset-2">
        <Grid item xs={8} className="mt-3 mb-5">
          <div className="gridline">
            <Grid
              container
              direction={"row"}
              justifyContent={"center"}
              spacing={1}
            >
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="search"
                  placeholder="13576 applications"
                  sx={{
                    backgroundColor: "#fff",
                    fontSize: { xs: "50%", sm: "60%", md: "100%" },
                  }}
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  //onClick={showSearch}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="end">
                  //       <Button variant="text" disabled>
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
                  sx={{
                    backgroundColor: "#fff",
                    fontSize: { xs: "50%", sm: "60%", md: "100%" },
                  }}
                  name="county"
                  value={county}
                  onChange={handleChange}
                  onClick={handleClick}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          src={map}
                          alt="map icon"
                          style={{ width: 30, height: 30 }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button variant="text">
                          <img
                            src={searchBtn}
                            alt="search button"
                            style={{ width: 30, height: 30 }}
                            onClick={handleSearch}
                          />
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
            </Grid>
            {!isOpen ? (
              ""
            ) : (
              <Paper
                elevation={24}
                zindex={100}
                open={isOpen}
                sx={{
                  width: "80%",
                  height: "45vh",
                  position: "absolute",
                  top: "200px",
                  justifyContent: "center",
                  alignContent: "center",
                  backgroundColor: "#f2f4f5",
                  marginRight: "auto",
                  marginLeft: "auto",
                  border: "2px solid #fff",
                  padding: "10px",
                  display: "block",
                  fontSize: { xs: "50%", sm: "60%", md: "100%" },
                }}
              >
                <Grid container display={"flex"} direction={"row"} spacing={3}>
                  {counties.map((county, index) => (
                    <Grid item xs={2}>
                      <span key={index} style={{ cursor: "pointer" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            "&:hover": { backgroundColor: "#feb55f" },
                            fontSize: { xs: "50%", sm: "60%", md: "100%" },
                          }}
                          onClick={(e) => {
                            setIsOpen(!isOpen);
                            setCounty(e.target.firstChild.textContent);
                          }}
                        >
                          {county.name}
                        </Typography>
                      </span>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}
          </div>
        </Grid>
      </Grid>
      <Grid>
        {isScreenSizeMatchLg ? (
          <>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              {allCategories.slice(0, 9).map((category) => (
                <Grid
                  item
                  sm={1}
                  justify="flex-center"
                  sx={{ minWidth: "100px" }}
                >
                  <CategoryComponent
                    key={category.id}
                    category={category}
                    onSelectCategory={handleSelectCategory}
                    isCategorySelected={selectedCategory === category}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid
              item
              sm={6}
              sx={{
                height:
                  selectedCategory.id <= 13 && selectedCategory.id >= 0
                    ? "150px"
                    : "0",
                margin: "30px 10px",
                border:
                  selectedCategory.id <= 13 && selectedCategory.id >= 0
                    ? "solid #252B48 1px"
                    : "none",
                borderRadius: "10px",
              }}
            >
              {selectedCategory.id <= 13 && (
                <SubcategoryComponent selectedCategory={selectedCategory} />
              )}
            </Grid>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              {allCategories.slice(9).map((category) => (
                <Grid
                  item
                  sm={1}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ minWidth: "100px" }}
                >
                  <CategoryComponent
                    key={category.id}
                    category={category}
                    onSelectCategory={handleSelectCategory}
                    isCategorySelected={selectedCategory === category}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid
              item
              sm={6}
              sx={{
                height: selectedCategory.id > 13 ? "150px" : "0",
                margin: "30px 10px",
                border: selectedCategory.id > 13 ? "solid #252B48 1px" : "none",
                borderRadius: "10px",
              }}
            >
              {selectedCategory.id > 13 && (
                <SubcategoryComponent selectedCategory={selectedCategory} />
              )}
            </Grid>
          </>
        ) : (
          <>
            <Grid container alignItems="center" justifyContent="center">
              {allCategories.slice(0, 6).map((category) => (
                <Grid item sm={2}>
                  <CategoryComponent
                    key={category.id}
                    category={category}
                    onSelectCategory={handleSelectCategory}
                    isCategorySelected={selectedCategory === category}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid
              item
              sm={6}
              sx={{
                height:
                  selectedCategory.id <= 13 && selectedCategory.id >= 0
                    ? "12vh"
                    : "0",
                margin: "20px",
                border:
                  selectedCategory.id <= 13 && selectedCategory.id >= 0
                    ? "solid #252B48 1px"
                    : "none",
                borderRadius: "10px",
              }}
            >
              {selectedCategory.id <= 13 && (
                <SubcategoryComponent selectedCategory={selectedCategory} />
              )}
            </Grid>
            <Grid container alignItems="center" justifyContent="center">
              {allCategories.slice(6).map((category) => (
                <Grid item sm={2}>
                  <CategoryComponent
                    key={category.id}
                    category={category}
                    onSelectCategory={handleSelectCategory}
                    isCategorySelected={selectedCategory === category}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid
              item
              sm={6}
              sx={{
                height: selectedCategory.id > 13 ? "120px" : "0",
                margin: "30px 10px",
                border: selectedCategory.id > 13 ? "solid #252B48 1px" : "none",
                borderRadius: "10px",
              }}
            >
              {selectedCategory.id > 13 && (
                <SubcategoryComponent selectedCategory={selectedCategory} />
              )}
            </Grid>
          </>
        )}
        <HomePageProducts />
      </Grid>
    </>
  );
}

export default Home;
