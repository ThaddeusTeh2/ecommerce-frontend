import Header from "../../components/Header";
import { getCategories, addNewCategory, deleteCategory } from "../../utils/api";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

//ui
import { toast } from "sonner";

//mui
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid2";

//auth
import { getUserToken, isAdmin } from "../../utils/api_auth";
import { useCookies } from "react-cookie";

export default function Categories() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  // check if is admin or not
  useEffect(() => {
    if (!isAdmin(cookies)) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  //get all the categories frm db and set them to state upon page load
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
      console.log(data);
    });
  }, []);

  //add new category handler
  const handleAddNew = async (event) => {
    event.preventDefault();
    // check for error
    if (!name) {
      toast.error("pls type something bro");
    } else {
      // trigger the add new category  API
      const newCategory = await addNewCategory(name, token);

      // check if the new Category Data exists or not
      if (newCategory) {
        const latestCategories = await getCategories();
        setCategories(latestCategories);
        // show success message
        toast.success("category added");
        setName("");
      }
    }
  };

  //delete category handler
  const handleDelete = async (id, token) => {
    const confirmed = window.confirm("u sure?");

    if (confirmed) {
      const deleted = await deleteCategory(id, token);
      if (deleted) {
        const latestCategories = await getCategories();
        setCategories(latestCategories);
        toast.success("Category deleted ");
      } else {
        toast.error("Failed to delete category ");
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        {/* input */}
        <Box>
          {/* title */}
          <Box mb={2}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
              }}
            >
              Categories
            </Typography>
          </Box>
          <Box>
            <Grid container>
              <Grid size={11} px={1}>
                <TextField
                  type="text"
                  label="Category"
                  required
                  fullWidth
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Grid>
              <Grid size={1}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    height: 55,
                  }}
                  onClick={handleAddNew}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* mapped category data */}
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>name</TableCell>
                <TableCell align="right">actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow>
                  <TableCell>{category.name}</TableCell>
                  <TableCell align="right">
                    <Box>
                      <Button
                        LinkComponent={Link}
                        variant="contained"
                        sx={{ marginRight: "10px" }}
                        to={`/categories/${category._id}/edit`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(category._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Container>
    </>
  );
}
