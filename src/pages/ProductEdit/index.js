import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { editProduct, getProduct, getCategories } from "../../utils/api";

//token
import { getUserToken, isAdmin } from "../../utils/api_auth";
import { useCookies } from "react-cookie";

//mui
import { Container, Typography, TextField, Box, Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);

  //states
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!isAdmin(cookies)) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  useEffect(() => {
    getProduct(id).then((productData) => {
      setLoading(false);
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
    });
  }, [id]);

  //category use effect
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []); // only when page first loaded

  const handleChange = (event) => {
    setCategory(event.target.value);

    console.log(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!name || !price || !category) {
      toast.error("Please fill out all the required fields");
    } else {
      // trigger the API
      const updatedProduct = await editProduct(
        id,
        name,
        description,
        price,
        category,
        token
      );

      if (updatedProduct) {
        toast.success("Product has been edited successfully!");
        navigate("/");
      }
    }
  };

  return (
    <>
      <Container>
        <Card>
          <CardContent>
            <Typography variant="h4" align="center" mb={4}>
              Edit Product
            </Typography>
            {loading ? (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <CircularProgress color="inherit" />
              </Box>
            ) : (
              <>
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
                    required
                    fullWidth
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    label="Price"
                    required
                    fullWidth
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </Box>
                <Box mb={2}>
                  <FormControl variant="filled" style={{ minWidth: 220 }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Filter By Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={category}
                      onChange={handleChange}
                    >
                      <MenuItem value="">All</MenuItem>

                      {categories.map((category) => (
                        <MenuItem value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleFormSubmit}
                >
                  Update
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6">Loading...</Typography>
      </Backdrop>
    </>
  );
}

export default ProductEdit;
