import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, getCategories } from "../../utils/api";
import Productcard from "../../components/Card";
import Header from "../../components/Header";

//MUI
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { ArrowRight, ArrowLeft } from "@mui/icons-material";

export default function Product() {
  const [page, setPage] = useState(1);
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
    getProducts(category, page).then((listData) => {
      // when data is returned from API, set it to the list state
      setList(listData);
      console.log(listData);
    });
  }, [category, page]); // empty dependency means it will trigger only once when page is loaded

  const handleChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
    console.log(event.target.value);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header />
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
          <Button
            LinkComponent={Link}
            to="/products/new"
            variant="contained"
            color="success"
          >
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

                {categories.map((category) => (
                  <MenuItem value={category._id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Box>
        <Box>
          {" "}
          <Productcard
            page={page}
            category={category}
            list={list}
            setList={setList}
          />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            padding: "40px 0",
          }}
        >
          {" "}
          <Button
            disabled={page === 1 ? true : false}
            variant="contained"
            onClick={() => setPage(page - 1)}
          >
            <ArrowLeft />
            Prev
          </Button>
          <span>Page {page}</span>
          <Button variant="contained" onClick={() => setPage(page + 1)}>
            Next
            <ArrowRight />
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
