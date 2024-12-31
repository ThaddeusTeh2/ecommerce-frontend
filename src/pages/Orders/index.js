import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { getAllOrders, deleteOrder, updateOrder } from "../../utils/api";
import { toast } from "sonner";

//MUI
import { Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

function Orders() {
  const [status, setStatus] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
        console.log(data);
      } catch (error) {
        toast.error("Failed to fetch orders");
      }
    };
    getOrders();
  }, []);

  const handleUpdate = async (_id, status) => {
    const updatedOrder = await updateOrder(_id, status);
    if (updatedOrder) {
      // fetch the updated orders from API
      const updatedOrders = await getAllOrders();
      setOrders(updatedOrders);

      toast.success("Order status has been updated");
    }
  };

  //delete item
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      const deleted = await deleteOrder(id);
      if (deleted) {
        // get the latest orders data from the API again
        const latestOrders = await getAllOrders();
        // update the orders state with the latest data
        setOrders(latestOrders);
        // show success message
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    }
  };

  const handleChange = (orderId, newStatus) => {
    handleUpdate(orderId, newStatus);
  };
  return (
    <Container>
      <Header title="My Orders" />
      <TableContainer sx={{ my: 2 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell align="">Products</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="">Total</TableCell>
              <TableCell align="right">Payment Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow>
                  {/* customer name */}
                  <TableCell>
                    {" "}
                    {order.customerName}
                    <br />({order.customerEmail})
                  </TableCell>
                  {/* what they bought */}
                  <TableCell>
                    {order.products.map((product) => (
                      <div>{product.name}</div>
                    ))}
                  </TableCell>
                  {/* status select */}
                  <TableCell align="right">
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        {order.status === "pending" ? (
                          "Pending"
                        ) : (
                          <Select
                            value={order.status}
                            onChange={(event) => {
                              handleUpdate(order._id, event.target.value);
                            }}
                          >
                            <MenuItem value="paid">Paid</MenuItem>
                            <MenuItem value="failed">Failed</MenuItem>
                          </Select>
                        )}
                      </FormControl>
                    </Box>
                  </TableCell>
                  {/* price */}
                  <TableCell>${order.totalPrice}</TableCell>
                  {/* paid at */}
                  <TableCell align="right">{order.paid_at}</TableCell>
                  <TableCell align="right">
                    {order.status === "pending" ? (
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(order._id)}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button variant="contained" color="error" disabled>
                        X
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Orders D:
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Orders;
