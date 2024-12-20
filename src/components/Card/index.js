import * as React from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../utils/api";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid2";
import { toast } from "sonner";

export default function Productcard(props) {
  const { list, setList, page, category } = props;

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      const deleted = await deleteProduct(id);
      if (deleted) {
        // get the latest products data from the API again
        const latestProducts = await getProducts(category, page);
        // update the products state with the latest data
        setList(latestProducts);
        // show success message
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    }
  };

  const addToCartHandler = async (item) => {
    const stringProducts = localStorage.getItem("cart");
    let cart = JSON.parse(stringProducts);

    if (!cart) {
      cart = [];
    }

    const newProduct = cart.find((product) => {
      return item._id === product._id;
    });

    if (newProduct) {
      newProduct.quantity += 1;
    } else {
      cart.push({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: 1,
        description: item.description,
        category: item.category,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${item.name} added.`);
  };

  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
      {" "}
      {list.length > 0 ? (
        list.map((product) => (
          <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
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
                    onClick={() => addToCartHandler(product)}
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
                  variant="outlined"
                  LinkComponent={Link}
                  to={`/products/${product._id}/edit`}
                  color="primary"
                  size="small"
                  sx={{ textTransform: "none", marginRight: "8px" }}
                >
                  EDIT
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{ textTransform: "none" }}
                  onClick={() => handleDelete(product._id)}
                >
                  DELETE
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="body1" align="center">
                No product found.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}
