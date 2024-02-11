import { Route, Routes } from "react-router-dom";
import "./App.css";
import Customer from "./page/customer";
import CreateCustomer from "./page/createCustomer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Customer />} />
      <Route path="/create-customer" element={<CreateCustomer />} />
    </Routes>
  );
}

export default App;
