import MiniDrawer from "../components/sidebar";
import { Box, Button, Container, Typography } from "@mui/material";
import CustomizedTables from "../components/table";
import BasicBreadcrumbs from "../components/breadcrump";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

function Customer() {
  const navigate = useNavigate();

  const breadcrumbs = [
    <Typography key="3" color="text.primary">
      Main Menu
    </Typography>,
  ];
  function handleCreateCustomer() {
    navigate("/create-customer");
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
            All Customers
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            color="error"
            onClick={handleCreateCustomer}
          >
            Add New Customer
          </Button>
        </Box>
        <CustomizedTables />
      </Container>
    </MiniDrawer>
  );
}

export default Customer;
