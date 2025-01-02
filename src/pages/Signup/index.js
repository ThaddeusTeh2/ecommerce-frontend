import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../utils/api_signup";
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

export default function Signup() {
  //set default values 4 state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  //Signup Handler
  const handleSignup = async (event) => {
    //no hand in the toilet
    event.preventDefault();

    if (confirmPassword !== password) {
      toast.error("Password does not match");
      navigate("/signup");
    } else {
      const userCreate = await signup(name, email, password);

      //show notif upon successful signup
      if (userCreate) {
        toast.success("Ty for joining us :D");
        //back to home
        navigate("/");
      }
    }
  };

  return (
    <Container>
      <Header />
      <Container maxWidth="sm">
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
                <Typography variant="h6">Signup</Typography>
              </Box>
              <Box mb={2}>
                <TextField
                  label="Name"
                  required
                  onChange={(event) => setName(event.target.value)}
                  fullWidth
                />
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
              <Box mb={2}>
                <TextField
                  label="Confirm Password"
                  required
                  onChange={(event) => setConfirmPassword(event.target.value)}
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
                onClick={handleSignup}
                disabled={!name || !email || !password || !confirmPassword}
              >
                Signup
              </Button>
            </CardActions>
          </Box>
        </Card>
      </Container>
    </Container>
  );
}
