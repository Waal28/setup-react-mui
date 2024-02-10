import "./App.css";
import ButtonAppBar from "./components/navbar";
import BasicTable from "./components/table";
import Container from "@mui/material/Container";
import SignUp from "./page/signUp";

function App() {
  return (
    <div className="App">
      {/* <ButtonAppBar />
      <Container maxWidth="md" style={{ marginTop: "20px" }}>
        <BasicTable />
      </Container> */}
      <SignUp />
    </div>
  );
}

export default App;
