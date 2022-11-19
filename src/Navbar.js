import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Bisection from './components/Bisection';
import Home from './navigation/home';

function Navbars() {
  return (
<Router>
    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant={"dark"}>
      <Container>
        <Navbar.Brand as={Link} to={"/home"}>Numerical Method</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link as={Link} to={"/falsepos"}>False Position</Nav.Link>
            <Nav.Link as={Link} to={"/newton"}>Newton Raphson</Nav.Link>
            <Nav.Link as={Link} to={"/secant"}>Secant Method</Nav.Link> */}
            <NavDropdown title="Root of Equation" id="basic-nav-dropdown">
              
              <NavDropdown.Item as={Link} to={"/bisection"}>Bisection</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    <div>
       <Routes>
          <Route path="/home" element={<Home/>}></Route>
          <Route exact path="" element={<Home/>}></Route>
          <Route path="/bisection" element={<Bisection/>}></Route>
          {/* <Route path="/falsepos" element={<FalsePosition/>}></Route>
          <Route path="/newton" element={<NewtonRaphson/>}></Route>
          <Route path="/secant" element={<SecantMethod/>}></Route> */}
        </Routes>
    </div>
    </Router>
  );
}

export default Navbars;