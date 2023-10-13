import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Grid,
  Paper,
  TextField,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import axios from "axios";
import DispatchContext from "../Contexts/DispatchContext";
import StateContext from "../Contexts/StateContext";
import NoImage from "../Assets/images/no-image.jpg";
// import { Label } from "@material-ui/icons";

const baseUrl = "https://ilx-final-4a1e6f3ac2ff.herokuapp.com/api";
//const baseUrl = "https://ilx-3022db9b1ed6.herokuapp.com/api";

const AddProduct = () => {
  const paperType = {
    margin: "20px auto",
    padding: "30px 20px",
    border: "2px solid #252B48",
  };
  const textFieldType = { marginBottom: "10px" };
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const GlobalState = useContext(StateContext);
  const initialState = {
    nameValue: "",
    priceValue: 1,
    categoryValue: "",
    statusValue: "True",
    descriptionValue: "",
    quantityValue: 1,
    photo1Value: "",
    photo2Value: "",
    photo3Value: "",
    photo4Value: "",
    photo5Value: "",
    sendRequest: 0,
    openSnack: false,
    uploadedImages: [],
    userProfile: {
      phoneNumber: "",
      county: "",
      city: "",
    },
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchNameChange":
        draft.nameValue = action.nameChosen;
        break;
      case "catchPriceChange":
        draft.priceValue = action.priceChosen;
        break;
      case "catchQuantityChange":
        draft.quantityValue = action.quantityChosen;
        break;
      case "catchStatusChange":
        draft.statusValue = action.statusChosen;
        break;
      case "catchCategoryChange":
        draft.categoryValue = action.categoryChosen;
        break;
      case "catchDescriptionChange":
        draft.descriptionValue = action.descriptionChosen;
        break;
      case "catchPhoto1Image":
        draft.photo1Value = action.photo1Chosen;
        break;
      case "catchPhoto2Image":
        draft.photo2Value = action.photo2Chosen;
        break;
      case "catchPhoto3Image":
        draft.photo3Value = action.photo3Chosen;
        break;
      case "catchPhoto4Image":
        draft.photo4Value = action.photo4Chosen;
        break;
      case "catchPhoto5Image":
        draft.photo5Value = action.photo5Chosen;
        break;
      case "catchUploadedImages":
        draft.uploadedImages = action.imagesChosen;
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;
      case "openTheSnack":
        draft.openSnack = true;
        break;
      case "catchUserProfileInfo":
        draft.userProfile.phoneNumber = action.profileObject.phone_number;
        draft.userProfile.city = action.profileObject.city;
        draft.userProfile.county = action.profileObject.county;
        break;
      default:
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  useEffect(() => {
    const source = axios.CancelToken.source();
    async function GetAllcats() {
      try {
        await axios
          .get(baseUrl + "/categories/", { cancelToken: source.token })
          .then((response) => {
            console.log(response.data);
            setCats(response.data);
            setLoading(false);
          });
      } catch (error) {
        console.log("Response data:", error.response);
      }
    }
    GetAllcats();
    return () => {
      source.cancel();
    };
  }, []);

  //gets main categories
  const categories = cats.reduce((arr, category) => {
    let cat = { ...category };
    delete cat.children;
    arr.push(cat);
    return arr;
  }, []);
  //console.log("categories: ", categories);
  //gets subcategories
  const subcategories = cats.reduce((arr, category) => {
    let sub = category.children;
    arr = [...arr, ...sub];
    return arr;
  }, []);
  //console.log("subcategories", subcategories);
  const allCats = categories.concat(subcategories);
  console.log("allCats", allCats);

  //get logged in user profile info
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await axios.get(
          `https://ilx-final-4a1e6f3ac2ff.herokuapp.com/api/profiles/${GlobalState.userId}/`
        );
        console.log(response.data);
        console.log(typeof parseInt(GlobalState.userId), GlobalState.userId);
        console.log(
          typeof localStorage.getItem("theUserId"),
          localStorage.getItem("theUserId")
        );
        dispatch({
          type: "catchUserProfileInfo",
          profileObject: response.data,
        });
      } catch (error) {
        console.log(error.response);
      }
    }
    GetProfileInfo();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    dispatch({ type: "changeSendRequest" });
    // dispatch({ type: "disableTheBtn" });
  };

  // catching all photos changes
  useEffect(() => {
    if (state.uploadedImages[0]) {
      dispatch({
        type: "catchPhoto1Image",
        photo1Chosen: state.uploadedImages[0],
      });
    }
  }, [state.uploadedImages[0]]);

  useEffect(() => {
    if (state.uploadedImages[1]) {
      dispatch({
        type: "catchPhoto2Image",
        photo2Chosen: state.uploadedImages[1],
      });
    }
  }, [state.uploadedImages[1]]);

  useEffect(() => {
    if (state.uploadedImages[2]) {
      dispatch({
        type: "catchPhoto3Image",
        photo3Chosen: state.uploadedImages[2],
      });
    }
  }, [state.uploadedImages[2]]);

  useEffect(() => {
    if (state.uploadedImages[3]) {
      dispatch({
        type: "catchPhoto4Image",
        photo4Chosen: state.uploadedImages[3],
      });
    }
  }, [state.uploadedImages[3]]);

  useEffect(() => {
    if (state.uploadedImages[4]) {
      dispatch({
        type: "catchPhoto5Image",
        photo5Chosen: state.uploadedImages[4],
      });
    }
  }, [state.uploadedImages[4]]);

  //add product
  useEffect(() => {
    if (state.sendRequest) {
      async function AddProduct() {
        const formData = new FormData();
        formData.append("name", state.nameValue);
        formData.append("description", state.descriptionValue);
        formData.append("category", state.categoryValue);
        formData.append("price", state.priceValue);
        formData.append("status", state.statusValue);
        formData.append("quantity", state.quantityValue);
        formData.append("photo1", state.photo1Value);
        formData.append("photo2", state.photo2Value);
        formData.append("photo3", state.photo3Value);
        formData.append("photo4", state.photo4Value);
        formData.append("photo5", state.photo5Value);
        formData.append("seller", GlobalState.userId);
        try {
          const response = await axios.post(
            baseUrl + "/products/create/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data;  charset=UTF-8",
                Accept: "application/json",
              },
            }
          );
          console.log(response.data);
          dispatch({ type: "openTheSnack" });
        } catch (error) {
          console.log(error.response);
        }
      }
      AddProduct();
    }
  }, [state.sendRequest]);

  //success message before redirect
  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate("/");
      }, 2500);
    }
  }, [state.openSnack]);

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

  const showSubmitBtn = () => {
    if (
      GlobalState.userIsLoggedIn &&
      state.userProfile.city !== null &&
      state.userProfile.county !== null &&
      state.userProfile.phoneNumber !== "" &&
      state.userProfile.phoneNumber !== null
    ) {
      return (
        <Button
          variant="contained"
          fullWidth
          style={textFieldType}
          type="submit"
          sx={{
            backgroundColor: "#feb55f",
            color: "white",
            "&:hover": { backgroundColor: "black", color: "#feb55f" },
            marginTop: "20px",
            marginBottom: "20px",
          }}
          //disabled={state.disabledBtn}
        >
          AddProduct
        </Button>
      );
    } else if (
      GlobalState.userIsLoggedIn &&
      (state.userProfile.city === null ||
        state.userProfile.city === "" ||
        state.userProfile.county === null ||
        state.userProfile.county === "" ||
        state.userProfile.phoneNumber === null ||
        state.userProfile.phoneNumber === "")
    ) {
      return (
        <Button
          variant="outlined"
          fullWidth
          style={textFieldType}
          onClick={() => navigate("/profile")}
          sx={{
            backgroundColor: "#feb55f",
            color: "white",
            "&:hover": { backgroundColor: "black", color: "#feb55f" },
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Complete you profile to add application
        </Button>
      );
    } else if (!GlobalState.userIsLoggedIn) {
      return (
        <Button
          variant="outlined"
          fullWidth
          style={textFieldType}
          onClick={() => navigate("/login")}
          sx={{
            backgroundColor: "#252B48",
            color: "white",
            "&:hover": { backgroundColor: "black", color: "#feb55f" },
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          SignIn to add application
        </Button>
      );
    }
  };

  return (
    <div>
      <Grid container>
        <Paper
          style={paperType}
          elevation={20}
          sx={{ width: { xs: "100%", sm: "80%", md: "60%" } }}
        >
          <Grid align="center" sx={{ marginBottom: "10px" }} item xs={12}>
            <Typography variant="h4">Add Product</Typography>
            <Typography variant="caption">
              Please enter correct values to add a product
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid
            item
            xs={8}
            align="center"
            sx={{ marginRight: "auto", marginLeft: "auto" }}
          >
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <TextField
                fullWidth
                label="Name"
                name="name"
                type="text"
                variant="standard"
                value={state.nameValue}
                placeholder="Enter a valid name for product"
                style={textFieldType}
                required
                onChange={(e) =>
                  dispatch({
                    type: "catchNameChange",
                    nameChosen: e.target.value.trim(),
                  })
                }
              />
              <Grid container justifyContent={"center"}>
                <Grid
                  item
                  xs={12}
                  sx={{ marginTop: "20px", marginBottom: "20px" }}
                >
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={6}
                    type="text"
                    variant="outlined"
                    value={state.descriptionValue}
                    placeholder="Enter a brief description of product"
                    style={textFieldType}
                    required
                    onChange={(e) =>
                      dispatch({
                        type: "catchDescriptionChange",
                        descriptionChosen: e.target.value.trim(),
                      })
                    }
                  />
                </Grid>
              </Grid>

              <Grid container justifyContent={"space-between"}>
                <Grid item xs={5}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.statusValue}
                        onChange={(e) =>
                          dispatch({
                            type: "catchStatusChange",
                            statusChosen: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Status"
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label="Category"
                    name="category"
                    variant="standard"
                    //value={state.categoryValue}
                    placeholder="Enter category of product"
                    style={textFieldType}
                    select
                    defaultValue={""}
                    required
                    helperText="Please select your category"
                    onChange={(e) =>
                      dispatch({
                        type: "catchCategoryChange",
                        categoryChosen: e.target.value,
                      })
                    }
                  >
                    {allCats.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.title}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Grid container justifyContent={"center"}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                  <ul>
                    {state.photo1Value ? <li>{state.photo1Value.name}</li> : ""}
                    {state.photo2Value ? <li>{state.photo2Value.name}</li> : ""}
                    {state.photo3Value ? <li>{state.photo3Value.name}</li> : ""}
                    {state.photo4Value ? <li>{state.photo4Value.name}</li> : ""}
                    {state.photo5Value ? <li>{state.photo5Value.name}</li> : ""}
                  </ul>
                </Grid>
                <Grid item xs={4}></Grid>
              </Grid>
              <Grid container justifyContent={"center"}>
                <Grid
                  item
                  xs={12}
                  sx={{ marginTop: "20px", marginBottom: "20px" }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    component="label"
                    sx={{
                      backgroundColor: "#feb55f",
                      "&:hover": {
                        backgroundColor: "#000",
                        color: "feb55f",
                      },
                    }}
                    disabled={!GlobalState.userIsLoggedIn}
                    style={textFieldType}
                  >
                    Upload Images (Max 5)
                    <input
                      type="file"
                      name="photos"
                      id="photos"
                      accept="image/png, image/gif, image/jpeg, image/jpg"
                      hidden
                      onChange={(e) =>
                        dispatch({
                          type: "catchUploadedImages",
                          imagesChosen: e.target.files,
                        })
                      }
                      multiple
                    />
                  </Button>
                </Grid>
              </Grid>
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label="Price, €"
                    name="price"
                    type="number"
                    variant="standard"
                    value={state.priceValue}
                    placeholder="Enter price for product"
                    style={textFieldType}
                    sx={{ marginTop: "20px", marginBottom: "20px" }}
                    required
                    onChange={(e) =>
                      dispatch({
                        type: "catchPriceChange",
                        priceChosen: e.target.value.trim(),
                      })
                    }
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    type="number"
                    variant="standard"
                    value={state.quantityValue}
                    placeholder="Enter quantity of product"
                    style={textFieldType}
                    sx={{ marginTop: "20px", marginBottom: "20px" }}
                    required
                    onChange={(e) =>
                      dispatch({
                        type: "catchQuantityChange",
                        quantityChosen: e.target.value.trim(),
                      })
                    }
                  />
                </Grid>
              </Grid>
              {showSubmitBtn()}
            </form>
          </Grid>
          <Grid item xs={2}></Grid>
        </Paper>
      </Grid>
      <Snackbar
        open={state.openSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">
          You have successfully add an application!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddProduct;
