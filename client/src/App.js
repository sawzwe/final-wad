import { useState} from "react";
import {
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";
import Quotation from "./components/Quotation";
import QuotationManagement from "./components/QuotationManagement";
import ProductManagement from "./components/ProductManagement";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Login } from "./components/Login";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [user, setUser] = useState();

  const handleLogin = (data) => {
    //console.log("handleLogin", data);
    fetch(`${API_URL}/users/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          window.alert("Error:" + data.error);
        } else {
          window.alert("Welcome " + data.name);
          //console.log(data);
          setUser(data);
        }
      });
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">VMS Company</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/quotation">Quotation</Nav.Link>
            <Nav.Link href="/quotation-management">Quotation Management</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            <Nav.Link href="/product-management">
              Product
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/product-management"
          element={<ProductManagement />}
        />

        <Route path="/quotation" element={<Quotation />} />
        <Route path="/quotation-management" element={<QuotationManagement />} />
        <Route
          path="/"
          element={
            <Container className='formstyle'>
              {user ? (
                <Quotation />
              ) : (
                <Login onLogin={handleLogin} />
              )}
            </Container>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
