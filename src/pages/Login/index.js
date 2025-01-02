import React from "react";
import { useState } from "react";
import { login } from "../../utils/api_login";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  CardActions,
} from "@mui/material";
import { toast } from "sonner";

export default function Login() {
  //set default values 4 state

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //Login Handler
  const handleLogin = async (event) => {
    //no hand in the toilet
    event.preventDefault();

    const userInfo = await login(email, password);

    //show notif upon successful login
    if (userInfo) {
      toast.success("Logged in");
      //back to home
      navigate("/");
    }
  };
  return (
    <>
      <Header />
      <Container>
        <Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <Box mb={2} sx={{ textAlign: "center" }}>
                <Typography variant="h6">Login</Typography>
              </Box>
              <Box mb={2}>
                <TextField
                  label="Email"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                  fullWidth
                />
              </Box>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                margin: "0 auto",
              }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={handleLogin}
                disabled={!email || !password ? true : false}
              >
                Login
              </Button>
            </CardActions>
          </Box>
        </Card>
      </Container>
    </>
  );
}
