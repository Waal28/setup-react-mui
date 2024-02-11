import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MiniDrawer from "../components/sidebar";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import BasicBreadcrumbs from "../components/breadcrump";
import { handleClickBreadcrumbs } from "../utils/clickFunction";
import { useNavigate } from "react-router-dom";
import { postData } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateCustomer() {
  const navigate = useNavigate();
  const [customer, setCustomers] = React.useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={(e) => handleClickBreadcrumbs(e, "/")}
    >
      Main Menu
    </Link>,
    <Typography key="3" color="text.primary">
      Create New Customer
    </Typography>,
  ];
  function handleClickCancel() {
    navigate("/");
  }
  async function handleClickSave() {
    const res = await postData("customers", customer);
    if (res.status === 400) {
      toast.error(res.data.message);
    } else {
      navigate("/");
    }
  }
  return (
    <MiniDrawer>
      <Typography variant="h3" sx={{ textAlign: "left" }}>
        Customer Page
      </Typography>
      <BasicBreadcrumbs breadcrumbs={breadcrumbs} />

      <Container maxWidth="md" sx={{ marginTop: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            Customers Information
          </Typography>
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow
                  key="1"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    <TextField
                      id="outlined-basic"
                      label="Customer Name"
                      variant="outlined"
                      value={customer.name}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setCustomers({ ...customer, name: event.target.value });
                      }}
                    />
                  </TableCell>
                  <TableCell colSpan={1} align="center"></TableCell>
                  <TableCell align="right">
                    <TextField
                      id="outlined-basic"
                      label="Address"
                      variant="outlined"
                      value={customer.address}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setCustomers({
                          ...customer,
                          address: event.target.value,
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  key="2"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    <TextField
                      id="outlined-basic"
                      label="Phone Number"
                      variant="outlined"
                      value={customer.phone}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setCustomers({
                          ...customer,
                          phone: event.target.value,
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      id="outlined-basic"
                      label="Email Address"
                      variant="outlined"
                      value={customer.email}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setCustomers({
                          ...customer,
                          email: event.target.value,
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell colSpan={1} align="center"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 5 }}
          >
            <Button
              sx={{ margin: 2 }}
              onClick={handleClickCancel}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              sx={{ margin: 2 }}
              onClick={handleClickSave}
              variant="contained"
              color="error"
            >
              Create New
            </Button>
          </Box>
          <ToastContainer />
        </Box>
      </Container>
    </MiniDrawer>
  );
}

export default CreateCustomer;
