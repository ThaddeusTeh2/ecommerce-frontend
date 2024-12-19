import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

//mui
import { Box, Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

function Cart() {
  const navigate = useNavigate();

  const stringProducts = localStorage.getItem("cart");
  let cart = JSON.parse(stringProducts);
  if (!cart) {
    cart = [];
  }

  //calc all prods
  const totalPrice = cart.reduce((total, cart) => {
    return total + cart.price * cart.quantity;
  }, 0);

  const handleCartDelete = (_id) => {
    // 1. remove the selected cart item from cart items based on the cart item_id
    let filteredCart = cart.filter((item) => item._id !== _id);
    // 2. update the data back to the local storage using thelocalStorage.setItem()
    let convertedCart = JSON.stringify(filteredCart);

    localStorage.setItem("cart", convertedCart);
    // 3. redirect back to /cart
    navigate("/cart");
  };

  return (
    <>
      <Container>
        <Header />
        <TableContainer sx={{ my: 2 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.length > 0 ? (
                cart.map((cart) => (
                  <>
                    <TableRow
                      key={cart.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="cart">
                        {cart.name}
                      </TableCell>
                      <TableCell align="right">{cart.price}</TableCell>
                      <TableCell align="right">{cart.quantity}</TableCell>
                      <TableCell align="right">
                        ${(cart.price * (cart.quantity || 1)).toFixed(2)}
                      </TableCell>

                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleCartDelete(cart._id)}
                        >
                          remove
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        align="right"
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        ${totalPrice.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <h1>Buy something :D</h1>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button variant="contained">Checkout</Button>
        </Box>
      </Container>
    </>
  );
}

export default Cart;
