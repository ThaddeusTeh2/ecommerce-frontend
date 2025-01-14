import Header from "../../components/Header";
import {
  getCategories,
  addNewCategory,
  updateCategory,
  deleteCategory,
} from "../../utils/api";

//mui
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid2";

export default function CategoryEdit() {
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
                <TextField type="text" label="Category" required fullWidth />
              </Grid>
              <Grid size={1}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    height: 55,
                  }}
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
              <TableRow>
                <TableCell>Placeholder</TableCell>
                <TableCell align="right">
                  <Box>
                    <Button variant="contained" sx={{ marginRight: "10px" }}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error">
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Container>
    </>
  );
}
