import { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../Order.scss";
import { Pagination } from "antd";
const CompleteOrder = () => {
  const [userData, setUserdata] = useState([]);
  const [userlength, setUserlength] = useState(0);
  // pagination

  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const getusers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/allusers`,
        config
      );
      const offData = response.data;
      const fullData = offData.response;
      setUserdata(fullData);

      if (fullData.length > 0) {
        const length = fullData.length;
        setUserlength(length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterItem = (categitem) => {
    const updateditems = userData.filter((curitem) => {
      return curitem.status === categitem;
    });
    setUserdata(updateditems);
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
  }, []);

  return (
    <div>
      <div className="orderbuttons">
        <button onClick={() => setUserdata(userData)}>All</button>
        <button onClick={() => filterItem("completed")}>Completed</button>
        <button onClick={() => filterItem("pending")}>Pending</button>
      </div>
      {
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
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
                  Expected By
                </TableCell>
                <TableCell style={header} align="center">
                  Total
                </TableCell>
                <TableCell style={header} align="center">
                  Customer
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((item) => (
                <>
                  <TableRow>
                    {item.completedCart.map((item) => (
                      <></>
                    ))}
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </div>
  );
};

export default CompleteOrder;
