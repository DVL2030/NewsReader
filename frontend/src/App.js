import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import {
  Col,
  Nav,
  Navbar,
  Container,
  Row,
  Form,
  Button,
} from "react-bootstrap";
import HomePage from "./page/HomePage";

function App() {
  const date = new Date();

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Navbar
            id="search-nav"
            bg="white"
            variant="white"
            className="flex-column d-flex p-2"
            fixed="top"
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
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/feed">Feeds</Nav.Link>
                <Nav.Link href="/bookmark">Bookmark</Nav.Link>
                <hr className="vr"></hr>
                <Nav.Link href="/topics/world">World</Nav.Link>
                <Nav.Link href="/topics/us">U.S</Nav.Link>
                <Nav.Link href="/topics/korea">Korea</Nav.Link>
                <Nav.Link href="/topics/business" className="d-none d-xs-block">
                  Business
                </Nav.Link>
                <Nav.Link href="/topics/economy" className="d-none d-sm-block">
                  Economy
                </Nav.Link>
                <Nav.Link
                  href="/topics/technology"
                  className="d-none d-sm-block"
                >
                  Technology
                </Nav.Link>
                <Nav.Link
                  href="/topics/entertainment"
                  className="d-none d-md-block"
                >
                  Entertainment
                </Nav.Link>
                <Nav.Link href="/topics/sports" className="d-none d-md-block">
                  Sports
                </Nav.Link>
                <Nav.Link href="/topics/science" className="d-none d-lg-block">
                  Science
                </Nav.Link>
                <Nav.Link href="/topics/health" className="d-none d-lg-block">
                  Health
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main id="main-div">
          <HomePage />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
