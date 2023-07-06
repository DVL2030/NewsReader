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
import { TOPICS } from "./const/const";
import TopicPage from "./page/TopicPage";

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
                <hr className="vr d-none d-sm-block"></hr>

                {TOPICS.map((top, idx) => (
                  <Nav.Link
                    key={idx}
                    href={`/topics/${top}`}
                    className={`d-none ${
                      idx > 5
                        ? "d-lg-block"
                        : idx > 3
                        ? "d-md-block"
                        : idx > 1
                        ? "d-sm-block"
                        : "d-sm-block"
                    }`}
                  >
                    {`${top[0].toUpperCase()}${top.substring(1)}`}
                  </Nav.Link>
                ))}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main id="main-div">
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/home" exact element={<HomePage />} />
            <Route path="/topics/:topic" element={<TopicPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
