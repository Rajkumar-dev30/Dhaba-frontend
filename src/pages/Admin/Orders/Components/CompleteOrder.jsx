import { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../Order.scss";
const CompleteOrder = () => {
  const [userData, setUserData] = useState([]);
  const [userlength, setUserlength] = useState(0);
  const [deliveryBoy, setDeliveryBoy] = useState();

  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const getDeliveryPersons = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/allDeliveryBoys`,
        config
      );
      const offData = response.data;
      const fullData = offData.response;
      setDeliveryBoy(fullData);
    } catch (error) {}
  };

  const getusers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/allusers`,
        config
      );
      const offData = response.data;
      const fullData = offData.response;
      setUserData(fullData);
      console.log(fullData);

      if (fullData.length > 0) {
        const length = fullData.length;
        setUserlength(length);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const styles = {
    boxShadow: "0px 2px 1px rgba(0,0,0,0.3)",
  };
  const header = {
    backgroundColor: "rgba(192,192,192)",
    fontWeight: "650",
  };

  useEffect(() => {
    getusers();
    getDeliveryPersons();
  }, []);

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={header} align="center">
                Customer Name
              </TableCell>
              <TableCell style={header} align="center">
                OrderId
              </TableCell>
              <TableCell style={header} align="center">
                Order Img
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "rgba(192,192,192)",
                  fontWeight: "650",
                }}
                align="center"
              >
                Order Status
              </TableCell>
              <TableCell style={header} align="center">
                Created At
              </TableCell>
              <TableCell style={header} align="center">
                Transaction Id
              </TableCell>
              <TableCell style={header} align="center">
                Total
              </TableCell>
              <TableCell style={header} align="center">
                Delivery Person
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((item) => {
                let orders = item.completedCart.concat(
                  item.canceledCart,
                  item.selfPickupCart
                );
                return orders.map((order) => (
                  <TableRow key={order} sx={{ styles }}>
                    <TableCell align="center">{item.fullname}</TableCell>
                    <TableCell align="center">{order.cartId}</TableCell>
                    <TableCell align="center">
                      {order.products.map((product) => (
                        <img
                          src={product.productImage}
                          alt={product.productName}
                          width={40}
                          height={40}
                        />
                      ))}
                    </TableCell>
                    <TableCell align="center">{order.status}</TableCell>
                    <TableCell align="center">
                      {new Date(order.createdAt).toLocaleString("en-GB", {
                        timeZone: "Asia/Kolkata",
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: "true",
                      })}
                    </TableCell>
                    <TableCell align="center">{order.transactionId}</TableCell>
                    <TableCell align="center">{order.ReceivedAmount}</TableCell>
                    <TableCell align="center">
                      <select
                        value={order.deliveryPerson}
                        onChange={(event) => {
                          // Set the selected delivery boy for the order
                          // order.deliveryPerson = event.target.value;
                        }}
                      >
                        <option value="">Assign Delivery Boy</option>
                        {console.log(deliveryBoy)}
                        {deliveryBoy[0].map((db) => {
                          console.log(db.fullname); // Log the full name to the console
                          return (
                            <option key={db._id} value={db.fullname}>
                              {db.fullname}
                            </option>
                          );
                        })}
                      </select>
                    </TableCell>
                  </TableRow>
                ));
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CompleteOrder;
