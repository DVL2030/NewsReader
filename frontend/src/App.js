import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Nav, Navbar, Container, Form, Button } from "react-bootstrap";
import HomePage from "./page/HomePage";
import { TOPICS } from "./const/const";
import TopicPage from "./page/TopicPage";
import EntryPage from "./page/EntryPage";
import SignInPage from "./page/SignInPage";
import { signout } from "./slice/userSlice";
import LoadingBox from "./component/LoadingBox";
import SourcePage from "./page/SourcePage";
import StreamPage from "./page/StreamPage";
import SubscriptionPage from "./page/SubscriptionPage";
import PrivateRoute from "./component/PrivateRoute";
import FeedSearchResultPage from "./page/FeedSearchResultPage";
import BookmarkPage from "./page/BookmarkPage";
import RegisterPage from "./page/RegisterPage";
import AdminRoute from "./component/AdminRoute";
import AdminDashBoardPage from "./page/Admin/AdminDashboardPage";
import AdminManageNewsPage from "./page/Admin/AdminManageNewsPage";
import AdminManageUsersPage from "./page/Admin/AdminManageUsersPage";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const userState = useSelector((state) => state.user);
  const { userInfo, loading, error } = userState;

  const searchHandler = () => {
    navigate(`/feed/search/${keyword}`);
  };

  const manageAccountHandler = () => {
    navigate("/user/account");
  };
  const signOutHandler = () => {
    dispatch(signout());
  };

  return loading ? (
    <LoadingBox className="m-5" />
  ) : (
    <div className="App">
      <header>
        <Navbar
          id="search-nav"
          bg="white"
          variant="white"
          className="flex-column d-flex p-3"
          fixed="top"
        >
          <Container fluid id="search-nav-container">
            <Navbar.Brand href="/">
              <div className="link-logo">
                <span className="logo-line-1">News</span>
                <span className="logo-line-2">Reader</span>
              </div>
            </Navbar.Brand>
            <Form
              id="home-search-form"
              className="d-flex"
              onSubmit={searchHandler}
            >
              <button className="search" type="submit">
                <i className="fa fa-search bg-none"></i>
              </button>
              <Form.Control
                type="search"
                placeholder="Search feed to subscribe"
                aria-label="Search"
                id="home-search-control"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </Form>
            <Nav>
              {userInfo ? (
                <div id="account-drop-down" className=" text-white bg-primary">
                  <span>
                    <i className="fa-regular fa-user fa-lg me-2"></i>
                    <span className="d-none d-lg-inline-block">
                      {userInfo.name}
                    </span>
                  </span>
                  <div id="drop-down-content">
                    <div className="drop-down-content-container">
                      <div className="d-flex drop-down-content-header">
                        <div className=" drop-down-icon">
                          <div className="img-avatar">
                            {userInfo.name.substring(0, 1)}
                          </div>
                        </div>
                        <div className="flex-fill">
                          <ul className="no-list-style">
                            <li className="text-dark">{userInfo.name}</li>
                            <li className="text-secondary">{userInfo.email}</li>
                            <hr></hr>
                            <li>
                              <div className="w-100">
                                <h5>Your account</h5>
                                <Button onClick={manageAccountHandler}>
                                  Manage your account
                                </Button>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="drop-down-content-body">
                        <Link
                          to="/user/stream"
                          className="d-flex justify-content-center"
                        >
                          <div className="feeds-icon drop-down-icon">
                            <i className="fa-solid fa-rss fa-2x "></i>
                          </div>
                          <div className="flex-fill">
                            <span>Stream</span>
                          </div>
                        </Link>
                        <Link
                          to="/user/bookmark"
                          className="d-flex justify-content-center"
                        >
                          <div className="bookmark-icon drop-down-icon">
                            <i className="fa-regular fa-bookmark fa-2x "></i>
                          </div>
                          <div className="flex-fill">
                            <span>Bookmark</span>
                          </div>
                        </Link>
                        <Link to="/user/subscription" className="d-flex">
                          <div className="bookmark-icon drop-down-icon">
                            <i className="fa-regular fa-folder-open fa-2x"></i>
                          </div>
                          <div className="flex-fill">
                            <span>Subscription</span>
                          </div>
                        </Link>
                      </div>
                      {userInfo.isAdmin && (
                        <div className="drop-down-content-body">
                          <hr></hr>
                          <Link
                            to="/admin/dashboard"
                            className="d-flex justify-content-center"
                          >
                            <div className="bookmark-icon drop-down-icon">
                              <i className="fa-solid fa-house fa-2x"></i>
                            </div>
                            <div className="flex-fill">
                              <span>Dashboard</span>
                            </div>
                          </Link>
                          <Link
                            to="/admin/news"
                            className="d-flex justify-content-center"
                          >
                            <div className="bookmark-icon drop-down-icon">
                              <i className="fa-regular fa-newspaper fa-2x"></i>
                            </div>
                            <div className="flex-fill">
                              <span>Manage News</span>
                            </div>
                          </Link>
                          <Link
                            to="/admin/users"
                            className="d-flex justify-content-center"
                          >
                            <div className="bookmark-icon drop-down-icon">
                              <i className="fa-solid fa-users fa-2x"></i>
                            </div>
                            <div className="flex-fill">
                              <span>Manage Users</span>
                            </div>
                          </Link>
                          <hr></hr>
                        </div>
                      )}

                      <div
                        to="/user/bookmark"
                        className="d-flex justify-content-center drop-down-content-footer"
                      >
                        <div className="sign-out-icon drop-down-icon">
                          <i className="fa fa-sign-out fa-2x"></i>
                        </div>
                        <div className="flex-fill" onClick={signOutHandler}>
                          <span>Sign out</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Nav.Link href="/signin" className="nav-right-item">
                  <Button variant="primary" className="home-sign-in">
                    Sign in
                  </Button>
                </Nav.Link>
              )}
            </Nav>
          </Container>
          <Container className="d-flex justify-content-center">
            <Nav className="menu-bar">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/user/stream">Stream</Nav.Link>
              <Nav.Link href="/user/subscription">Subscription</Nav.Link>
              <Nav.Link href="/user/bookmark">Bookmark</Nav.Link>
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
          <Route path="/topics/:topic" exact element={<TopicPage />} />
          <Route path="/entry/:id" exact element={<EntryPage />} />

          <Route path="/signin" exact element={<SignInPage />}></Route>
          <Route path="/register" exact element={<RegisterPage />}></Route>
          <Route path="/source/:source" exact element={<SourcePage />}></Route>
          <Route
            path="/admin/dashboard"
            exact
            element={
              <AdminRoute>
                <AdminDashBoardPage />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/news"
            exact
            element={
              <AdminRoute>
                <AdminManageNewsPage />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/users"
            exact
            element={
              <AdminRoute>
                <AdminManageUsersPage />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/user/stream"
            exact
            element={
              <PrivateRoute>
                <StreamPage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/user/subscription"
            exact
            element={
              <PrivateRoute>
                <SubscriptionPage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/user/bookmark"
            exact
            element={
              <PrivateRoute>
                <BookmarkPage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/feed/search/:keyword"
            exact
            element={<FeedSearchResultPage />}
          ></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
