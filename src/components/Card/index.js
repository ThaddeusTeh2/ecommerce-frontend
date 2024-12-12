import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid2";

export default function Productcard(props) {
  const { list } = props;
  return (
    <Grid
      container
      rowSpacing={{ xs: 1, sm: 2, md: 3 }}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      {" "}
      {list.map((product) => (
        <Grid item size={4}>
          <Card sx={{ minWidth: 175, borderRadius: "5px" }}>
            <CardContent>
              <Box>
                <Typography>
                  <h3>{product.name}</h3>
                </Typography>
              </Box>
              <Box
                sx={{
                  mx: "1px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Chip
                  // label={`MYR ${product.price}`}
                  label={"$" + product.price}
                  sx={{ backgroundColor: "lightgreen" }}
                />
                <Chip
                  label={product.category}
                  sx={{ backgroundColor: "lightpink" }}
                />
              </Box>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                  }}
                >
                  ADD TO CART
                </Button>
              </Box>
            </CardActions>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                size="small"
                sx={{
                  borderRadius: "25px",
                }}
                variant="contained"
                color="primary"
              >
                EDIT
              </Button>
              <Button
                size="small"
                sx={{
                  borderRadius: "25px",
                }}
                variant="contained"
                color="error"
              >
                DELETE
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
