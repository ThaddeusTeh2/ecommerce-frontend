import React from "react";
import { useLocation, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Header() {
  const location = useLocation();

  // Determine if the current route matches the target path
  const isActive = (path) => location.pathname === path;

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
          Welcome To My Store
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            borderBottom: "1px solid #000",
          }}
        >
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
            variant={location.pathname === "/orders" ? "contained" : "outlined"}
            color="primary"
            LinkComponent={Link}
            to="/orders"
            sx={{ margin: "0 8px" }}
          >
            My Orders
          </Button>

          <Button
            variant={location.pathname === "/login" ? "contained" : "outlined"}
            color="primary"
            LinkComponent={Link}
            to="/login"
            sx={{ margin: "0 8px" }}
          >
            LOGIN
          </Button>

          <Button
            variant={location.pathname === "/signup" ? "contained" : "outlined"}
            color="primary"
            LinkComponent={Link}
            to="/signup"
            sx={{ margin: "0 8px" }}
          >
            SIGN UP
          </Button>
        </Box>
      </Box>
    </>
  );
}
