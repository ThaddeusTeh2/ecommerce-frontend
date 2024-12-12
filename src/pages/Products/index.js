import * as React from "react";
import { useState, useEffect } from "react";
import { getProducts, getCategories } from "../../utils/api";
import Productcard from "../../components/Card";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

export default function Product() {
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  //category use effect
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []); // only when page first loaded

  //product use effect

  // hook into page load
  useEffect(() => {
    // only load the  data when page is loaded first time
    getProducts(category).then((listData) => {
      // when data is returned from API, set it to the list state
      setList(listData);
      console.log(listData);
    });
  }, [category]); // empty dependency means it will trigger only once when page is loaded

  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(event.target.value);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box
          sx={{
            m: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" component="h3">
            Welcome to my Store!
          </Typography>
        </Box>
        <Box
          sx={{
            mx: "1px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" component="h5">
            Products
          </Typography>
          <Button variant="contained" color="success">
            Add New
          </Button>
        </Box>
        <Box>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              padding: "15px 0",
            }}
          >
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

                {categories.map((product) => (
                  <MenuItem value={product}>{product}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Box>
        <Box>
          {" "}
          <Productcard list={list} />
        </Box>
      </Container>
    </React.Fragment>
  );
}
