import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Copyright from "./components/Copyright";
import AppBarComponent from "./components/AppBar";
import DrawerComponent from "./components/Drawer";
import DashboardComponent from "./components/Dashboard";

import { getCookie } from "./utils/cookie";
import ProductList from "./features/products/ProductList";
import SignIn from "./features/Auth/Signln";
import SignUp from "./features/Auth/SignUp";
import AddProduct from "../src/features/products/AddProduct";
import EditProduct from "../src/features/products/EditProduct";
import ShowProduct from "../src/features/products/ShowProduct";

import { useDispatch, useSelector } from "react-redux";
import { signOut, reSignIn } from "./features/Auth/authSlice";

import { AUTH_SIGN_IN_STATUS } from "./Constants";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";

const mdTheme = createTheme();

export default function App() {
  const [open, setOpen] = useState(true);

  const authState = useSelector((state) => state.auth);
  const { isSignIn } = authState;

  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(reSignIn());
  }, [dispatch]);

  return (
    <Router>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {isSignIn && (
            <AppBarComponent
              open={open}
              toggleDrawer={toggleDrawer}
              dispatch={dispatch}
              signOut={signOut}
            />
          )}
          {isSignIn && (
            <DrawerComponent open={open} toggleDrawer={toggleDrawer} />
          )}
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <DashboardComponent />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/"
                  element={
                    <RequireAuth>
                      <ProductList />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/addProduct"
                  element={
                    <RequireAuth>
                      <AddProduct />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/editProduct"
                  element={
                    <RequireAuth>
                      <EditProduct />
                    </RequireAuth>
                  }
                >
                  <Route
                    path=":id"
                    element={
                      <RequireAuth>
                        <EditProduct />
                      </RequireAuth>
                    }
                  ></Route>
                </Route>
                <Route
                  path="/showProduct"
                  element={
                    <RequireAuth>
                      <ShowProduct />
                    </RequireAuth>
                  }
                >
                  <Route
                    path=":id"
                    element={
                      <RequireAuth>
                        <ShowProduct />
                      </RequireAuth>
                    }
                  ></Route>
                </Route>
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="*" element={<SignIn />} />
              </Routes>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

function RequireAuth({ children }) {
  let location = useLocation();
  const signInStatus = getCookie(AUTH_SIGN_IN_STATUS);
  if (!signInStatus) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  } else if (signInStatus === "nok") {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }
  return children;
}
