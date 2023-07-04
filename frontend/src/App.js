import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Col,
  Nav,
  Navbar,
  Container,
  Row,
  Form,
  Button,
} from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar
          id="search-nav"
          bg="white"
          variant="white"
          className="flex-column flex-md-row  p-2"
        >
          <Container fluid id="search-nav-container">
            <Navbar.Brand href="/">
              <div className="link-logo">
                <span className="logo-line-1">News</span>
                <span className="logo-line-2">Reader</span>
              </div>
            </Navbar.Brand>
            <Form id="home-search-form" className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
                id="home-search-control"
              />
            </Form>
            <Nav>
              <Nav.Link href="/signin" className="nav-right-item">
                <Button variant="primary" className="home-sign-in">
                  Sign in
                </Button>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

export default App;
