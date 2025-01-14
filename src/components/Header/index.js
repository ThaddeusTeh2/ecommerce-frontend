import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { isUserLoggedIn } from "../../utils/api_auth";
import { useCookies } from "react-cookie";
import { clearCart } from "../../utils/api";

export default function Header() {
  const location = useLocation();
  const [cookies, removeCookie] = useCookies(["currentUser"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear the cookies
    removeCookie("currentUser");
    //clear cart
    clearCart();
    // redirect the user back to login page
    navigate("/login");
  };

  // Determine if the current route matches the target path
  const isActive = (path) => location.pathname === path;

  const currentUser = cookies.currentUser;
  const userName = currentUser?.name;

  return (
    <>
      <Box
        sx={{
          padding: "40px 0 30px 0",
          marginBottom: "30px",
        }}
      >
        <Typography
          variant="h1"
          align="center"
          sx={{
            fontSize: "36px",
            fontWeight: "bold",
          }}
        >
          {isUserLoggedIn(cookies) ? `Welcome To My Store` : "Welcome, Guest"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            borderBottom: "1px solid #000",
          }}
        >
          <Box>
            <Button
              component={Link}
              to="/"
              variant={isActive("/") ? "contained" : "outlined"}
              color="primary"
              sx={{ margin: "0 8px" }}
            >
              home
            </Button>
            <Button
              component={Link}
              to="/cart"
              variant={isActive("/cart") ? "contained" : "outlined"}
              color="primary"
              sx={{ margin: "0 8px" }}
            >
              Cart
            </Button>

            <Button
              variant={
                location.pathname === "/orders" ? "contained" : "outlined"
              }
              color="primary"
              LinkComponent={Link}
              to="/orders"
              sx={{ margin: "0 8px" }}
            >
              My Orders
            </Button>
            <Button
              variant={
                location.pathname === "/categories" ? "contained" : "outlined"
              }
              color="primary"
              LinkComponent={Link}
              to="/categories"
              sx={{ margin: "0 8px" }}
            >
              Categories
            </Button>
          </Box>
          <Box align="right">
            {isUserLoggedIn(cookies) ? (
              <Box display={"flex"}>
                <Typography>Current User: {userName}</Typography>
                <Button
                  variant={"outlined"}
                  color="error"
                  sx={{
                    margin: "0 8px",
                  }}
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <>
                <Button
                  variant={
                    location.pathname === "/login" ? "contained" : "outlined"
                  }
                  color="primary"
                  LinkComponent={Link}
                  to="/login"
                  sx={{
                    margin: "0 8px",
                  }}
                >
                  Login
                </Button>
                <Button
                  variant={
                    location.pathname === "/signup" ? "contained" : "outlined"
                  }
                  color="primary"
                  LinkComponent={Link}
                  to="/signup"
                  sx={{
                    margin: "0 8px",
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
