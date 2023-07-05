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
import { getToday } from "./utils";

function App() {
  const date = new Date();

  return (
    <div className="App">
      <header>
        <Navbar
          id="search-nav"
          bg="white"
          variant="white"
          className="flex-column d-flex p-2"
          // fixed="top"
        >
          <Container fluid id="search-nav-container">
            <Navbar.Brand href="/">
              <div className="link-logo">
                <span className="logo-line-1">News</span>
                <span className="logo-line-2">Reader</span>
              </div>
            </Navbar.Brand>
            <Form id="home-search-form" className="d-flex">
              <button className="search" type="submit">
                <i className="fa fa-search bg-none"></i>
              </button>
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
          <Container className="d-flex justify-content-center">
            <Nav className="menu-bar">
              <Nav.Link>Home</Nav.Link>
              <Nav.Link>Feeds</Nav.Link>
              <Nav.Link>Bookmark</Nav.Link>
              <hr className="vr"></hr>
              <Nav.Link>World</Nav.Link>
              <Nav.Link>U.S</Nav.Link>
              <Nav.Link>Korea</Nav.Link>
              <Nav.Link>Business</Nav.Link>
              <Nav.Link>Economy</Nav.Link>
              <Nav.Link>Technology</Nav.Link>
              <Nav.Link>Entertainment</Nav.Link>
              <Nav.Link>Sports</Nav.Link>
              <Nav.Link>Science</Nav.Link>
              <Nav.Link>Health</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main id="main-div">
        <Container id="main-container">
          <div className="main-message">
            <h5>Your briefing</h5>
            <small className="text-secondary">{getToday()}</small>
          </div>
          <Row>
            <Col></Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
