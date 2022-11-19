import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Bisection from '../components/Bisection';
import Cramer from '../components/Cramer';
import Home from './home';
import Flase_position from '../components/Flase';
import MultiRegression from '../components/regression/MultiRegession';
function NavScrollExample() {
  return (
    <Router>
    <div>
    <Navbar collapseOnSelect expand="lg" bg="info" variant="danger">
      <Container>
        <Navbar.Brand  style={{ color: "black", fontWeight: "bold"}} as={Link} to={"/home"}>Numeric Method</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Root of Equation" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={"/bisection"}>Bisection</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/flase"}>Flase-Position</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Linear Algebra" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={"/Cramer"}>CramerRule</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Regression" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={"/MultiRegression"}>Multi_Regression</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    <div>
       <Routes>
          <Route path="/bisection" element={<Bisection/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/flase" element={<Flase_position/>}></Route>
          <Route path="/Cramer" element={<Cramer/>}></Route>
          <Route path="/MultiRegression" element={<MultiRegression/>}></Route>
        </Routes>
    </div>
    </Router>
  );
}

export default NavScrollExample;