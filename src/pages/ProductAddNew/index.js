import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { addNewProduct } from "../../utils/api";
import ButtonUpload from "../../components/ButtonUpload";

//token
import { getUserToken, isAdmin } from "../../utils/api_auth";
import { useCookies } from "react-cookie";

//mui
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function ProductAddNew() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);

  //states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  // check if is admin or not
  useEffect(() => {
    if (!isAdmin(cookies)) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!name || !price || !category) {
      toast.error("Please fill out all the required fields");
    }

    // trigger the add new product API
    const newProductData = await addNewProduct(
      name,
      description,
      price,
      category,
      token
    );

    // check if the newProductData exists or not
    if (newProductData) {
      // show success message
      toast.success("Product has been added successfully");
      // redirect back to home page
      navigate("/");
    }
  };

  return (
    <Container>
      <Card elevation={5}>
        <CardContent>
          <Typography variant="h4" align="center" mb={4}>
            Add New Product
          </Typography>
          <Box mb={2}>
            <TextField
              label="Name"
              required
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="number"
              label="Price"
              required
              fullWidth
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Category"
              required
              fullWidth
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <ButtonUpload
              onFileUpload={(files) => {
                console.log(files);
              }}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductAddNew;
