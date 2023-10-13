import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import NavigationComponent from "./Components/home/NavigationComponent";
import Footer from "./Components/home/Footer";
import Home from "./Components/home/Home";
import Register from "./Components/Accounts/Register";
import Login from "./Components/Accounts/Login";
import Profile from "./Components/Accounts/Profile";
import AddProduct from "./Components/Products/AddProduct";
import ProductsPageComponent from "./Components/Products/ProductsPageComponent";
import ProductDetail from "./Components/Products/ProductDetail";
import UserDetail from "./Components/Accounts/UserDetail";
import WishList from "./Components/Products/WishList";
import Listing from "./Components/Products/Listing";
import SearchItem from "./Components/home/SearchItem";
// Context
import DispatchContext from "./Components/Contexts/DispatchContext";
import StateContext from "./Components/Contexts/StateContext";

function App() {
  const initialState = {
    userUsername: localStorage.getItem("theUserName"),
    userEmail: localStorage.getItem("theUserEmail"),
    userId: localStorage.getItem("theUserId"),
    userToken: localStorage.getItem("theUserToken"),
    userIsLoggedIn: localStorage.getItem("theUserName") ? true : false,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchToken":
        draft.userToken = action.tokenValue;
        break;
      case "userSignedIn":
        draft.userUsername = action.userNameInfo;
        draft.userEmail = action.userEmailInfo;
        draft.userId = action.userIdInfo;
        draft.userIsLoggedIn = true;
        break;
      case "userLogOut":
        draft.userIsLoggedIn = false;
        break;

      default:
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  useEffect(() => {
    if (state.userIsLoggedIn) {
      localStorage.setItem("theUserName", state.userUsername);
      localStorage.setItem("theUserEmail", state.userEmail);
      localStorage.setItem("theUserId", state.userId);
      localStorage.setItem("theUserToken", state.userToken);
    } else {
      localStorage.removeItem("theUserName");
      localStorage.removeItem("theUserEmail");
      localStorage.removeItem("theUserId");
      localStorage.removeItem("theUserToken");
    }
  }, [state.userIsLoggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Router>
          <NavigationComponent />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/add-product" element={<AddProduct />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
            <Route exact path="/users/:id" Component={UserDetail} />
            <Route
              exact
              path="/products"
              element={<ProductsPageComponent />}
            ></Route>
            <Route
              exact
              path="/products/:id"
              element={<ProductDetail />}
            ></Route>
            <Route exact path="/listing/:id" Component={Listing} />
            <Route exact path="/user/:id/wishlist/" Component={WishList} />
            <Route
              exact
              path={"/search/:county/:item"}
              Component={SearchItem}
            />
          </Routes>
          <Footer />
        </Router>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
